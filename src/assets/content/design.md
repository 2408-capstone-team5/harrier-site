# Harrier Design

The design of a 3rd-party supported DIY option for leveraging cache in GHA workflows involved two major pieces of work:

- Provision and configure an alternative GHA runner infrastructure with a built-in persistent cache store
- Minimize the time and knowledge investment required by the user to deploy and integrate the solution into existing GHA workflows

For development purposes, the design focused on Node.js project workflows.

- Node is the most common language on GH, making it the biggest ROI for the first pilot
- The language we are most familiar with \- quick prototyping and testing of concepts

## Alternative Runner Infrastructure

In order for the 3rd-party support to be desirable to the targeted users, the following design requirements needed to be met:

- Full access to the GHA ecosystem
- Isolated and secure workflow runtime environments
- Optimized resource utilization
- Persistent cache store
- Out-of-the-box cache strategy

### **On-demand ephemeral runners**

The design of an alternative runner infrastructure that retains full connectivity to the GHA ecosystem starts with the installation of GHA’s self-hosted runner application. Harrier is designed to be an agent within a user’s cloud platform, with limited privileges, that provisions runners and connects them to the GHA ecosystem. Harrier accomplishes through the following actions:

- Create a dedicated virtual private cloud so that all resources provisioned by Harrier do not impact any of the user’s existing resources
- Provision cloud servers, configure them with GHA’s self-hosted runner application, and place them on standby mode so that they are ready to receive a GHA workflow (isolation)
- Implement a runner checkout system so that a user can re-use a runner for consecutive CI builds, thus eliminating unnecessary provisioning and configuration activities
- Terminate runner servers upon completion of user activities to delete residual artifacts and prevent data leakage

### **Dedicated persistent cache store**

The provisioning of an alternative runner infrastructure that can be customized opens up the possibility of provisioning an additional resource that can serve as a dedicated persistent cache store. Harrier goes beyond merely provisioning a resource and enables caching as a strategy across any workstream through the following actions:

- Provision an object storage service in the user’s cloud platform that allows workflows to store, retrieve, and manage cache data
- Configure, with appropriate permission settings, each and every ephemeral runner to mount the object storage service as a local directory, simplifying and expediting the caching process

### **Out-of-the-box cache management of dependencies**

Proper utilization of cache in accelerating CI builds goes beyond creating a cache endpoint. Harrier provides users with an out-of-the-box cache strategy for speeding up the dependencies installation step of a CI build through the following cache options:

- Pre-load a previously cached node modules directory related to the specific branch of the code repository as a setup step
  - If cache does not exist for the specific branch, but does exist for the main repository, load the main repository node modules directory to take advantage of some cache benefits
  - If no cache is found, proceed with the remainder of the CI build
- Save the node modules directory to the cache store at the end of a CI build as a cleanup step
  - The node modules directory will be cached only if there were any changes made to it compared to the previous CI build (cleanup-side cache invalidation)
- Customizable cache eviction time-to-live to optimize cache data management

## DIY Deployment and Integration

In order for the above design to be usable by the targeted users, the following design requirements needed to be met:

- Fully automated provisioning of the alternative runner infrastructure
- Behind-the-scenes cross-platform integration
- Easy to deploy
- Minimal disruption and migration efforts to existing workflows

### **Automated Cloud Infrastructure Provisioning**

The runner infrastructure is automatically provisioned by Harrier on behalf of the user to their cloud platform through the following actions:

- Proper sequencing of the necessary cloud resource provisioning
- Delegate appropriate resource permissions for interservice communication

### **API Platform Integration**

Once provisioned and deployed, the alternative cloud infrastructure needs to communicate with GitHub behind the scenes. Harrier automatically connects the user’s cloud infrastructure with GitHub through the following actions:

- Set up REST API on the user’s cloud platform to interface with GitHub’s API
- Prepare an event-triggered webhook that enables GitHub to communicate workflow status to user’s runner infrastructure
- Set up event-based response to start, hold in standby throughout valid checkout period, and terminate runner server
- Request just-in-time token from GitHub to register runner server for every workflow job run

### **GHA Marketplace Public Actions**

To minimize the barrier to implementation, the Harrier codebase deployment needs to be quick and easy. This is accomplished through the following actions:

- Publish Harrier infrastructure provisioning code as a GHA public action, which is then delivered to the user as a workflow step in a setup.yml file
- Publish Harrier’s cache management code for loading and saving cache as a GHA public action, to be dropped into existing workflow .yml files
  `

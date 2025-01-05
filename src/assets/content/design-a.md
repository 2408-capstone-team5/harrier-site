# Design

The design of a 3rd-party supported DIY option for leveraging cache in GHA workflows involved two major pieces of work:

1. Provision and configure an alternative GHA runner infrastructure with a dedicated persistent cache store into the user’s own cloud environment.
2. Facilitate the user’s access to and utilization of the newly provisioned alternative runner infrastructure.

## Isolated Runner Environment in User’s Cloud

Harrier provides an alternative runner infrastructure within a user’s existing cloud account. It is important to ensure that the newly-provisioned resources do not impinge upon the functionality or compromise the security of the user’s existing cloud resources. Therefore, the core runner infrastructure must be placed within a virtual private cloud that is dedicated to housing the core infrastructure components of the self-hosted runner.

## Warm-pool of self-hosted runners

Provisioning a runner within the user’s cloud entails configuring a virtual machine (VM) with the GHA self-hosted runner application. Given the time required to provision and configure a VM from scratch, it is desirable to have pre-configured VMs that can engage with a workflow as quickly as possible. To accommodate the need for concurrent runners by workflows, it is important to have a fleet of VMs that can handle the necessary throughput of workflows. Therefore, Harrier provisions a fleet of VMs at the initial setup of the alternative runner infrastructure that is pre-configured with the runner application and then placed on standby in a warm pool to optimize cloud resource utilization. As each VM is meant for one-time use, the code for provisioning VMs is then reused as a “VM factory” to replenish and maintain the runner fleet.

## Connect Runners with Specific Workflow Jobs

A provisioned VM runner must be registered with GitHub so that it is visible to GHA as an available runner. There are two forms of runner registration – static or dynamic. A VM registered statically is a persistent runner that can be utilized by _multiple_ workflows. Conversely, dynamic registration–also known as a Just-in-Time (JIT) token registration– is meant to register a VM as a single-use entity. Therefore, Harrier will fetch a JIT registration token to connect the requested VM to the respective workflow job at the time of initial workflow dispatch.

## Termination of ephemeral runner

To preserve the benefits of GHA’s original ephemeral runner design, a VM runner must be fully terminated at the end of each workflow run. However, there is no mechanism within GitHub Actions that terminates the VM provisioned in the user’s runner infrastructure. Therefore, Harrier terminates the VM after receiving a notification that the workflow run has completed.

## Dedicated Persistent Cache Store

Alongside the provisioning of VMs as GHA runners, Harrier provisions a persistent data store within the user’s cloud environment. This cache store is made accessible to every VM as a mounted local file system so that cache files can be conveniently loaded and stored.

## Out-of-the-box cache management of dependencies

Since the data store is mounted directly to the local file system, the user can leverage caching at any point of the workflow where duplicate work is occuring. While caching is now a possibility, there still remains the work of designing yaml code to take advantage of that cache. Harrier provides users with an out-of-the-box cache strategy to help them quickly get started.

A typical CI build process requires dependency installation, which can take advantage of previously created files, presenting itself as an opportunity to cache (source: ). Typically, package managers that handle the dependency installations will avoid installing pre-existing packages and only fetch and install packages as needed. For example, npm, a package manager for Node.js, will compare the existing packages saved in the node modules folder with the required package inventory list that is the package.json file. After identifying which packages need to actually be installed, npm will then first check to see if the packages have been previously downloaded and saved in a hidden local cache directory. Only if the cache does not exist will npm fetch the package from the npm library over the network and then install the dependencies. This highlights two areas for caching – 1\) use cache, as npm uses ./npm_cache, to short circuit the network fetch step and 2\) use cache, as npm uses ./node_modules directory, to short circuit the actual installation. Harrier provides users with the ability to cache the entire file structure of existing dependencies, which results in a greater time savings during the dependency installation step.

## Workflow-driven start/stop of runners

With the alternative runner infrastructure provisioned and configured within the user’s cloud environment, integration with the GHA ecosystem is necessary. Harrier facilitates connection by deploying a REST API configured to receive inbound communications from GitHub. Next, Harrier setups a webhook on the user’s GitHub organization with the specific REST API endpoint to deliver workflow data. Finally, Harrier deploys an events manager that parses the workflow data and triggers a VM to start up from the warm pool at the start of the workflow and also terminate upon completion of the workflow.

## Minimal workflow modification

To ease migration from default GHA runners to self-hosted runners and minimize workflow disruption, Harrier requires simple one-line modifications to existing workflow YAML files. Similarly, Harrier allows users to take advantage of the built-in cache strategy through simple one-line drop-in changes to existing workflow yaml files.

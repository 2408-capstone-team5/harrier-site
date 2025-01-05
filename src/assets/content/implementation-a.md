# 4 Harrier Implementation

Specific scope of Harrier implementation:

- Harrier is implemented in AWS. which provides secure GH integration through OIDC standards, with a secrets manager function.
- Harrier currently focuses on Node.js that uses npm install. Node is widely used in GH and also the most comfortable language for team
  - For development purposes, the design focused on Node.js project workflows. Node is the most common language on GH, making it the biggest ROI for the first pilot.

## 4.1 Isolated VPC in User’s AWS Account

Harrier sets up a dedicated Amazon Virtual Private Cloud (VPC) within the user’s AWS account to ensure resource isolation and prevent Harrier-provisioned VMs from accessing existing resources or interfering with existing processes. Given that the self-hosted runners require a direct connection with GitHub over the internet, the VPC is created with a public subnet that is associated with a route table, which routes traffic to a separately provisioned Internet Gateway. Incoming traffic into the public subnet is restricted to GitHub addresses for security reasons.

\=\> click here for detailed insight into challenges and problem solving approach

- _ENI for lambda_
- _Public vs private subnet_
- _cidr blocks?_

## 4.2 Fleet of EC2 runners placed in standby

OR?

Harrier deploys Amazon Elastic Compute Cloud (EC2) compute service to function as the GHA self-hosted runner server for the following reasons:

- Launch instances on an as-needed basis, making it possible to provision on-demand runners
- Stop instances when not in use, facilitating resource optimization
- Terminating instances after use, making the runners truly ephemeral
- Customize instances to run on any operating system using a variety of CPU, memory, storage, and networking configurations

The above benefits allow the users to take full advantage of the intended purpose of GitHub’s self-hosted runner feature, which enables users to customize their runner setup. Harrier provides users the option to choose their desired configuration prior to setting up the alternative runner infrastructure.

Since the initial launch of an EC2 instance requires some time (typically around 70\~90 seconds, determined from experimentation) to configure the instance hardware, install the operating system, and download the self-hosted runner application using a bash script, Harrier sets up pre-configured EC2s that are held in a stopped state. This allows a GHA request for runners to start a pre-configured EC2 rather than launching a brand new instance and incurring the time cost of configuration, leading to significantly faster workflow start times (around 30 seconds or less, depending on hardware configurations).

It is important that Harrier maintains a fleet of EC2s to accommodate workflows that run multiple jobs in parallel, requiring multiple runners to be in use at the same time. The size of the fleet is determined by the user prior to setting up the alternative runner infrastructure. In order to maintain the fleet size, the code block used to provision and launch the EC2s at setup is also used to provision replacement EC2s at the time of GHA’s request for a runner, as the runner that will be started up to run a workflow will be terminated upon completion of the job.

\=\> click here for detailed insight into challenges and problem solving approach

- _EC2 vs Fargate vs Lambda_
- _Script options_
- _Necessary pre-config options_
- _Bootup time_
- _What happens to an EC2 at stop vs terminate? Introduce EBS volume?_

## 4.3 Just-In-Time Token Registration of Runner

While the GHA self-hosted runner application is installed in a pre-configured Harrier EC2, the application must have a GHA runner token passed into it as an argument at the time of execution in order to register the EC2 with GitHub as an available GHA self-hosted runner. Harrier utilizes Just-in-Time (JIT) tokens to register the EC2s, as the JIT tokens are designed to execute only a single job, automatically removing the runner from the list of available runners upon completion. By requiring a unique token for every workflow run, JIT runners minimize the risks associated with long-lived credentials or the exposure of sensitive data.

Harrier registers the EC2s by first making a GitHub API call to fetch the token. At this time, the instance ID of the EC2 is communicated to GitHub so that Harrier can link the token, and the associated workflow, with the specific EC2 for future processing. The token string is then passed into a bash script, which is remotely executed on the EC2 instance using AWS Systems Manager (SSM). The script executes the self-hosted runner application with the appropriate registration parameters and finalizes the connection of the runner to GitHub, making it available to receive and run a workflow job.

\=\> click here for detailed insight into challenges and problem solving approach

- _Security considerations for JIT token_
- _Org level scope versus repo level scope of runner token_
- _SSM delivery versus other methods to execute run.sh (how do we run a command line prompt for an EC2 that starts from STOPPED, where it is no longer possible to pass in a USER DATA parameter with a script?)_

## 4.4 Termination of EC2 runners

Harrier runners are ephemeral VMs designed to ensure an isolated and clean runtime environment for each workflow job and prevent data leakage from one run to the next. As such, the EC2s must be terminated upon completion of the workflow run. When a GHA workflow is completed, GH generates a webhook notification and sends it to the user’s Amazon API Gateway, set up by Harrier (detailed discussion in 4.7). The webhook payload contains the instance ID of the EC2 (obtained at the time of token registration) that just completed the workflow run, which is then passed to an AWS Lambda so that the EC2 can be terminated.

Harrier enhances this basic termination mechanism with an optional delayed termination feature. Users can configure a grace period window during which the same EC2 can be reused for identical workflow runs dispatched by the same GHA user. This optimization is particularly helpful during iterative development sessions, as it further reduces the startup configuration time of the EC2 for repeat workflow executions. It is important to note that only the exact same workflow job, run by the same user, within a small time window is allowed to re-use an EC2 in order to ensure proper data security. Therefore, Harrier keeps track of the workflow data for each EC2 run and compares the data of an EC2’s previous run with the current runner request to verify that only exact matches can reuse a runner during the delay window. When using this optional feature, the EC2 instance is terminated only after the EC2 remains idle throughout the user-configured grace period.

\=\> click here for detailed insight into challenges and problem solving approach

- _But just how did we determine what kind of workflow job could be run on a previously used runner? And what use case does this satisfy? Is this a realistic use case?_

## 4.5 S3 Bucket Cache Store

Setting up the alternative runner infrastructure in the user’s own AWS cloud environment enables the provisioning of Harrier’s most critical resource – an Amazon Simple Storage Service (S3) bucket to serve as the dedicated persistent cache store. The S3 bucket is pre-configured with default directories that align with common caching patterns in GitHub Actions workflows.

Each EC2 instance is automatically pre-configured to access this cache store through Mountpoint for Amazon S3, an open source file client for mounting an S3 bucket as a local file system, making it convenient to transfer cache files back and forth between the EC2 and the S3 bucket. The globally unique naming convention of S3 buckets simplifies this integration, as Harrier only needs to pass the bucket name as a constant during EC2 provisioning to enable the connection.

The provisioning and mounting of the S3 bucket to the EC2 allows users to configure their workflow yaml file to cache any duplicate work, whether it is through user-generated custom steps or publicly available actions (e.g. Docker’s build-push-action provides users with optional parameters that designate cache endpoints, enabling the caching of docker image layers).

\=\> click here for detailed insight into challenges and problem solving approach

- _Different types of storage options (this seems like a common first question)_
- _tar.gz zip file stored in the S3_
- _All the different types of files that can be cached\!\!_

## 4.6 Node modules cache

During the dependency installation step of a Node.js workflow, the npm package manager first inventories already installed dependencies, thus completely bypassing the installation step for those dependencies, and then inventories previously fetched installation files for the dependencies that need to be installed, thus bypassing the network fetch step. Harrier’s out-of-the-box cache support focuses on short circuiting the installation step for maximum time savings. For Node.js projects, this is accomplished by caching the entire node_modules directory.

During the first run of a project’s workflow through the Harrier-provisioned runner infrastructure, the workflow will go through a full installation of dependencies as the cache is empty. This first run will create a node_modules directory on the EC2 as part of the workflow run, allowing Harrier to cache the newly created node_modules directory into the S3 bucket. Due to the size of the node_modules directory (the directory can be as small as 10MB for small projects, but could be 1GB or larger for bigger projects) as well as the presence of symlinks (symbolic links), Harrier compresses the entire node modules directory into a TAR archive file and saves it into the S3 bucket. At this time, a timestamped cache key is also created using the checksum hash of the package.json file, with the idea that a modification in the package.json file would invalidate the cache.

After this first run, Harrier provides users with the option to load the node_modules directory from the cache, prior to the dependency installation step. Unlike GHA’s cache action, Harrier does not invalidate the cache at this point even if the package.json file has been modified from the previous run, as Harrier is of the opinion that any amount of installation short circuiting is preferable to a full dependency installation. Once the node_modules directory has been loaded, the npm install step will proceed with an incremental installation.

Only after the dependency installation step has been completed will Harrier look to invalidate the cache. If the package.json file has not been modified since the previous run, as checked by comparing the checksum hash of the package.json file, then there is no need to modify the cache and so no further steps are required. However, if the package.json file has been modified, then the newly modified node_modules directory is compressed into a new TAR file and saved into the S3 bucket. The cache-store process ends up overwriting the previously cached TAR file since the cache-load process only cares about loading the most recent node_modules directory.

Harrier recognizes that different branches may have different dependency configurations and thus identifies the cached files by both repository name and branch name. Even though each branch has its own cache, they most likely share a significant number of common dependencies, and Harrier takes advantage of this fact to speed up the dependency installation step for a workflow run pertaining to new branches. When a workflow is run on a new branch, even though there isn’t a cache pertaining to this specific branch, Harrier will load a cached node_modules directory from another branch in order to speed up the dependencies installation step, ensuring that every workflow run of a repository after the first ever workflow can experience faster workflow automation through cache.

\=\> click here for detailed insight into challenges and problem solving approach

- _Sym links in the node modules directory complicates the transfer of the directory files_
- _What exactly is the difference between branches? Saving cache per branch, but allowing branches to share cache as needed?_
- _What other types of data files could be cached? For what type of workflow activity? (docker layers)_

## 4.7 API platform integration & \_\_

When using GitHub Action default runners, the integration steps necessary to transfer the code from the GitHub repository platform to the VM runner platform is abstracted away from users. However, when using self-hosted runners, it is no longer GitHub’s responsibility to ensure that proper communication channels are established between GitHub and the alternative runner environment. Therefore, Harrier takes on this responsibility so that the integration steps are still abstracted away from users, maintaining as much of the same GHA user experience as possible.

Harrier first establishes connectivity between GitHub Actions and the user's cloud infrastructure by deploying an AWS API Gateway with an HTTP endpoint to receive GitHub webhooks. Then, Harrier configures a webhook on the GitHub organization, specified by the user during the initial configuration setup, set to trigger on workflow status updates. This is accomplished by making a call to GitHub’s REST API for creating webhooks and passing in two arguments:, the newly established AWS HTTP endpoint and the user’s GitHub Personal Access Token that is used for authorization purposes (link to “click here for more” to read about how AWS secrets manager is used to protect user’s PAT from Harrier). Lastly, Harrier creates an events manager service in the form of an AWS Lambda which processes webhook data. When a workflow starts, a Lambda selects and activates an available EC2 from the warm pool. Upon workflow completion, a different Lambda terminates the used runner. In order to maintain the desired fleet size, the event manager service handles the provisioning of a new replacement EC2 instance to maintain the warm pool and runner fleet.

\=\> click here for detailed insight into challenges and problem solving approach

- _Limiting inbound traffic to GH Webhook IP address ranges (this is not yet implemented but if i remember correctly, it’s a really simple adjustment)_
- _What is a github PAT_
- _What is aws secrets manager_
- _how AWS secrets manager is used to protect user’s PAT from Harrier_

## 4.8 Minimal workflow modification

The last critical piece of the Harrier design is lowering the barrier to accessing and utilizing cache provided by the alternative runner infrastructure. This is accomplished by first making it easy to divert the workflow from the default GHA runner to the alternative runner and then making it easy to take advantage of the out-of-the-box cache solution.

In order to begin running workflows on the newly provisioned self-hosted runners, users have to simply change the \`runs-on\` value in the YAML file of the workflow to “self-hosted”. Harrier uses the “self-hosted” label instead of a custom label such as “harrier-runner” to emphasize the fact that the entire alternative runner infrastructure is hosted and managed by the user.

Harrier also provides a simple mechanism for using the out-of-the-box solution for caching dependencies through two public actions on the GitHub Actions Marketplace: \`harrier-cache-load\` and \`harrier-cache-store\`. Users have to simply drop in these one-line steps before and after the dependency installation step in their workflow in order to experience faster workflow build speeds.

\=\> click here for detailed insight into challenges and problem solving approach

- _What are public actions_
- _Process for publishing actions_
- _How public actions are implemented in a user’s workflow_

Harrier uses the “self-hosted” label to route workflow jobs to the user’s new self-hosted runners. As the default label provided by GitHub and given that Harrier was design to operate as a

Thus, once the setup process is complete, users can start running workflows on their new self-hosted runners by changing the \`runs-on\` value in the YAML file of the workflow they wish to run to “self-hosted”. Similarly, Harrier makes it easy for users to begin using caching strategies to speed up their workflows by providing two public actions on the GitHub Actions marketplace: \`harrier-cache-load\` and \`harrier-cache-store\`, that the users can reference. A user simply adds two additional steps to their workflow file and they’re ready to go.

Example:

| `jobs:  build:  --runs-on: ubuntu-latest  ++runs-on: self-hosted   steps:    - uses: actions/checkout@v4    - name: Build Project     run: build    - run: harrier/cache-load` |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## 4.9 Overall Architecture

Here is a diagram that outlines the overall system architecture created by the Harrier agent within the user’s cloud account.

\=\> click here for detailed insight into challenges and problem solving approach

## 4.10 Deployment

Provide user with a setup.yml file that has a one-line action that points to the setup code.

## 4.11 Performance benchmark

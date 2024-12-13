# Harrier Implementation

\[\[ DIAGRAM of Harrier architecture \]\]  
\[\[ DIAGRAM of cache-load and cache-store, more generally \]\]

## Building a Robust Cloud Infrastructure for Harrier

### **The Right Cloud Platform for Harrier Users**

#### **AWS Cloud Platform**

We selected AWS as the cloud platform for hosting the user's self-hosted runner because it met all our criteria. AWS is the most widely adopted cloud platform among developers in 20241. AWS offers various configuration options for setting up GitHub Actions self-hosted runner infrastructure, tailored with different processors, storage, and networking to meet users' preferences. It also meets our security criteria, with a Secrets Manager function and adopting OIDC standards for secure integration with GitHub. Lastly, the AWS combination of API Gateway and Lambda is highly effective for managing webhooks, which we use to process GitHub Actions workflows.

Setting up cloud resources securely minimizes a known risk of sensitive information exposure when reusing hardware for self-hosted runners.2 Harrier provisions servers exclusively for running workflows, ensuring they are isolated within a dedicated area of the user's AWS environment. These servers are restricted from accessing any other parts of the user's infrastructure, maintaining a strict separation of resources and data.

#### **Provisioning Infrastructure Programmatically**

We chose the AWS Software Development Kit (SDK for JavaScript v3) to provision and manage the user's cloud infrastructure and handle application installation on the user's AWS account. The SDK is designed for developing and deploying applications, offers excellent TypeScript support, and simplifies the process of calling AWS services using JavaScript.

AWS also offers the Cloud Development Kit (CDK), an infrastructure-as-code tool that allows developers to define AWS resources using code.3 However, in practice, SDK provided us with more precise control over the resources and simplified our interactions with them during runtime than CDK did.

### **Runner Deployment Method**

AWS cloud infrastructure can be customized to deploy GitHub Actions runners in various ways. We compared the three most viable methods: AWS Lambda, Fargate, and EC2.

#### **AWS Lambda**

AWS Lambda is a serverless compute service that executes your code in response to events while automatically managing the underlying compute resources.4 However, after thorough research and testing, we have determined Lambdas to be unsuitable for deploying self-hosted runners to process jobs for most users for two primary reasons:

First, Lambda functions are designed to process individual events or complete single tasks rapidly—typically within one second for most production invocations.5 In contrast, user workflows usually consist of multiple steps within a job rather than just one isolated task or event.

Second, AWS Lambdas can run code for a maximum of 900 seconds (15 minutes) before timing out and halting execution.6 This limitation does not allow enough time to complete GitHub Actions workflows, which often exceed 15 minutes. In comparison, GitHub-hosted runners permit each job in a workflow to run for up to 6 hours.7

#### **AWS Fargate**

AWS Fargate is a technology that provides on-demand, appropriately sized compute capacity for containerized applications8. We considered using Fargate to deploy self-hosted runners due to its desirable features, including ease of setup and configuration and a reasonable price-performance ratio. We compared the suitability of Fargate to EC2 where relevant.

Fargate has a slower initial response time than EC2. This makes Fargate less suitable for providing faster workflow run times. Users report that Fargate initialization times range from approximately 30 seconds to several minutes. In contrast, EC2 instances, when configured within a warm pool, can achieve a complete restart in an average of just 20 seconds.11

Fargate offers processor configuration options, such as the number of CPUs and the amount of RAM. However, it does not allow users to select specific CPU processors and may not always support the latest hardware, both of which are important for Harrier to provide a range of user options. In contrast, AWS EC2 instances provide access to the most current and powerful CPUs, allowing the user to specify the exact processor type required for their workloads.

Many developers also reported that Fargate can be more expensive for high compute usage compared to EC2.9 The cost difference largely depends on how each solution is implemented, but overall, Fargate tends to be pricier than EC2.10

#### **Efficient and Responsive EC2 Management**

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure and resizable compute capacity in the cloud.12 When an instance is launched on AWS, a root volume is created and contains the image used to boot the instance. Each instance has a single root volume, and AWS recommends using Elastic Block Storage (EBS) for fast launch and persistent storage. EBS is a scalable, high-performance block storage resource to store files or install applications.13

Initially, we noticed that the full startup time for an EC2 instance ranged from 2 to 5 minutes, which is too long to wait before starting a workflow. To address this cold startup issue, we created a "warm pool" of EC2 instances on AWS. According to AWS documentation, a warm pool consists of "a pool of pre-initialized EC2 instances that sit alongside an Auto Scaling group." However, Auto Scaling groups can respond slowly to incoming requests, sometimes taking over 60 seconds. To improve responsiveness for Harrier, we automatically manage the state of EC2 instances using AWS Lambda functions, which can react to requests in less than 1 second.

EC2 instances in the warm pool can be in one of three states: Running, Stopped, or Hibernated.

Maintaining instances in either a stopped or hibernated state is an effective way to minimize cloud costs for users since they only incur charges associated with the attached EBS volumes and IP addresses.14

We tested hibernating instances but encountered unreliable and unpredictable results. Sometimes, hibernating EC2 instances would not shut down properly and required a reboot, taking about 4 to 5 minutes. Additionally, hibernation is not supported on all instance types, which could diminish the level of configurability available to Harrier users.

In contrast, we did not experience issues with stopping and restarting _stopped_ instances. These instances can be quickly restarted to process a workflow, with our EC2 instances transitioning from stopped to running in approximately 15 seconds. In addition, when an EBS-backed instance is stopped, that instance retains any associated Elastic IP addresses and attached EBS volumes, including the data on those volumes.

#### **One or Multiple Available Runners**

By default, GitHub Actions maximizes the number of jobs that run in parallel based on the availability of runners. This feature allows individual users and multiple users or teams to execute multiple workflows or a single workflow with several jobs concurrently. Harrier achieved a similar effect by providing users with a fleet of additional runners.

Since stopped instances incur only minimal charges, the cost of adding more stopped instances is a reasonable trade-off for individuals or teams wanting to run workflows in parallel.

Harrier setup defaults to provisioning ten EC2 instances on the user's AWS account. However, users can easily adjust the number during setup.

### **Setting up the Environment for Deployment**

#### **VPC and Public Subnet**

AWS recommends using separate VPCs to isolate infrastructure by workload or organizational entity15. Harrier EC2 runners require direct internet access to download software, send API requests to GitHub, and process GitHub Actions workflows. Internet access was also needed for any delivery and deployment functionality in user workflows, like saving artifacts to Docker Hub.

Harrier sets up a VPC, which includes a public subnet and an internet gateway, within the user's AWS account. The internet gateway allows internet access for the EC2s. Traffic from the internet gateway is routed to the public subnet using the routes in the routing table.

#### **Operating System**

GitHub Actions-hosted runners use Ubuntu 22.04, which, at the time of Harrier implementation, is the version referenced by the "ubuntu-latest” value of the "runs-on” key of workflow YAML files.16

We considered Amazon Linux an operating system option because Amazon promotes it as having the latest AWS features and being optimized for Amazon EC2 instances. However, after testing it, we found that using Amazon Linux required significant modifications to user workflows. For example, many processes that work in Ubuntu, such as using \`apt-get,\` do not function in Amazon Linux, which relies on alternative package managers like \`yum/dnf.\` Although there are workarounds, we wanted to prioritize a low-friction user experience when migrating from a GitHub-hosted runner.

Harrier sets up each new EC2 instance with an image running the Ubuntu 22.04 operating system.

#### **Preparing the EC2 with Applications**

To prepare the runner to process workflows, the Harrier setup process automatically installs applications on the EC2 instance EBS volume, such as the GitHub self-hosted runner application itself, Docker Engine, and build-essential software tools.

The GHA self-hosted runner application is downloaded and installed once on each EC2 instance. For the runner to process any workflows, it needs to be registered and configured with GitHub, which requires a token from GitHub Actions.

### **Configuring a Self-Hosted GitHub Actions Runner**

#### **Self-hosted Runner at the Organization Level**

GitHub allows you to register self-hosted runners at the organization, repository, or enterprise levels. We decided to add the self-hosted runner at the organization level because it makes it accessible to multiple repositories and enables easier management of the runners in a single location17.

#### **Accessing the GitHub API for Runner Setup**

GitHub has a REST API to register, view, and delete self-hosted runners in GitHub Actions. A GitHub Personal Access Token is required to access the GitHub API programmatically. The user can create a Personal Access Token (PAT), scoped to allow requesting self-hosted runner tokens and also setting up webhooks.

#### **Automating Runner Registration with the GitHub API**

Harrier automatically downloads the GitHub self-hosted runner application, which has all the necessary files to set up and run the runner.18

Harrier setup also requests the GitHub API to create a registration token for the user's organization. The API responds with a token and an expiration date.

Once extracted, the token is passed to the GitHub self-hosted runner configuration script to register the runner with the user's GitHub organization. Once registered, the self-hosted runner is now authorized and ready to process workflow jobs originating from that organization.

\[\[ DIAGRAM \]\] Illustrating the back-and-forth communication: requesting a runner token and using that token to access the GitHub API or run the configuration script for runner setup.

### **Just-in-Time (JIT) Runners**

#### **What Are JIT Runners**

In mid-2023, GitHub introduced Just-In-Time (JIT) runners, a feature that allows users to create ephemeral self-hosted runners via the REST API. With JIT runners, each workflow run utilizes a newly instantiated runner, which enhances both security and availability.20

#### **Using JIT Runners in Harrier**

When a new JIT (Just-In-Time) runner is registered, it is added to the GitHub Actions list of runners for the user’s organization. Initially, the runner appears as "Offline" on GitHub until the self-hosted runner application on the EC2 instance is fully set up to handle incoming workflow runs. Once configured, the runner's status changes to "Idle," signaling GitHub to route queued workflow runs to it.

JIT runners are designed to execute a single job. After completing the workflow job, the runner shuts down and is automatically removed from the organization's list of self-hosted runners on GitHub.

Harrier users benefit from the enhanced security of JIT runners. By requiring a unique token for every workflow run, JIT runners minimize the risks associated with long-lived credentials or the exposure of sensitive data.

JIT runners also ensure high availability. Since a new runner is provisioned for each workflow, users are guaranteed a ready-to-use runner whenever a workflow is triggered. Unlike persistent runners, which GitHub may remove after 14 days of inactivity—potentially causing workflow failures—JIT runners eliminate the need to reconfigure expired runners. This simplifies operations and reduces the risk of downtime.

### **API Gateway for Receiving Webhooks**

A webhook is a lightweight, event-driven communication that automatically sends data between applications via HTTP21. When a workflow runs on GitHub Actions, a webhook event is triggered to send data to the Harrier app hosted on the user's AWS environment. This webhook transmits information about the workflow run as a JSON object, which includes an "action" property specifying the event type, such as "queued" or "completed."

We used AWS API Gateway to create and manage a simple REST API for receiving webhooks from GitHub Actions. REST APIs act as the "front door" for applications to access data, business logic, or functionality from backend services.22 ​​API Gateway handles all the tasks involved in accepting and processing API calls, including traffic management, authorization, and access control, monitoring, and API version management.

Together with AWS Lambda, API Gateway forms the app-facing part of the AWS serverless infrastructure. The AWS API Gateway receives the workflow data from the GitHub webhook and passes it to a Lambda setup by Harrier to manage EC2 instances.

One alternative to using AWS API Gateway would have been to run a JavaScript Express server continuously on an EC2 instance to implement a REST API. A long-running server or process is unnecessary since AWS provides a fully managed API service that requires minimal setup or maintenance on our part. API Gateway is highly cost-effective since charges are based solely on the number of requests and the amount of data transferred. In our case, minimal data passes through the API Gateway — just event notifications from GitHub and a 200 response in return. All significant data transfers occur directly between GitHub and the EC2 instance, bypassing the API Gateway. Each workflow involves only three events, with negligible data exchange.

#### **AWS S3**

Simple Storage Service (S3) is an object storage service for users to store, manage, analyze, and protect any amount of data for virtually any use case.23

Harrier provisions a single S3 that is shared across all users and workflows within the organization. The S3 is used to store the current status of EC2 instances as well as cache artifacts generated from workflow runs. Harrier uses Mountpoint, an open-source file client, to manage the S3 using standard Linux file system operations.

### **Lambdas**

\[\[ DIAGRAM: We have 3 Lambdas: the Workflow Lambda, the Timeout Lambda, and the Cache Eviction Lambda. 3 Lambdas and what they do \]\]

#### **The Workflow Lambda and Timeout Lambda**

GitHub sends a single HTTP POST request to the user's AWS each time a new workflow is run. The API Gateway receives this request and invokes the Harrier Workflow Lambda.

The Harrier Workflow Lambda code was designed to capture requests from GitHub via the API Gateway and parse the information based on the "action” property of the Request object, which can have a value of "completed," "queued," or "in-progress."

In addition, there is also a "ping” request, identified by its unique “zen" property, which is sent out by GitHub each time a new webhook is created. The Workflow Lambda sends a response to GitHub with a 200 status, indicating a request has been received successfully.

**EC2 Status**  
Harrier uses the AWS SDK to retrieve details about EC2 instances, including their state and ID, to efficiently manage resources for running workflows. EC2 instances are categorized into "Running" or "Stopped" states. Harrier further refines the "Running" state into "busy" for instances currently processing workflows and "idle" for those ready to accept new workflows.

The Workflow Lambda tracks and updates the status of EC2 instances by maintaining JSON objects in the user’s S3. When a workflow is initiated on GitHub, the Lambda evaluates available EC2s by looking for an “idle” instance. It attempts to restart an “offline” instance if none are available. If neither is possible, the workflow remains queued until an instance becomes available.

To prepare an instance for a new workflow, the Workflow Lambda sets up the runtime environment by mounting an S3 for caching, retrieving a JIT self-hosted runner token from the GitHub API, and executing the runner application.

Once a workflow is completed, GitHub sends a "completed" event to the API Gateway, which triggers the Timeout Lambda. This function enforces a user-defined delay to keep the instance running temporarily, allowing for efficient handling of potential quick reruns. If the instance remains idle at the end of the timeout period, it is stopped and returned to the warm pool. This approach allows users to balance cost and responsiveness, adapting the timeout period based on the likelihood of reruns and their operational priorities.

#### **The Cache Eviction Lambda**

The Cache Eviction Lambda is triggered by an EventBridge Scheduler. By default, the scheduler triggers the Lambda every night at 3:00 AM, a time chosen to minimize interference with workflow activity. The Lambda scans the user’s S3 and deletes cache files that have not been accessed in the past 72 hours.

## Caching

GitHub Actions allows users to use pre-written building blocks, which GitHub documentation somewhat confusingly refers to as " actions" in workflows. An action in this context is a pre-defined, reusable set of jobs or code that perform specific tasks within a workflow.24 Harrier uses three public actions published on the GitHub Marketplace, a central location, for availability and transparency.

- harrier-cache-load
- harrier-cache-store
- harrier-runner-setup

### **Dependency Cache Loading and Storing**

Harrier caching functionality is implemented through two public actions: cache-load and cache-store. These actions can be used as steps in any GitHub Actions workflow with access to the Marketplace.25

Together, harrier-cache-load and harrier-cache-store form a caching mechanism that minimizes redundant dependency installations and optimizes workflows. By supporting both branch-specific and repository-wide caches, the actions reduce build times while ensuring compatibility with changes to package.json.

The harrier-cache-load action restores a cached node_modules directory. It checks for a tarball—a compressed archive file (e.g., .tar.gz)—in the user’s S3, using the current repository and branch in the filename. If a branch-specific tarball is found, it is copied and extracted into the workflow directory. If none exists, the action will fall back to a repository-wide tarball to reuse dependencies across branches. If no cache is available, the workflow proceeds with installing dependencies from scratch.

The harrier-cache-store action updates the cache after dependencies are installed. It first checks for a cache key in a metadata storage location for the current branch, then falls back to checking for a repository-wide key. No action is taken if a matching key exists and its hash matches the current package.json. Otherwise, the action creates a new tarball of the node_modules directory, stores it in the user's S3 and generates a new cache key. This ensures caches are updated for both branch-specific and repository-wide use.

\[\[ DIAGRAMs , more detailed, for Harrier-cache-load and harrier-cache-store \]\]

### **Performance Gains with Harrier Cache**

\[\[ DIAGRAM / GRAPH here showing workflows run on self-hosted with Harrier cache vs GHA \-hosted runner with GH cache action \]\]

### **Harrier Cache Eviction Policy**

To prevent the accumulation of unnecessary or stale data, Harrier includes an automated cache eviction mechanism. An EventBridge Scheduler and Lambda work together to manage

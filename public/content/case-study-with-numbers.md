# 1\. Introduction

# 2\. Problem Domain

## 2.1 GitHub Actions: A Powerful CI/CD Tool

![Diagram](public/ci-cd-steps-boxes.png)

GitHub Actions (GHA) has emerged as a cornerstone in modern software development, empowering developers and teams to streamline their CI/CD workflows. With its widespread adoption, GHA is now a vital tool in the toolkit of over **57.8% of GitHub repositories**, solidifying its position as the leading CI/CD technology. In comparison, other tools like Travis CI, while significant, serve a smaller share of **38.8%** of repositories.

Given its prevalence, addressing points of friction in GHA workflows can have a meaningful impact on the day-to-day experience of developers. Improving usability or streamlining processes within GHA can help teams work more efficiently and with fewer obstacles. This makes it a particularly compelling area of focus for projects aimed at improving software development tools.

### **2.1.1 CI/CD and DevOps: The Backbone of Modern Software Development**

Modern software development is a complex endeavor performed by large teams of experts, which require a great deal of communication and integration to ensure high-quality products. To deliver software successfully, it is important to have as much alignment between teams throughout the entire development process. DevOps is a philosophy and culture that enables agile development while supporting collaboration, automation, and continuous improvement. One of the key components of DevOps is Continuous Integration and Continuous Delivery/Deployment (CI/CD).

Continuous Integration (CI) centers around integrating code changes from multiple developers into a shared repository, as frequently as possible (source: codefresh). The desired impact of this practice is to stabilize the code base by discovering and resolving issues as early as possible in the development lifecycle. The output of CI is tested high-quality code that can be deployed to a staging or production environment.

Continuous Delivery (CD) utilizes the artifacts created by the CI process and ensures that the software is always in a releasable state by subjecting the code to rigorous tests and checks in a staging environment so that it is production ready (source: codefresh). Continuous Deployment is an advancement from CD that removes human intervention from the deployment process with the addition of automated acceptance testing as the final step of the release cycle (source: geeksforgeeks).

By automating the software development and release processes, CI/CD enables teams to streamline their workflows and enjoy the following benefits (source: codefresh):

- Early detection of issues
- Improved team collaboration
- Faster release cycles and rapid releases
- Reduced risk of failed deployments
- Improved and faster user feedback

![Diagram](public/ci-steps-green-box.png)

CI/CD practices will remain central to software development for the foreseeable future. As software development grows increasingly complex, the automation and reliability CI/CD provides will continue to be indispensable for maintaining efficiency, minimizing errors, and enabling rapid iteration. These practices are not just trends; they are enduring pillars of the DevOps philosophy, ensuring developers can focus more on innovation and less on repetitive tasks.

### **2.1.2 GHA Workflow Automation**

Automation is the implementation of tasks or processes without human intervention, enabling increased efficiency and productivity. It involves streamlining repetitive, time-consuming, and error-prone tasks, freeing up developers to focus on higher-value activities and ultimately leading to higher-quality outcomes.

Within software development, a **workflow** is a defined sequence of automated steps or jobs that coordinate tasks, tools, and resources. GitHub Actions (GHA) lets developers automate workflows directly from their code repositories. Within GHA, workflows are YAML-based configuration files that define automated processes triggered by events like code commits, pull requests, or other user-triggered events.

As of 2023, over 100 million users are leveraging GitHub globally to manage over 400 million code base repositories and coordinate their software development activities. With over 200 million repositories with actively deployed workflow automations, GHA has established itself in just over five years since launch as an indispensable tool for software development. (source: github pr post)

### **2.1.3 GHA and CI/CD automation**

Given that GitHub Actions was designed to provide native CI/CD automation support, GitHub workflows are almost entirely related to CI/CD processes (source: github launch deck). Through GHA, one can automate tasks such as linting tests before a project build, the actual build process, unit tests performed after a build, auto deploy, just to name a few.

However, GHA as a CI/CD tool is not without its limitations (source: reddit.) Areas where some consider it falling short are:

- Limited visibility of workflow artifacts & robust artifact management.
- Limited tooling for debugging workflows.
- Limited support for event-based workflows originating outside of GitHub itself.
- Performance ceiling for enterprise-level workflows.
- Yaml-based workflow configuration.

The above limitations may lead a developer or organization to consider alternative approaches to address their specific CI/CD needs.

One approach is to consider alternative open-source DIY solutions, such as Jenkins or Red Hat’s Ansible. Such approaches allow for a greater degree of control and customizability at the cost of considerable ramp-up investment, introducing cross-platform integration complexity, and shouldering the responsibility for maintenance.

To alleviate the efforts required by taking a DIY approach, another approach is to consider 3rd-party managed CI/CD services, such as Travis CI or Circle CI. These subscription-based solutions involve minimal setup, strong performance optimizations, and seamless scaling on managed infrastructure. Compelling as they are, taking this approach isn’t optimal for specific users as it comes at the cost of exposing code to an external source and being locked within the 3rd party provider’s platform.

Despite the advantages the above alternative approaches provide, still many developers and teams opt to stay within the GHA ecosystem for the following reasons:

- Native integration between code base and workflow automation tooling activities
- Zero responsibility for infrastructure management by the user
- Access to open-sourced marketplace for various automation customization and innovation

GitHub Actions strikes a balance, offering flexible, GitHub-centric workflows with easy setup and scalable performance, and so for those who are already within the GitHub ecosystem who also…

- … don’t want to deal with the overhead of managing and troubleshooting their own infrastructure or relying on and being beholden to vendors for their CI/CD processes,
- … are excited about collaborating with a community to access and contribute towards cutting-edge CI/CD practices,
- … are comfortable using yaml files to setup workflows,
- … like the possibility of leveraging various other 3rd-party tools/platforms on an as-needed basis,

GHA becomes a natural choice as a CI/CD tool.

With GHA Marketplace being a welcoming environment/community for innovation, it provides a space where teams like us can explore various ways to make a contribution.

## 2.2 Slower than desirable CI Build Speed

The speed of automation is a critical factor in unlocking the full benefits of CI/CD (outlined above), as faster automation equates to rapid feedback loops, and faster the feedback, the more agile and efficient the development workflow. Both CI and CD processes can be optimized to enhance automation speed, but the impact of CI speed is greater than CD speed as the frequency of code integration is far greater than the frequency of software deployment.

Faster CI builds dramatically reduce developer context switching and idle time, transforming waiting periods into productive coding opportunities. By minimizing build friction, engineering teams can iterate more rapidly, accelerate feature delivery, and maintain a state of continuous flow that directly translates to increased shipping of software. Therefore, identifying performance bottlenecks in the CI build step—compiling code, resolving dependencies, performing necessary tests, and creating artifacts is crucial for improving the overall software development lifecycle.

Despite the numerous benefits of utilizing GHA as a CI/CD tool, GHA is often cited as the cause of slower than desirable CI builds, as evident by the numerous GitHub Issues and GitHub feature requests (source: GitHub’s own Issues page) related to slow CI builds submitted by GHA users, as well as the significant investment made within the tech sector on products that can accelerate GHA workflows.

### **2.2.1 Unpacking GHA’s original design**

GitHub Action’s automated workflows are executed on servers that are called runners. GitHub provides default runners as a service in order to abstract away the process of provisioning and setting up a server, thus freeing up the user to focus on the details of the workflow.

Given the need to provide the 100+ million GitHub users with a clean runtime environment with minimal risk of data leakage between jobs or users, GitHub leverages the Microsoft Azure cloud platform (GitHub being a Microsoft company) to provision brand new virtual machines (VMs) for each job specified in workflow files to address the isolation and security concerns, which are promptly destroyed after job completion.

One of the most significant impacts of GitHub’s runner infrastructure on CI build speed is that it severely limits the use of caching throughout the workflow execution. Caching is a data-management method that reuses previously created information (i.e. cache) rather than creating it again (source: bitrise). For a highly iterative and repetitive process such as code integration where each integration may represent only a small change in the code base, computations run quicker when the need to create the same thing over and over is eliminated. Caching is made possible by storing the cache in a temporary storage so that it can be accessed in the future, and this is where GitHub’s design of its runner infrastructure creates limitations – the destruction of the VM immediately after job completion necessitates the cache to be placed in a persistent storage outside of the VM but GitHub did not provide such a storage option at the outset, making it extremely difficult for users to take advantage of caching in their CI builds.

In addition to the limitation presented by the runner infrastructure design, GitHub only provides limited runner infrastructure hardware options that prevent users from forcing through faster builds by means of vertical scaling.

### **2.2.2 Limitations of GHA Cache Action**

The limitations around CI build speed within GHA was significant enough to warrant GitHub itself taking action. Within a couple years after launch, GitHub Actions introduced a paid-tier offering of more powerful machines to help address CI build speed concerns. In addition, they also released and incrementally improved a much-demanded native cache solution on the GHA Marketplace, actions/cache.

GHA’ cache feature seeks to enhance overall workflow efficiency by storing and reusing dependencies and files produced from workflow run operations. Key features of GHA’ Cache include:

- Seamless integration with existing workflow files.
- Preset cache eviction strategy with no option for further customization and 7 day automatic deletion.
- 10 GB cache data storage _per_ repository.
- GitHub REST API (offering limited cache management) \[Necessary??\]

This native cache solution satisfied some users, but for others, the solution proved woefully inadequate. To better understand this second category, let’s use an example.

Developers working on complex mono-repo codebases quickly encounter significant challenges with GitHub Actions' caching limitations. As node_modules directories frequently balloon beyond 10 GB—driven by an ecosystem of libraries, testing tools, linters, and build dependencies—the limited repository cache becomes critically constraining. This storage pressure creates an immediate performance bottleneck, forcing teams to constantly juggle and optimize their dependency management strategies.

The introduction of multiple branches further complicates cache resource utilization and limits the efficacy of cache generally. Each branch, with potentially unique dependencies and workflow configurations, competes for limited cache space—creating an environment where a single feature branch's large dependency update could unexpectedly evict critical cached artifacts that builds on the main branch rely upon. This volatility renders cache utilization unpredictable, turning what was originally intended as a performance enhancement into a fragile and at times unreliable build speed optimization strategy. What emerges is a complex challenge where intelligent cache management becomes as crucial as the software development cycle it seeks to streamline.

Considering the limitations of actions/cache and the healthy demand for faster CI builds, cache within GHA is a great area for exploring alternative solutions.

## 2.3 Cache that Matches Workflow Demands

For those exploring innovative solutions to get around the caching challenge posed by GHA’s infrastructure limitations, the first priority becomes provisioning an alternative runner infrastructure that allows users to reimagine the GHA CI build environment with persistent cache storage.

GitHub recognized the user demand for exploring higher degrees of runner customization than what can be provided by the out-of-the-box configurations and released a Self-Hosted Runner feature soon after launching GHA. The self-hosted runner solution was meant to provide users with greater control and customizability that they wanted while allowing GitHub to offload the responsibility for maintaining these one-off infrastructures to the users themselves. For those users who really want to remain on the GHA ecosystem to experience the benefits of a CI/CD tool that is tightly coupled with their code base, self-hosted runners can be utilized as a key component to their CI build performance optimization strategies.

GitHub’s Self-Hosted Runner feature allows users to configure their own infrastructure by downloading and installing GH’s runner application, which installs the necessary software to connect and execute GHA workflows. Through this application, the user can optimize their hardware, operating system, and software environment to meet specific CI build requirements. For example, it is now possible to utilize machines with higher CPU or memory specifications, install proprietary software, or access resources within a private network.

The Self-Hosted Runner feature can be deployed on a local machine, on-premises server, or even on a cloud infrastructure. For organizations who already have their own on-premises servers with both server resources to spare and dedicated operations teams to manage the infrastructure overhead, perhaps using their hardware as dedicated GHA runners may be a great option. However, for many, the desire for resource optimization and minimal administrative overhead leads to the conclusion that on-demand runners on a managed cloud infrastructure would best serve the needs of a GHA runner.

### **2.3.1 Existing solutions for faster CI Builds**

There are many benefits to provisioning an alternative runner infrastructure for GHA workflows on a managed cloud platform:

- Pay only for what you use (what are the implications of on demand?)
- Infrastructure management is handled by said cloud platform
- Access to industry best-practice security measures
- Access to various network services and resources
- Reliable up time
- (Reaping all the cascading benefits of massive platform scale)

As such, currently there are many paths to realizing an alternative cloud-hosted runner infrastructure for accelerating GHA CI builds that take advantage of these benefits. These solutions largely split into two categories: DIY and 3rd-party provisioned.

For DIYers who have the knowledge and/or time and feel it is a good investment of resources to create an alternative GHA runner infrastructure by themselves to reap the benefits of faster CI builds, there is plenty of step-by-step guidance online that helps people provision an alternative runner infrastructure. (source: various show and tell medium articles).

However, those who are either lacking the time/knowledge on how to provision and set up a GHA self-hosted runner infrastructure, or don’t have the desire to allocate resources toward this effort, a more packaged solution is required. Enter the 3rd-party provisioning help.

**Overview of 3rd-Party Solutions:** Several third-party providers offer managed solutions to help users implement self-hosted runners for their GitHub Actions workflows. These solutions vary in terms of who manages the infrastructure and how the service is structured. There are two broad categories:

1. **Fully Managed Infrastructure (3rd-Party Hosted & Managed):** The third-party provider hosts and manages the entire infrastructure.
2. **User-Hosted Infrastructure (3rd-Party Provisioned, User Managed):** The provider sets up the infrastructure in the user's cloud account, but the user is responsible for ongoing management.

**Benefits of 3rd-Party Managed Runners:**

- **Speed and Efficiency:** These solutions are optimized to speed up CI/CD workflows by providing dedicated runner infrastructure, faster compute capabilities, and more efficient caching solutions.
- **Scalability:** Users can scale their infrastructure easily to meet the demands of larger, more complex workflows.
- **Cost Savings:** These services are often more cost-effective than relying on GitHub-hosted runners, with some providers offering competitive pricing models, including per-second billing and no minimum usage requirements.

**Existing 3rd-Party Solutions**

- **BuildJet (Initially Hardware-Based):** A hardware-first solution, where BuildJet provides physical infrastructure for running GitHub Actions workflows. They also offer retroactive cache attachment to speed up builds. However, this solution tends to require more upfront investment and may not be the best fit for everyone.
- **Depot (Hybrid Hardware and Software):** Depot offers a hybrid solution that uses both hardware and software to optimize performance. Their service is hosted on AWS EC2 instances, offering 30% faster compute capabilities and up to 10x faster caching compared to GitHub-hosted runners. Depot's pricing model is also competitive, offering services at half the cost of GitHub-hosted runners. Their managed solution is ideal for teams that want improved performance without the burden of managing their own infrastructure. Depot can also function as a caching orchestration layer if you prefer to host runners in your own infrastructure.
- **RunsOn (User-Hosted Infrastructure with Managed Monitoring):** RunsOn allows you to deploy self-hosted GitHub Actions runners directly within your AWS account. It focuses on simplicity and performance, offering custom configurations for CPU, memory, and even GPU support. RunsOn ensures that your code and secrets remain in your own cloud environment, addressing security concerns. This solution can reduce costs by up to 90% compared to GitHub-hosted runners.

**The Trade-Offs of 3rd-Party Managed Solutions**

While these 3rd-party solutions are great for those who want to streamline the deployment of self-hosted runners, there are some trade-offs:

- **Security Concerns:** With a fully managed solution, you may need to expose your code to the third-party provider. This can be a concern for teams with strict security requirements.
- **Vendor Lock-In:** Some solutions may tie you to a specific provider or cloud platform, which could create challenges if you want to switch providers in the future.
- **Costs:** While these solutions are often more cost-effective than GitHub-hosted runners, there are still ongoing costs associated with using these third-party services.

Given the tradeoffs, there is a need for something more akin to a 3rd-party **supported** DIY option.

### **2.3.2 Underserved Niche**

- Give me a summary of the user profile / use case scenario that fell through each option \=\> what’s left over after all the above solutions?
- For that use case, here are the details of the 3rd-party supported DIY option.

**The Need for a Middle Ground: A DIY Option with Help**

There’s a gap between DIY solutions that require technical expertise and third-party solutions that come with a price tag and potential security concerns. The ideal solution would empower developers who:

- Don’t have the time or expertise to manage their own infrastructure,
- Want to avoid the costs of fully managed third-party services,
- Need to ensure their code and secrets remain private and secure.

**Proposed Solution:** Imagine a service that bridges this gap by offering:

- **DIY Setup Assistance:** A volunteer-based service that helps developers set up and configure self-hosted runners on their own cloud infrastructure. This would provide the benefits of the DIY method without the need for deep technical knowledge.
- **No Ongoing Costs:** This solution would be free of charge, allowing users to avoid monthly fees associated with third-party providers.
- **Privacy and Security:** Since the infrastructure would be hosted by the user, the service could ensure that their code and data remain private and secure, without the need to expose it to a third party.

This service would offer a simple, secure, and cost-effective alternative for developers who want to leverage the power of self-hosted runners but don’t have the time, knowledge, or desire to manage the setup themselves.

# 3\. Harrier Design

The design of a 3rd-party supported DIY option for leveraging cache in GHA workflows involved two major pieces of work:

- Provision and configure an alternative GHA runner infrastructure with a built-in persistent cache store
- Minimize the time and knowledge investment required by the user to deploy and integrate the solution into existing GHA workflows

For development purposes, the design focused on Node.js project workflows.

- Node is the most common language on GH, making it the biggest ROI for the first pilot
- The language we are most familiar with \- quick prototyping and testing of concepts

## 3.1 Alternative Runner Infrastructure

In order for the 3rd-party support to be desirable to the targeted users, the following design requirements needed to be met:

- Full access to the GHA ecosystem (3.1.1)
- Isolated and secure workflow runtime environments (3.1.1)
- Optimized resource utilization (3.1.1)
- Persistent cache store (3.1.2)
- Out-of-the-box cache strategy (3.1.3)

### **3.1.1 On-demand ephemeral runners**

The design of an alternative runner infrastructure that retains full connectivity to the GHA ecosystem starts with the installation of GHA’s self-hosted runner application. Harrier is designed to be an agent within a user’s cloud platform, with limited privileges, that provisions runners and connects them to the GHA ecosystem. Harrier accomplishes through the following actions:

- Create a dedicated virtual private cloud so that all resources provisioned by Harrier do not impact any of the user’s existing resources
- Provision cloud servers, configure them with GHA’s self-hosted runner application, and place them on standby mode so that they are ready to receive a GHA workflow (isolation)
- Implement a runner checkout system so that a user can re-use a runner for consecutive CI builds, thus eliminating unnecessary provisioning and configuration activities
- Terminate runner servers upon completion of user activities to delete residual artifacts and prevent data leakage

### **3.1.2 Dedicated persistent cache store**

The provisioning of an alternative runner infrastructure that can be customized opens up the possibility of provisioning an additional resource that can serve as a dedicated persistent cache store. Harrier goes beyond merely provisioning a resource and enables caching as a strategy across any workstream through the following actions:

- Provision an object storage service in the user’s cloud platform that allows workflows to store, retrieve, and manage cache data
- Configure, with appropriate permission settings, each and every ephemeral runner to mount the object storage service as a local directory, simplifying and expediting the caching process

### **3.1.3 Out-of-the-box cache management of dependencies**

Proper utilization of cache in accelerating CI builds goes beyond creating a cache endpoint. Harrier provides users with an out-of-the-box cache strategy for speeding up the dependencies installation step of a CI build through the following cache options:

- Pre-load a previously cached node modules directory related to the specific branch of the code repository as a setup step
  - If cache does not exist for the specific branch, but does exist for the main repository, load the main repository node modules directory to take advantage of some cache benefits
  - If no cache is found, proceed with the remainder of the CI build
- Save the node modules directory to the cache store at the end of a CI build as a cleanup step
  - The node modules directory will be cached only if there were any changes made to it compared to the previous CI build (cleanup-side cache invalidation)
- Customizable cache eviction time-to-live to optimize cache data management

## 3.2 DIY Deployment and Integration

In order for the above design to be usable by the targeted users, the following design requirements needed to be met:

- Fully automated provisioning of the alternative runner infrastructure (3.2.1)
- Behind-the-scenes cross-platform integration (3.2.2)
- Easy to deploy (3.2.3)
- Minimal disruption and migration efforts to existing workflows (3.2.3)

### **3.2.1 Automated Cloud Infrastructure Provisioning**

The runner infrastructure is automatically provisioned by Harrier on behalf of the user to their cloud platform through the following actions:

- Proper sequencing of the necessary cloud resource provisioning
- Delegate appropriate resource permissions for interservice communication

### **3.2.2 API Platform Integration**

Once provisioned and deployed, the alternative cloud infrastructure needs to communicate with GitHub behind the scenes. Harrier automatically connects the user’s cloud infrastructure with GitHub through the following actions:

- Set up REST API on the user’s cloud platform to interface with GitHub’s API
- Prepare an event-triggered webhook that enables GitHub to communicate workflow status to user’s runner infrastructure
- Set up event-based response to start, hold in standby throughout valid checkout period, and terminate runner server
- Request just-in-time token from GitHub to register runner server for every workflow job run

### **3.2.3 GHA Marketplace Public Actions**

To minimize the barrier to implementation, the Harrier codebase deployment needs to be quick and easy. This is accomplished through the following actions:

- Publish Harrier infrastructure provisioning code as a GHA public action, which is then delivered to the user as a workflow step in a setup.yml file
- Publish Harrier’s cache management code for loading and saving cache as a GHA public action, to be dropped into existing workflow .yml files

# 4\. Harrier Implementation

\[\[ DIAGRAM of Harrier architecture \]\]  
\[\[ DIAGRAM of cache-load and cache-store, more generally \]\]

## 4.1 Building a Robust Cloud Infrastructure for Harrier

### **4.1.1 The Right Cloud Platform for Harrier Users**

#### **4.1.1.1 AWS Cloud Platform**

We selected AWS as the cloud platform for hosting the user's self-hosted runner because it met all our criteria. AWS is the most widely adopted cloud platform among developers in 20241. AWS offers various configuration options for setting up GitHub Actions self-hosted runner infrastructure, tailored with different processors, storage, and networking to meet users' preferences. It also meets our security criteria, with a Secrets Manager function and adopting OIDC standards for secure integration with GitHub. Lastly, the AWS combination of API Gateway and Lambda is highly effective for managing webhooks, which we use to process GitHub Actions workflows.

Setting up cloud resources securely minimizes a known risk of sensitive information exposure when reusing hardware for self-hosted runners.2 Harrier provisions servers exclusively for running workflows, ensuring they are isolated within a dedicated area of the user's AWS environment. These servers are restricted from accessing any other parts of the user's infrastructure, maintaining a strict separation of resources and data.

#### **4.1.1.2 Provisioning Infrastructure Programmatically**

We chose the AWS Software Development Kit (SDK for JavaScript v3) to provision and manage the user's cloud infrastructure and handle application installation on the user's AWS account. The SDK is designed for developing and deploying applications, offers excellent TypeScript support, and simplifies the process of calling AWS services using JavaScript.

AWS also offers the Cloud Development Kit (CDK), an infrastructure-as-code tool that allows developers to define AWS resources using code.3 However, in practice, SDK provided us with more precise control over the resources and simplified our interactions with them during runtime than CDK did.

### **4.1.2 Runner Deployment Method**

AWS cloud infrastructure can be customized to deploy GitHub Actions runners in various ways. We compared the three most viable methods: AWS Lambda, Fargate, and EC2.

#### **4.1.2.1 AWS Lambda**

AWS Lambda is a serverless compute service that executes your code in response to events while automatically managing the underlying compute resources.4 However, after thorough research and testing, we have determined Lambdas to be unsuitable for deploying self-hosted runners to process jobs for most users for two primary reasons:

First, Lambda functions are designed to process individual events or complete single tasks rapidly—typically within one second for most production invocations.5 In contrast, user workflows usually consist of multiple steps within a job rather than just one isolated task or event.

Second, AWS Lambdas can run code for a maximum of 900 seconds (15 minutes) before timing out and halting execution.6 This limitation does not allow enough time to complete GitHub Actions workflows, which often exceed 15 minutes. In comparison, GitHub-hosted runners permit each job in a workflow to run for up to 6 hours.7

#### **4.1.2.2 AWS Fargate**

AWS Fargate is a technology that provides on-demand, appropriately sized compute capacity for containerized applications8. We considered using Fargate to deploy self-hosted runners due to its desirable features, including ease of setup and configuration and a reasonable price-performance ratio. We compared the suitability of Fargate to EC2 where relevant.

Fargate has a slower initial response time than EC2. This makes Fargate less suitable for providing faster workflow run times. Users report that Fargate initialization times range from approximately 30 seconds to several minutes. In contrast, EC2 instances, when configured within a warm pool, can achieve a complete restart in an average of just 20 seconds.11

Fargate offers processor configuration options, such as the number of CPUs and the amount of RAM. However, it does not allow users to select specific CPU processors and may not always support the latest hardware, both of which are important for Harrier to provide a range of user options. In contrast, AWS EC2 instances provide access to the most current and powerful CPUs, allowing the user to specify the exact processor type required for their workloads.

Many developers also reported that Fargate can be more expensive for high compute usage compared to EC2.9 The cost difference largely depends on how each solution is implemented, but overall, Fargate tends to be pricier than EC2.10

#### **4.1.2.3 Efficient and Responsive EC2 Management**

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure and resizable compute capacity in the cloud.12 When an instance is launched on AWS, a root volume is created and contains the image used to boot the instance. Each instance has a single root volume, and AWS recommends using Elastic Block Storage (EBS) for fast launch and persistent storage. EBS is a scalable, high-performance block storage resource to store files or install applications.13

Initially, we noticed that the full startup time for an EC2 instance ranged from 2 to 5 minutes, which is too long to wait before starting a workflow. To address this cold startup issue, we created a "warm pool" of EC2 instances on AWS. According to AWS documentation, a warm pool consists of "a pool of pre-initialized EC2 instances that sit alongside an Auto Scaling group." However, Auto Scaling groups can respond slowly to incoming requests, sometimes taking over 60 seconds. To improve responsiveness for Harrier, we automatically manage the state of EC2 instances using AWS Lambda functions, which can react to requests in less than 1 second.

EC2 instances in the warm pool can be in one of three states: Running, Stopped, or Hibernated.

Maintaining instances in either a stopped or hibernated state is an effective way to minimize cloud costs for users since they only incur charges associated with the attached EBS volumes and IP addresses.14

We tested hibernating instances but encountered unreliable and unpredictable results. Sometimes, hibernating EC2 instances would not shut down properly and required a reboot, taking about 4 to 5 minutes. Additionally, hibernation is not supported on all instance types, which could diminish the level of configurability available to Harrier users.

In contrast, we did not experience issues with stopping and restarting _stopped_ instances. These instances can be quickly restarted to process a workflow, with our EC2 instances transitioning from stopped to running in approximately 15 seconds. In addition, when an EBS-backed instance is stopped, that instance retains any associated Elastic IP addresses and attached EBS volumes, including the data on those volumes.

#### **4.1.2.3 One or Multiple Available Runners**

By default, GitHub Actions maximizes the number of jobs that run in parallel based on the availability of runners. This feature allows individual users and multiple users or teams to execute multiple workflows or a single workflow with several jobs concurrently. Harrier achieved a similar effect by providing users with a fleet of additional runners.

Since stopped instances incur only minimal charges, the cost of adding more stopped instances is a reasonable trade-off for individuals or teams wanting to run workflows in parallel.

Harrier setup defaults to provisioning ten EC2 instances on the user's AWS account. However, users can easily adjust the number during setup.

### **4.1.3 Setting up the Environment for Deployment**

#### **4.1.3.1 VPC and Public Subnet**

AWS recommends using separate VPCs to isolate infrastructure by workload or organizational entity15. Harrier EC2 runners require direct internet access to download software, send API requests to GitHub, and process GitHub Actions workflows. Internet access was also needed for any delivery and deployment functionality in user workflows, like saving artifacts to Docker Hub.

Harrier sets up a VPC, which includes a public subnet and an internet gateway, within the user's AWS account. The internet gateway allows internet access for the EC2s. Traffic from the internet gateway is routed to the public subnet using the routes in the routing table.

#### **4.1.3.2 Operating System**

GitHub Actions-hosted runners use Ubuntu 22.04, which, at the time of Harrier implementation, is the version referenced by the "ubuntu-latest” value of the "runs-on” key of workflow YAML files.16

We considered Amazon Linux an operating system option because Amazon promotes it as having the latest AWS features and being optimized for Amazon EC2 instances. However, after testing it, we found that using Amazon Linux required significant modifications to user workflows. For example, many processes that work in Ubuntu, such as using \`apt-get,\` do not function in Amazon Linux, which relies on alternative package managers like \`yum/dnf.\` Although there are workarounds, we wanted to prioritize a low-friction user experience when migrating from a GitHub-hosted runner.

Harrier sets up each new EC2 instance with an image running the Ubuntu 22.04 operating system.

#### **4.1.3.3 Preparing the EC2 with Applications**

To prepare the runner to process workflows, the Harrier setup process automatically installs applications on the EC2 instance EBS volume, such as the GitHub self-hosted runner application itself, Docker Engine, and build-essential software tools.

The GHA self-hosted runner application is downloaded and installed once on each EC2 instance. For the runner to process any workflows, it needs to be registered and configured with GitHub, which requires a token from GitHub Actions.

### **4.1.4 Configuring a Self-Hosted GitHub Actions Runner**

#### **4.1.4.1 Self-hosted Runner at the Organization Level**

GitHub allows you to register self-hosted runners at the organization, repository, or enterprise levels. We decided to add the self-hosted runner at the organization level because it makes it accessible to multiple repositories and enables easier management of the runners in a single location17.

#### **4.1.4.2 Accessing the GitHub API for Runner Setup**

GitHub has a REST API to register, view, and delete self-hosted runners in GitHub Actions. A GitHub Personal Access Token is required to access the GitHub API programmatically. The user can create a Personal Access Token (PAT), scoped to allow requesting self-hosted runner tokens and also setting up webhooks.

#### **4.1.4.3 Automating Runner Registration with the GitHub API**

Harrier automatically downloads the GitHub self-hosted runner application, which has all the necessary files to set up and run the runner.18

Harrier setup also requests the GitHub API to create a registration token for the user's organization. The API responds with a token and an expiration date.

Once extracted, the token is passed to the GitHub self-hosted runner configuration script to register the runner with the user's GitHub organization. Once registered, the self-hosted runner is now authorized and ready to process workflow jobs originating from that organization.

\[\[ DIAGRAM \]\] Illustrating the back-and-forth communication: requesting a runner token and using that token to access the GitHub API or run the configuration script for runner setup.

### **4.1.5 Just-in-Time (JIT) Runners**

#### **4.1.5.1 What Are JIT Runners**

In mid-2023, GitHub introduced Just-In-Time (JIT) runners, a feature that allows users to create ephemeral self-hosted runners via the REST API. With JIT runners, each workflow run utilizes a newly instantiated runner, which enhances both security and availability.20

#### **4.1.5.2 Using JIT Runners in Harrier**

When a new JIT (Just-In-Time) runner is registered, it is added to the GitHub Actions list of runners for the user’s organization. Initially, the runner appears as "Offline" on GitHub until the self-hosted runner application on the EC2 instance is fully set up to handle incoming workflow runs. Once configured, the runner's status changes to "Idle," signaling GitHub to route queued workflow runs to it.

JIT runners are designed to execute a single job. After completing the workflow job, the runner shuts down and is automatically removed from the organization's list of self-hosted runners on GitHub.

Harrier users benefit from the enhanced security of JIT runners. By requiring a unique token for every workflow run, JIT runners minimize the risks associated with long-lived credentials or the exposure of sensitive data.

JIT runners also ensure high availability. Since a new runner is provisioned for each workflow, users are guaranteed a ready-to-use runner whenever a workflow is triggered. Unlike persistent runners, which GitHub may remove after 14 days of inactivity—potentially causing workflow failures—JIT runners eliminate the need to reconfigure expired runners. This simplifies operations and reduces the risk of downtime.

### **4.1.6 API Gateway for Receiving Webhooks**

A webhook is a lightweight, event-driven communication that automatically sends data between applications via HTTP21. When a workflow runs on GitHub Actions, a webhook event is triggered to send data to the Harrier app hosted on the user's AWS environment. This webhook transmits information about the workflow run as a JSON object, which includes an "action" property specifying the event type, such as "queued" or "completed."

We used AWS API Gateway to create and manage a simple REST API for receiving webhooks from GitHub Actions. REST APIs act as the "front door" for applications to access data, business logic, or functionality from backend services.22 ​​API Gateway handles all the tasks involved in accepting and processing API calls, including traffic management, authorization, and access control, monitoring, and API version management.

Together with AWS Lambda, API Gateway forms the app-facing part of the AWS serverless infrastructure. The AWS API Gateway receives the workflow data from the GitHub webhook and passes it to a Lambda setup by Harrier to manage EC2 instances.

One alternative to using AWS API Gateway would have been to run a JavaScript Express server continuously on an EC2 instance to implement a REST API. A long-running server or process is unnecessary since AWS provides a fully managed API service that requires minimal setup or maintenance on our part. API Gateway is highly cost-effective since charges are based solely on the number of requests and the amount of data transferred. In our case, minimal data passes through the API Gateway — just event notifications from GitHub and a 200 response in return. All significant data transfers occur directly between GitHub and the EC2 instance, bypassing the API Gateway. Each workflow involves only three events, with negligible data exchange.

#### **AWS S3**

Simple Storage Service (S3) is an object storage service for users to store, manage, analyze, and protect any amount of data for virtually any use case.23

Harrier provisions a single S3 that is shared across all users and workflows within the organization. The S3 is used to store the current status of EC2 instances as well as cache artifacts generated from workflow runs. Harrier uses Mountpoint, an open-source file client, to manage the S3 using standard Linux file system operations.

### **4.1.7 Lambdas**

\[\[ DIAGRAM: We have 3 Lambdas: the Workflow Lambda, the Timeout Lambda, and the Cache Eviction Lambda. 3 Lambdas and what they do \]\]

#### **4.1.7.1 The Workflow Lambda and Timeout Lambda**

GitHub sends a single HTTP POST request to the user's AWS each time a new workflow is run. The API Gateway receives this request and invokes the Harrier Workflow Lambda.

The Harrier Workflow Lambda code was designed to capture requests from GitHub via the API Gateway and parse the information based on the "action” property of the Request object, which can have a value of "completed," "queued," or "in-progress."

In addition, there is also a "ping” request, identified by its unique “zen" property, which is sent out by GitHub each time a new webhook is created. The Workflow Lambda sends a response to GitHub with a 200 status, indicating a request has been received successfully.

**EC2 Status**  
Harrier uses the AWS SDK to retrieve details about EC2 instances, including their state and ID, to efficiently manage resources for running workflows. EC2 instances are categorized into "Running" or "Stopped" states. Harrier further refines the "Running" state into "busy" for instances currently processing workflows and "idle" for those ready to accept new workflows.

The Workflow Lambda tracks and updates the status of EC2 instances by maintaining JSON objects in the user’s S3. When a workflow is initiated on GitHub, the Lambda evaluates available EC2s by looking for an “idle” instance. It attempts to restart an “offline” instance if none are available. If neither is possible, the workflow remains queued until an instance becomes available.

To prepare an instance for a new workflow, the Workflow Lambda sets up the runtime environment by mounting an S3 for caching, retrieving a JIT self-hosted runner token from the GitHub API, and executing the runner application.

Once a workflow is completed, GitHub sends a "completed" event to the API Gateway, which triggers the Timeout Lambda. This function enforces a user-defined delay to keep the instance running temporarily, allowing for efficient handling of potential quick reruns. If the instance remains idle at the end of the timeout period, it is stopped and returned to the warm pool. This approach allows users to balance cost and responsiveness, adapting the timeout period based on the likelihood of reruns and their operational priorities.

#### **4.1.7.2 The Cache Eviction Lambda**

The Cache Eviction Lambda is triggered by an EventBridge Scheduler. By default, the scheduler triggers the Lambda every night at 3:00 AM, a time chosen to minimize interference with workflow activity. The Lambda scans the user’s S3 and deletes cache files that have not been accessed in the past 72 hours.

## 4.2 Caching

GitHub Actions allows users to use pre-written building blocks, which GitHub documentation somewhat confusingly refers to as " actions" in workflows. An action in this context is a pre-defined, reusable set of jobs or code that perform specific tasks within a workflow.24 Harrier uses three public actions published on the GitHub Marketplace, a central location, for availability and transparency.

- harrier-cache-load
- harrier-cache-store
- harrier-runner-setup

### **4.2.1 Dependency Cache Loading and Storing**

Harrier caching functionality is implemented through two public actions: cache-load and cache-store. These actions can be used as steps in any GitHub Actions workflow with access to the Marketplace.25

Together, harrier-cache-load and harrier-cache-store form a caching mechanism that minimizes redundant dependency installations and optimizes workflows. By supporting both branch-specific and repository-wide caches, the actions reduce build times while ensuring compatibility with changes to package.json.

The harrier-cache-load action restores a cached node_modules directory. It checks for a tarball—a compressed archive file (e.g., .tar.gz)—in the user’s S3, using the current repository and branch in the filename. If a branch-specific tarball is found, it is copied and extracted into the workflow directory. If none exists, the action will fall back to a repository-wide tarball to reuse dependencies across branches. If no cache is available, the workflow proceeds with installing dependencies from scratch.

The harrier-cache-store action updates the cache after dependencies are installed. It first checks for a cache key in a metadata storage location for the current branch, then falls back to checking for a repository-wide key. No action is taken if a matching key exists and its hash matches the current package.json. Otherwise, the action creates a new tarball of the node_modules directory, stores it in the user's S3 and generates a new cache key. This ensures caches are updated for both branch-specific and repository-wide use.

\[\[ DIAGRAMs , more detailed, for Harrier-cache-load and harrier-cache-store \]\]

### **4.2.2 Performance Gains with Harrier Cache**

\[\[ DIAGRAM / GRAPH here showing workflows run on self-hosted with Harrier cache vs GHA \-hosted runner with GH cache action \]\]

### **4.2.3 Harrier Cache Eviction Policy**

To prevent the accumulation of unnecessary or stale data, Harrier includes an automated cache eviction mechanism. An EventBridge Scheduler and Lambda work together to manage the S3 cache items. The scheduler is a cron job that triggers the Lambda once every day and can be configured by the user. The Lambda scans the S3 and deletes cache files not accessed in the past 72 hours. Each cached file's "last modified" timestamp is updated whenever the file is reused, ensuring only stale data is targeted for removal.

### **4.2.4 Optional \- Docker Image Layer Caching**

Many GitHub Actions workflows use Docker, a platform for packaging applications and their dependencies into containers.26 Containers are created from images built in layers representing incremental changes. Caching these layers speeds up builds by reusing unchanged layers, so only modified ones are rebuilt, significantly improving efficiency.27

While Harrier's primary function is dependency caching, it also provides the secondary benefit of enabling Docker layer caching \- a capability not available with GitHub-hosted runners. By setting up an S3 in the user’s AWS infrastructure and mounting it as a directory on the self-hosted runner, Harrier allows BuildKit to pull and store Docker layers directly from the S3. This seamless integration, configured through cache-from and cache-to in the docker/build-push-action, speeds up Docker builds as a valuable additional feature of the Harrier setup.

## 4.3 Deploying Harrier

To begin, the user must follow the steps in the Harrier Installation Guide to configure the required settings in AWS and GitHub. This includes creating IAM roles, setting up secrets, establishing identity providers in AWS, and generating a personal access token in GitHub.

Once these configurations are complete, the user can interact with the Harrier frontend to specify their preferences, such as the AWS region and EC2 instance types. They will then receive a setup.yml file, which can be executed as a workflow action in any repository within their GitHub organization to deploy Harrier.

The setup.yml file initializes the Harrier system on AWS. It automates preparatory tasks, such as setting up Node.js and configuring AWS credentials with the user's designated IAM role. Once the groundwork is complete, the workflow invokes a custom action called Harrier Setup, which handles the deployment of the required infrastructure using code from the action repository.

# 5\. Future Work

# 6\. Citations

1. 2024 Developer Survey: [https://survey.stackoverflow.co/2024/technology](https://survey.stackoverflow.co/2024/technology)
2. Security Hardening for GitHub Actions: [https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
3. SDK vs CDK: [https://www.pluralsight.com/resources/blog/tech-operations/what-is-aws-cdk-cloud-development](https://www.pluralsight.com/resources/blog/tech-operations/what-is-aws-cdk-cloud-development)
4. AWS Lambda Features: [https://aws.amazon.com/lambda/features/](https://aws.amazon.com/lambda/features/)
5. AWS Lambda FAQ [https://docs.aws.amazon.com/lambda/latest/dg/event-driven-faq.html](https://docs.aws.amazon.com/lambda/latest/dg/event-driven-faq.html)
6. Lambda Timeout: [https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html](https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html)
7. GitHub Actions Limits: [https://docs.github.com/en/actions/administering-github-actions/usage-limits-billing-and-administration](https://docs.github.com/en/actions/administering-github-actions/usage-limits-billing-and-administration)
8. AWS Fargate: [https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
9. Reddit EC2 vs Fargate: [https://www.reddit.com/r/aws/comments/165wkns/ecs_fargate_vs_ec2/](https://www.reddit.com/r/aws/comments/165wkns/ecs_fargate_vs_ec2/)
10. Deploying self-hosted runners on AWS: [https://www.warpbuild.com/blog/self-hosting-github-actions\#self-hosting-github-actions-runners-on-aws-a-comprehensive-guide](https://www.warpbuild.com/blog/self-hosting-github-actions#self-hosting-github-actions-runners-on-aws-a-comprehensive-guide)
11. EC2 Warm Pools: [https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html)
12. What is EC2: [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
13. What is EBS: [https://aws.amazon.com/ebs/](https://aws.amazon.com/ebs/)
14. EC2 Warm Pools: [https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html)
15. VPC Isolation: [https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html](https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html)
16. Ubuntu Latest to 24.04 in 2024: [https://github.blog/changelog/2024-09-25-actions-new-images-and-ubuntu-latest-changes/](https://github.blog/changelog/2024-09-25-actions-new-images-and-ubuntu-latest-changes/)
17. About GHA self-hosted runners: [https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners)
18. GitHub Self-hosted runner REST docs: [https://docs.github.com/en/rest/actions/self-hosted-runners](https://docs.github.com/en/rest/actions/self-hosted-runners)
19. GitHub Blog Intro for JIT Runners: [https://github.blog/changelog/2023-06-02-github-actions-just-in-time-self-hosted-runners/](https://github.blog/changelog/2023-06-02-github-actions-just-in-time-self-hosted-runners/)
20. Removing Self-hosted Runners:  
    [https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/removing-self-hosted-runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/removing-self-hosted-runners)
21. What is a Webhook: [https://www.redhat.com/en/topics/automation/what-is-a-webhook](https://www.redhat.com/en/topics/automation/what-is-a-webhook)
22. AWS API Gateway: [https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
23. AWS S3: [https://aws.amazon.com/s3](https://aws.amazon.com/s3)
24. Pre-written Actions in Workflows: [https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-pre-written-building-blocks-in-your-workflow](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-pre-written-building-blocks-in-your-workflow)
25. Publishing in Actions Marketplace: [https://docs.github.com/en/actions/sharing-automations/creating-actions/publishing-actions-in-github-marketplace](https://docs.github.com/en/actions/sharing-automations/creating-actions/publishing-actions-in-github-marketplace)
26. Docker container: [https://www.docker.com/resources/what-container/](https://www.docker.com/resources/what-container/)
27. Docker Layer Caching: [https://depot.dev/blog/faster-builds-with-docker-caching](https://depot.dev/blog/faster-builds-with-docker-caching)

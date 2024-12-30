# Problem Domain

## GitHub Actions: A Powerful CI/CD Tool {#github-actions-a-powerful-cicd-tool}

> **GitHub Actions** (GHA) has emerged as a cornerstone in modern software development, empowering developers and teams to streamline their CI/CD workflows.

With its widesprePad adoption, GHA is now a vital tool in the toolkit of over 57.8% of GitHub repositories, solidifying its position as the leading CI/CD technology. In comparison, other tools like Travis CI, while significant, serve a smaller share of 38.8% of repositories.
Given its prevalence, addressing points of friction in GHA workflows can have a meaningful impact on the day-to-day experience of developers. Improving usability or streamlining processes within GHA can help teams work more efficiently and with fewer obstacles. This makes it a particularly compelling area of focus for projects aimed at improving software development tools.

### CI/CD and DevOps: The Backbone of Modern Software Development

![ci-ci-simple-circles](src/assets/2-problem-domain/2.1.1.ci-cd-simple-circles.png)
Modern software development is a complex endeavor performed by large teams of experts, which require a great deal of communication and integration to ensure high-quality products. To deliver software successfully, it is important to have as much alignment between teams throughout the entire development process. DevOps is a philosophy and culture that enables agile development while supporting collaboration, automation, and continuous improvement. One of the key components of DevOps is Continuous Integration and Continuous Delivery/Deployment (CI/CD).

Continuous Integration (CI) centers around integrating code changes from multiple developers into a shared repository, as frequently as possible (source: codefresh). The desired impact of this practice is to stabilize the code base by discovering and resolving issues as early as possible in the development lifecycle. The output of CI is tested high-quality code that can be deployed to a staging or production environment.

Continuous Delivery (CD) utilizes the artifacts created by the CI process and ensures that the software is always in a releasable state by subjecting the code to rigorous tests and checks in a staging environment so that it is production ready (source: codefresh). Continuous Deployment is an advancement from CD that removes human intervention from the deployment process with the addition of automated acceptance testing as the final step of the release cycle (source: geeksforgeeks).

By automating the software development and release processes, CI/CD enables teams to streamline their workflows and enjoy the following benefits (source: codefresh):

- Early detection of issues X^2^
- Improved team collaboration
- Faster release cycles and rapid releases
- Reduced risk of failed deployments
- Improved and faster user feedback

> hi there

CI/CD practices will remain central to software development for the foreseeable future. As software development grows increasingly complex, the automation and reliability CI/CD provides will continue to be indispensable for maintaining efficiency, minimizing errors, and enabling rapid iteration. These practices are not just trends; they are enduring pillars of the DevOps philosophy, ensuring developers can focus more on innovation and less on repetitive tasks.

### GHA Workflow Automation

Automation is the implementation of tasks or processes without human intervention, enabling increased efficiency and productivity. It involves streamlining repetitive, time-consuming, and error-prone tasks, freeing up developers to focus on higher-value activities and ultimately leading to higher-quality outcomes.

Within software development, a workflow is a defined sequence of automated steps or jobs that coordinate tasks, tools, and resources. GitHub Actions (GHA) lets developers automate workflows directly from their code repositories. Within GHA, workflows are YAML-based configuration files that define automated processes triggered by events like code commits, pull requests, or other user-triggered events.

As of 2023, over 100 million users are leveraging GitHub globally to manage over 400 million code base repositories and coordinate their software development activities. With over 200 million repositories with actively deployed workflow automations, GHA has established itself in just over five years since launch as an indispensable tool for software development. (source: github pr post)

### GHA and CI/CD automation

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

### With GHA Marketplace being a welcoming environment/community for innovation, it provides a space where teams like us can explore various ways to make a contribution.

---

## Slow CI Build Speeds {#slow-ci-build-speeds}

The speed of automation is a critical factor in unlocking the full benefits of CI/CD (outlined above), as faster automation equates to rapid feedback loops, and faster the feedback, the more agile and efficient the development workflow. Both CI and CD processes can be optimized to enhance automation speed, but the impact of CI speed is greater than CD speed as the frequency of code integration is far greater than the frequency of software deployment.

Faster CI builds dramatically reduce developer context switching and idle time, transforming waiting periods into productive coding opportunities. By minimizing build friction, engineering teams can iterate more rapidly, accelerate feature delivery, and maintain a state of continuous flow that directly translates to increased shipping of software. Therefore, identifying performance bottlenecks in the CI build step—compiling code, resolving dependencies, performing necessary tests, and creating artifacts is crucial for improving the overall software development lifecycle.

Despite the numerous benefits of utilizing GHA as a CI/CD tool, GHA is often cited as the cause of slower than desirable CI builds, as evident by the numerous GitHub Issues and GitHub feature requests (source: GitHub’s own Issues page) related to slow CI builds submitted by GHA users, as well as the significant investment made within the tech sector on products that can accelerate GHA workflows.

### Unpacking GHA’s original design

GitHub Action’s automated workflows are executed on servers that are called runners. GitHub provides default runners as a service in order to abstract away the process of provisioning and setting up a server, thus freeing up the user to focus on the details of the workflow.

Given the need to provide the 100+ million GitHub users with a clean runtime environment with minimal risk of data leakage between jobs or users, GitHub leverages the Microsoft Azure cloud platform (GitHub being a Microsoft company) to provision brand new virtual machines (VMs) for each job specified in workflow files to address the isolation and security concerns, which are promptly destroyed after job completion.

One of the most significant impacts of GitHub’s runner infrastructure on CI build speed is that it severely limits the use of caching throughout the workflow execution. Caching is a data-management method that reuses previously created information (i.e. cache) rather than creating it again (source: bitrise). For a highly iterative and repetitive process such as code integration where each integration may represent only a small change in the code base, computations run quicker when the need to create the same thing over and over is eliminated. Caching is made possible by storing the cache in a temporary storage so that it can be accessed in the future, and this is where GitHub’s design of its runner infrastructure creates limitations – the destruction of the VM immediately after job completion necessitates the cache to be placed in a persistent storage outside of the VM but GitHub did not provide such a storage option at the outset, making it extremely difficult for users to take advantage of caching in their CI builds.

In addition to the limitation presented by the runner infrastructure design, GitHub only provides limited runner infrastructure hardware options that prevent users from forcing through faster builds by means of vertical scaling.

### Limitations of GHA Cache Action

The limitations around CI build speed within GHA was significant enough to warrant GitHub itself taking action. Within a couple years after launch, GitHub Actions introduced a paid-tier offering of more powerful machines to help address CI build speed concerns. In addition, they also released and incrementally improved a much-demanded native cache solution on the GHA Marketplace, actions/cache.

GHA’ cache feature seeks to enhance overall workflow efficiency by storing and reusing dependencies and files produced from workflow run operations. Key features of GHA’ Cache include:

- Seamless integration with existing workflow files.
- Preset cache eviction strategy with no option for further customization and 7 day automatic deletion.
- 10 GB cache data storage per repository.
- GitHub REST API (offering limited cache management) \[Necessary??\]

This native cache solution satisfied some users, but for others, the solution proved woefully inadequate. To better understand this second category, let’s use an example.

Developers working on complex mono-repo codebases quickly encounter significant challenges with GitHub Actions' caching limitations. As node_modules directories frequently balloon beyond 10 GB—driven by an ecosystem of libraries, testing tools, linters, and build dependencies—the limited repository cache becomes critically constraining. This storage pressure creates an immediate performance bottleneck, forcing teams to constantly juggle and optimize their dependency management strategies.

The introduction of multiple branches further complicates cache resource utilization and limits the efficacy of cache generally. Each branch, with potentially unique dependencies and workflow configurations, competes for limited cache space—creating an environment where a single feature branch's large dependency update could unexpectedly evict critical cached artifacts that builds on the main branch rely upon. This volatility renders cache utilization unpredictable, turning what was originally intended as a performance enhancement into a fragile and at times unreliable build speed optimization strategy. What emerges is a complex challenge where intelligent cache management becomes as crucial as the software development cycle it seeks to streamline.

### Considering the limitations of actions/cache and the healthy demand for faster CI builds, cache within GHA is a great area for exploring alternative solutions.

---

## Cache that Matches Workflow Demands {#cache-that-matches-workflow-demands}

For those exploring innovative solutions to get around the caching challenge posed by GHA’s infrastructure limitations, the first priority becomes provisioning an alternative runner infrastructure that allows users to reimagine the GHA CI build environment with persistent cache storage.

GitHub recognized the user demand for exploring higher degrees of runner customization than what can be provided by the out-of-the-box configurations and released a Self-Hosted Runner feature soon after launching GHA. The self-hosted runner solution was meant to provide users with greater control and customizability that they wanted while allowing GitHub to offload the responsibility for maintaining these one-off infrastructures to the users themselves. For those users who really want to remain on the GHA ecosystem to experience the benefits of a CI/CD tool that is tightly coupled with their code base, self-hosted runners can be utilized as a key component to their CI build performance optimization strategies.

GitHub’s Self-Hosted Runner feature allows users to configure their own infrastructure by downloading and installing GH’s runner application, which installs the necessary software to connect and execute GHA workflows. Through this application, the user can optimize their hardware, operating system, and software environment to meet specific CI build requirements. For example, it is now possible to utilize machines with higher CPU or memory specifications, install proprietary software, or access resources within a private network.

The Self-Hosted Runner feature can be deployed on a local machine, on-premises server, or even on a cloud infrastructure. For organizations who already have their own on-premises servers with both server resources to spare and dedicated operations teams to manage the infrastructure overhead, perhaps using their hardware as dedicated GHA runners may be a great option. However, for many, the desire for resource optimization and minimal administrative overhead leads to the conclusion that on-demand runners on a managed cloud infrastructure would best serve the needs of a GHA runner.
![Diagram](src/assets/workflow-runner-new-infra.png)

### Existing solutions for faster CI Builds

There are many benefits to provisioning an alternative runner infrastructure for GHA workflows on a managed cloud platform:

- Pay only for what you use (what are the implications of on demand?)
- Infrastructure management is handled by said cloud platform
- Access to industry best-practice security measures
- Access to various network services and resources
- Reliable up time
- (Reaping all the cascading benefits of massive platform scale)
- ![Diagram](src/assets/ci-cd-repeat-steps.png)
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

### **Underserved Niche**

- Give me a summary of the user profile / use case scenario that fell through each option \=\> what’s left over after all the above solutions?
- For that use case, here are the details of the 3rd-party supported DIY option.

**The Need for a Middle Ground: A DIY Option with Help**

There’s a gap between DIY solutions that require technical expertise and third-party solutions that come with a price tag and potential security concerns. The ideal solution would empower developers who:

- Don’t have the time or expertise to manage their own infrastructure,
- Want to avoid the costs of fully managed third-party services,
- Need to ensure their code and secrets remain private and secure.

![Diagram](src/assets/ci-cd-github-hosted.png)

**Proposed Solution:** Imagine a service that bridges this gap by offering:

- **DIY Setup Assistance:** A volunteer-based service that helps developers set up and configure self-hosted runners on their own cloud infrastructure. This would provide the benefits of the DIY method without the need for deep technical knowledge.
- **No Ongoing Costs:** This solution would be free of charge, allowing users to avoid monthly fees associated with third-party providers.
- **Privacy and Security:** Since the infrastructure would be hosted by the user, the service could ensure that their code and data remain private and secure, without the need to expose it to a third party.

![Diagram](src/assets/dependency-cache-load-cache-store.png)
This service would offer a simple, secure, and cost-effective alternative for developers who want to leverage the power of self-hosted runners but don’t have the time, knowledge, or desire to manage the setup themselves.

[^2](https://www.markdownguide.org/cheat-sheet/)

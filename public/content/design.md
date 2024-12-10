# 3.1 Achieving accelerated GHA Workflows

Harrier’s overall design approach tackled three main challenges:

- Overcome the limitations around workflow improvements due to GitHub Action’s default runner infrastructure

- Explore one or more of the four factors influencing workflow speeds

- Server hardware
- Cache capabilities
- Network bandwidth
- Workflow structure

Deliver a robust solution with a low barrier to implementation

# 3.2 Decision-Making Criteria (Considerations)

The Harrier team recognizes how leveraging a decision-making framework can help to:

- maintain clear objectives and optimize team efficiency.

- evaluate alternatives and assess tradeoffs.

- provide a structured approach to decision making as a team.

Therefore, the following criteria were critical in guiding the team throughout the design and implementation phases:

|                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------- |
| Design Criteria                                                                                                      |
| Minimal disruption to current practices / processes                                                                  |
| Security / Privacy                                                                                                   |
| Transparency                                                                                                         |
| Control / Customization                                                                                              |
| Ease of implementation                                                                                               |
| Resource optimization (or resource utilization?)                                                                     |
| Return on Investment (catches vert scaling, boot times, type of resources we are provisioning, instance types, etc.) |

# 3.3 Primary Design Decisions

The above criteria motivated the following design decisions to:

- Leave Github’s default runner infrastructure

- Prioritize cache as the preferred workflow acceleration strategy

- Deliver the harrier solution as a public action and automate the provisioning and platform integration processes

## 3.3.1 Alternative Runner Infrastructure

Harrier’s self-hosted runners operate exclusively within a user’s private cloud, eliminating the need to follow GHA’s design criteria of a stateless VM architecture. The main advantage of fully ephemeral runners—providing isolated runtime environments to enhance data security—is less critical here, as the infrastructure is inherently isolated within the user’s private cloud.

[the usefulness of ephemeral runners in the harrier use case]

Deletion of the working directory to preserve some of the ephemerality benefits

We made an attempt to decrease the possibility of workflow cross-contamination (and in doing so, attempt to deliver on the core of “the point” of stateless VMs)

[lack of user control/ability to make design decisions & sensible optimizations]

Despite the benefit of having isolated runtime environments through just-in-time GHA runners, the design of the GHA runner infrastructure limits a user’s ability to exert control over their workflow runner environment; they are bound by the design decisions made by GHA. Therefore, a user’s ability to apply sensible optimization strategies such as caching, are limited.  Therefore, in order to explore any strategies for accelerating workflow runs necessitates an alternative design to the default GHA runner infrastructure.

The first key decision / GOAL in optimizing workflow performance was to move off GitHub’s default runner infrastructure. GitHub Actions' VM environment, while secure and scalable, imposes inherent limitations due to its ephemeral runners and stateless design.

Leveraging GitHub’s own self-hosted runner feature and transitioning to an alternative cloud-based, on-demand runner architecture, grants the user full control over the underlying workflow runner infrastructure. This shift unlocks the ability to explore alternative optimization strategies, such as implementing a dedicated, persistent cache solution—something not possible within GitHub’s default setup.

|                                                     |                            |
| --------------------------------------------------- | -------------------------- |
| Security / Privacy                                  | - Ephemeral runners        |
| Cost efficiency                                     | - On-demand usage          |
| Minimal disruption to current practices / processes | - Remain in GHA ecosystem  |
| Control / Customization                             | - User’s own private cloud |
| Design Criteria                                     | Implementation highlights  |
| Transparency                                        |                            |
| Ease of implementation                              |                            |

[[DIAGRAM] switch to alternative VM architecture]

### 3.3.1.1 GHA’s Self-hosted runner feature

GitHub offers self-hosted runners which provide for more control of hardware, operating system, and software tools than GitHub-hosted runners. With self-hosted runners, you can create custom hardware configurations that meet your needs with processing power or memory to run larger jobs, install software available on your local network, and choose an operating system not offered by GitHub-hosted runners.5

To adhere to the user’s need for staying on GHA, we opted to use the official GitHub Actions runner app to maintain maximum compatibility with GitHub Actions workflows, as well as any actions on GitHub Marketplace.

In doing so, the user is granted full control over the underlying workflow runner infrastructure with minimal to no disruption in current workflow activities.  This shift unlocks the ability to customize workflow processes and explore sensible strategies that facilitate workflow acceleration- something not possible within GitHub’s default setup.

### 3.3.1.2 User’s own cloud infrastructure

GitHub Actions runner app can transform any server (user’s local machine, on-prem bare-metal server, or even a cloud VM) into a GHA runner.  For an organization where multiple developers are working on a project, transforming each and every local machine into a runner makes it difficult for implementing workflow acceleration solutions that can be shared across the team.  An organization’s own data center or on-prem server may provide a better collaboration platform, but it comes at either a high start-up cost or a hefty resource allocation cost as the runner infringes on existing server tasks.  In addition, the burden of managing the administrative tasks for overseeing not just the Ops of the server, but dealing with your own security risks falls onto the user.

Therefore, it became evident that setting up a server infrastructure on a cloud provider was the best place to provision a GHA self-hosted runner in order to provide the user with the benefits around ease of implementation and trustworthy managed security while being mindful of resource costs.  To ensure that the user maintains as much control over their own data, it makes sense that the runner is provisioned on the user’s own private cloud account instead of setting up Harrier as a 3rd-party managed service, leading to the decision of designing Harrier as an Infrastructure-as-Code (IAC) setup tool rather than a product/service offering.

In doing so, the user can enjoy a high degree of security and control over the data being passed in and out of the workflow runner infrastructure.

### 3.3.1.3 On-demand runners

Since Harrier leverages the user’s own private cloud to implement the necessary alternative runner infrastructure, the design criteria of resource utilization became a critical consideration as it would be irresponsible to burden the user with costs for unused resources.  This meant that we needed to veer away from a simplistic design of provisioning an always-on runner and instead find a solution where the cost of implementing the solution can be rationalized to the user.

Therefore, the decision was made to explore implementing on-demand runners to help ensure efficient resource utilization by only starting VMs on an as-needed basis following workflow triggers.

A side effect of having on-demand runners is that it becomes possible to retain one of the key benefits of GitHub’s fully ephemeral runner design–provide users with a clean runtime environment for each individual workflow job.  While the Harrier use case doesn’t demand a strict requirement for isolated runtime environments to protect data from unknown users and malicious actors, as Harrier deploys the solution into the user’s own cloud infrastructure, there may still be instances where a team may want some isolation between the team members or even between the various projects they are juggling.  As such, on-demand runners that are wiped clean after each and every workflow run will provide users with a high degree of control and trust over the data flow between workflows.

## 3.3.2 Persistent Cache Store

Once freed from GitHub’s inherent infrastructure constraints, cache utilization emerged as the most effective approach to achieving faster workflow runs. Among the primary factors influencing workflow performance—runner hardware, network transfer speeds, caching, and workflow optimizations—caching provides the highest cost-to-performance value. Vertical scaling of hardware often plateaus in performance gains and can quickly become cost-prohibitive. Similarly, network speed is inherently unreliable, difficult to optimize, and heavily dependent on the cloud provider. In contrast to these approaches, caching offers a scalable, programmatic solution which helps to eliminate redundant work and improves workflow efficiency.

|                                                     |                                                                                    |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Design Criteria                                     | Implementation highlights                                                          |
| Minimal disruption to current practices / processes |                                                                                    |
| Security / Privacy                                  |                                                                                    |
| Transparency                                        |                                                                                    |
| Control / Customization                             | - Dedicated cache store on user’s infrastructure<br> <br>- Custom cache management |
| Ease of implementation                              |                                                                                    |
| Cost efficiency                                     |                                                                                    |

### 3.3.2.1 Dedicated Persistent Cache Store

To maximize the benefits of caching, we introduced a dedicated, persistent co-located cache store within the cloud runner infrastructure. This cache store allows workflows to save and reuse dependencies, build artifacts, and other frequently accessed data across repositories and workflows. By co-locating cache with runner infrastructure, we minimized latency and ensured that workflows could access cached data as quickly as possible.

### 3.3.2.2 Custom Cache Management of Dependencies

In addition to a dedicated cache store, we implemented custom cache management strategies tailored to specific dependencies and use cases. While our initial focus was on dependency caching, we explored other potential areas for caching, such as intermediate build outputs. This flexibility in cache management empowers users to further optimize their workflows based on their unique requirements.

By adopting this caching-first strategy, we significantly reduced redundant work and decreased workflow durations, all without requiring expensive hardware upgrades or relying on unreliable network optimizations.

## 3.3.3  Deploying as a GitHub Action

Emphasizing ease of use, transparency, and security, Harrier is a pair of public actions on the GHA Marketplace.  Given the user’s existing familiarity with GHA workflows, this approach will provide faster time to experience accelerated workflows.  Adhering to the design criteria of minimizing resource investment by the user, the solution package abstracts away the complex work of provisioning the new cloud infrastructure on the user’s private cloud.  This new infrastructure however, introduces a layer of complexity that did not exist for the user, which is the need for integrating a cloud platform into existing engineering processes that was previously handled by GitHub on its backend.  Prioritizing the seamless integration with existing workflows, it was important that the solution also abstracted away the critical work of integrating the alternative cloud infrastructure with the GitHub ecosystem.

User Outcomes: criteria -> design -> implementation preview link

- Rapid, low-friction adoption.

- Minimal disruption to existing workflow file. (stay within GHA ecosystem and existing workflow files stay basically the same)

- Leverage existing workflow familiarity for ease of use.

- User trust since the action’s code is open-source.

- Secure workflow runs since it’s on their own cloud.

|                                                     |                                                                                                          |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Design Criteria                                     | Implementation highlights                                                                                |
| Minimal disruption to current practices / processes | - Setup as a GHA action<br> <br>- Cache as a GHA action                                                  |
| Security / Privacy                                  | - Leverage user’s private cloud                                                                          |
| Transparency                                        | - Open-source nature of GHA                                                                              |
| Control / Customization                             |                                                                                                          |
| Ease of implementation                              | - Leverage existing workflow familiarity<br> <br>- Automated provisioning<br> <br>- Seamless integration |
| Cost efficiency                                     |                                                                                                          |
|                                                     |                                                                                                          |

### 3.3.3.1 Public Actions on GHA Marketplace

To maximize accessibility and ease of adoption, we delivered our IP infrastructure provisioning and caching solutions as public GitHub Actions. These actions allow users to:

- Replace the default runner by switching to runs-on: self-hosted for accessing newly provisioned cloud infrastructure.

- Opt-in to caching capabilities using actions like harrier/cache-load and harrier/cache-store.

By packaging these solutions in a way that integrates directly into YAML workflow files, we ensured that implementation requires minimal modifications to existing workflows. This approach allows users to retain the familiarity of their existing process with the added benefits of faster and more efficient workflows.

### 3.3.3.2 Automated Cloud Infrastructure Provisioning

To streamline the necessary infrastructure setup, we automated the cloud resource provisioning process. Leveraging Infrastructure as Code (IaC) practices through cloud SDKs, the Harrier setup action seamlessly and securely deploys the necessary cloud resources along with the necessary resource management algorithms within the user’s own private cloud.

### 3.3.3.3 Effortless Platform Integration

Platform integration complexities were abstracted to reduce friction for the user. Introducing an alternative cloud platform necessitates robust management of request/response communication between the cloud platform and GitHub.  In order to facilitate cross-platform integration, two primary communication needs had to be addressed: a) setting up a webhook endpoint on the cloud platform so that the event-based workflow triggers can be communicated to the new infrastructure, and b) utilizing GHA’s just-in-time (JIT) registration to connect the runner VMs to the specific workflow being run.

We automated API setup for both webhook and a just-in-time (JIT) registration token service, ensuring a smooth and reliable integration experience. This approach eliminates the need for users to perform their own platform configurations.

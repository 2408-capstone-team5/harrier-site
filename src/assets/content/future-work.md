# Future Work

## Workflow and EC2 Instance Management {#workflow-and-ec2-instance-management}

![Dark](src/assets/dark-api-integration-trsprt.png)
![Light](src/assets/light-api-integration-trsprt.png)
Dynamic EC2 Timeout: Line 470 of the Workflow Lambda invokes TimeoutLambda with a hardcoded 1-minute delay for stopping EC2 instances. Consider making this delay dynamic or user-configurable, ranging from 0 to 5 minutes.
Workflow Drop Issue: The Workflow Lambda currently drops incoming workflows if no EC2 instance is idle or offline. Consider implementing an Event Bus (or SQS) to queue incoming workflows and prevent them from being dropped.

## Cleanup and Cache Management {#cleanup-and-cache-management}

![diagramB](src/assets/api-integration-trsprt (1).png)
EventBridge Schedule Cleanup: There are 68 EventBridge Schedules (cron jobs) piling up. Cleanup logic is not properly deleting them. Consider improving the cleanup of these schedules.
Cache Eviction Time: Cache eviction currently runs at 3 AM UTC, but it should run at 3 AM local time in the user’s region to be more relevant.
\_work Directory Cleanup: Ensure the \_work directory on the EC2 instance is fully deleted after each workflow run to prevent exposing any environment data to future runs.

## GitHub Repository Improvements {#github-repository-improvements}

Branch Protection: The main branch of the GitHub repository is not protected. Consider adding basic protections to improve security and prevent accidental changes.

## Runner and Job Management {#runner-and-job-management}

Keep Runners Up for X Minutes: Keep self-hosted runners available for a few minutes after a job is finished to allow faster job pickup for quick re-runs.
Combine Cache Load and Store: Combine the cache-load and cache-store operations, including the npm install step for more efficient dependency management.
Autoscaling Runners: Implement autoscaling of self-hosted runners based on the webhook event action property.

## Support for Non-Node Projects {#support-for-non-node-projects}

Non-Node Caching Support: Extend the caching orchestration to support non-Node.js projects.
Additional Machine Images: Support more machine images beyond AWS Linux, such as Ubuntu 24 (and other OS types).
Matrix Strategy: Implement support for matrix strategies in workflows to test code in multiple language versions or operating systems.

## Runner and Lambda Pooling {#runner-and-lambda-pooling}

Warmed Pool of Runners: Maintain a pool of warmed-up runners for faster job pickup.
Truly Ephemeral Runners: Ensure that self-hosted runners are truly ephemeral, without leaving behind residual data.
Support Other OSes: Implement changes to support additional operating systems, such as macOS or Windows, in workflows.

## User Customization and Setup {#user-customization-and-setup}

User Setup Interface: Create a React-based webpage or CLI tool for users to pick setup options and generate a YAML file.
Dashboard for Monitoring: Implement a dashboard for tracking the status of runners, Lambda functions, caches, and setup status.

## Cache and Spot Instances {#cache-and-spot-instances}

Seed Cache with Popular Dependencies: Pre-load the cache with popular dependencies to improve workflow speed.
Spot Instances Option: Provide the option to use AWS spot instances for cost efficiency.

## Permissions and Role Management {#permissions-and-role-management}

Custom Permission Policy: Create a custom permission policy for the setup-harrier role with minimum necessary privileges, instead of using the current setup-harrier role with full access privileges.

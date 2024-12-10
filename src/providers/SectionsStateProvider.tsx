import React, { createContext, useState, ReactNode } from "react";

export interface Section {
  name: string;
  sectionId?: string;
  subSections: Section[];
}

interface SectionsState {
  sections: Section[];
  setSections?: React.Dispatch<React.SetStateAction<Section[]>>;
}

const SectionsStateContext = createContext<SectionsState>({ sections: [] });

const SectionsStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sections] = useState<Section[]>([
    {
      name: "Introduction",
      sectionId: "introduction",
      subSections: [
        { name: "1", sectionId: "1", subSections: [] },
        { name: "2", sectionId: "2", subSections: [] },
        { name: "3", sectionId: "3", subSections: [] },
        { name: "4", sectionId: "4", subSections: [] },
        { name: "5", sectionId: "5", subSections: [] },
      ],
    },
    {
      name: "Problem Domain",
      sectionId: "problem-domain",
      subSections: [
        {
          name: "GitHub Actions as a major CI/CD tool",
          sectionId: "github-actions-ci-cd-tool",
          subSections: [
            {
              name: "CI/CD - a critical component to DevOps",
              sectionId: "ci-cd-critical-component-devops",
              subSections: [],
            },
            {
              name: "Automated development activities through GHA",
              sectionId: "automated-development-activities-gha",
              subSections: [],
            },
            {
              name: "Benefits of GHA on CI/CD automation",
              sectionId: "benefits-gha-ci-cd-automation",
              subSections: [],
            },
          ],
        },
        {
          name: "Slower than desirable GHA Workflows",
          sectionId: "slower-than-desirable-gha-workflows",
          subSections: [
            {
              name: "Unpacking GHA’s design",
              sectionId: "unpacking-gha-design",
              subSections: [],
            },
            {
              name: "Factors Influencing Workflow Run Speeds",
              sectionId: "factors-influencing-workflow-run-speeds",
              subSections: [],
            },
            {
              name: "GHA’s impact on workflow run speeds",
              sectionId: "gha-impact-workflow-run-speeds",
              subSections: [],
            },
            {
              name: "Benefits of Workflow Speed Improvements",
              sectionId: "benefits-workflow-speed-improvements",
              subSections: [],
            },
          ],
        },
        {
          name: "Underserved Use Case",
          sectionId: "underserved-use-case",
          subSections: [
            {
              name: "GitHub’s Answer to Workflow Speed Concerns",
              sectionId: "github-answer-workflow-speed-concerns",
              subSections: [],
            },
            {
              name: "3rd-Party Solutions",
              sectionId: "third-party-solutions",
              subSections: [],
            },
            {
              name: "Remaining Unmet Needs",
              sectionId: "remaining-unmet-needs",
              subSections: [],
            },
            {
              name: "Harrier’s Summary Positioning",
              sectionId: "harrier-summary-positioning",
              subSections: [],
            },
          ],
        },
      ],
    },
    {
      name: "Design",
      sectionId: "design",
      subSections: [
        {
          name: "Achieving accelerated GHA Workflows",
          sectionId: "achieving-accelerated-gha-workflows",
          subSections: [],
        },
        {
          name: "Decision-Making Criteria",
          sectionId: "decision-making-criteria",
          subSections: [],
        },
        {
          name: "Primary Design Decisions",
          sectionId: "primary-design-decisions",
          subSections: [
            {
              name: "Breaking Free from GitHub's Default Infrastructure",
              sectionId: "breaking-free-from-github-default-infrastructure",
              subSections: [
                {
                  name: "GHA’s Self-hosted runner feature",
                  sectionId: "gha-self-hosted-runner-feature",
                  subSections: [],
                },
                {
                  name: "User’s own cloud infrastructure",
                  sectionId: "user-own-cloud-infrastructure",
                  subSections: [],
                },
                {
                  name: "On-demand runners",
                  sectionId: "on-demand-runners",
                  subSections: [],
                },
              ],
            },
            {
              name: "Caching as the Key Optimization Strategy",
              sectionId: "caching-key-optimization-strategy",
              subSections: [
                {
                  name: "Dedicated Persistent Cache Store",
                  sectionId: "dedicated-persistent-cache-store",
                  subSections: [],
                },
                {
                  name: "Custom Cache Management of Dependencies",
                  sectionId: "custom-cache-management-dependencies",
                  subSections: [],
                },
              ],
            },
            {
              name: "Streamlining the user journey to faster workflows",
              sectionId: "streamlining-user-journey-faster-workflows",
              subSections: [
                {
                  name: "Public Actions on GHA Marketplace",
                  sectionId: "public-actions-gha-marketplace",
                  subSections: [],
                },
                {
                  name: "Automated Cloud Infrastructure Provisioning",
                  sectionId: "automated-cloud-infrastructure-provisioning",
                  subSections: [],
                },
                {
                  name: "Effortless Platform Integration",
                  sectionId: "effortless-platform-integration",
                  subSections: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Implementation",
      sectionId: "implementation",
      subSections: [
        {
          name: "Proof-of-Concept focused on Node.js",
          sectionId: "proof-of-concept-nodejs",
          subSections: [
            {
              name: "Proof-of-Concept development as a test bed for design decisions",
              sectionId: "poc-development-test-bed",
              subSections: [],
            },
            {
              name: "Nearly 50% of current software development in Node.js",
              sectionId: "nodejs-software-development",
              subSections: [],
            },
          ],
        },
        {
          name: "Migrating from GitHub’s MS Azure VMs to AWS",
          sectionId: "migrating-azure-vms-aws",
          subSections: [
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
          ],
        },
        {
          name: "Centralize caching into AWS S3 Bucket",
          sectionId: "centralize-caching-aws-s3",
          subSections: [
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
          ],
        },
        {
          name: "Prioritizing the User Experience",
          sectionId: "prioritizing-user-experience",
          subSections: [
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
          ],
        },
        {
          name: "End-to-End Walkthrough",
          sectionId: "end-to-end-walkthrough",
          subSections: [
            {
              name: "Architecture",
              sectionId: "architecture",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
            {
              name: "",
              sectionId: "",
              subSections: [],
            },
          ],
        },
        {
          name: "Try it Yourself!",
          sectionId: "try-it-yourself",
          subSections: [
            {
              name: "Pre-Setup Steps for the User",
              sectionId: "pre-setup-steps",
              subSections: [],
            },
            {
              name: "Choose Configurations ⇒ .yml file",
              sectionId: "choose-configurations-yml",
              subSections: [],
            },
            {
              name: "Modify existing workflows",
              sectionId: "modify-existing-workflows",
              subSections: [],
            },
          ],
        },
      ],
    },
    {
      name: "Future Work",
      sectionId: "future-work",
      subSections: [
        { name: "6", sectionId: "6", subSections: [] },
        { name: "7", sectionId: "7", subSections: [] },
        { name: "8", sectionId: "8", subSections: [] },
        { name: "9", sectionId: "9", subSections: [] },
        { name: "10", sectionId: "10", subSections: [] },
        { name: "11", sectionId: "11", subSections: [] },
        { name: "12", sectionId: "12", subSections: [] },
        { name: "13", sectionId: "13", subSections: [] },
        { name: "14", sectionId: "14", subSections: [] },
        { name: "15", sectionId: "15", subSections: [] },
        { name: "16", sectionId: "16", subSections: [] },
        { name: "17", sectionId: "17", subSections: [] },
        { name: "18", sectionId: "18", subSections: [] },
        { name: "19", sectionId: "19", subSections: [] },
        { name: "20", sectionId: "20", subSections: [] },
      ],
    },
  ]);

  return (
    <SectionsStateContext.Provider value={{ sections }}>
      {children}
    </SectionsStateContext.Provider>
  );
};

export { SectionsStateProvider, SectionsStateContext };

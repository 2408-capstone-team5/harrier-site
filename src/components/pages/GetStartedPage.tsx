import SetupForm from "@/components/SetupForm";
import RenderYaml from "@/components/RenderYaml";
import { useState } from "react";
const GetStartedPage = () => {
  const [formDataJSON, setFormDataJSON] = useState("");
  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-8">Get Started</h2>
      {formDataJSON === "" ? (
        <SetupForm setFormDataJSON={setFormDataJSON} />
      ) : (
        <RenderYaml formDataJSON={formDataJSON} />
      )}
    </>
  );
};

export default GetStartedPage;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Input } from "./ui/input";

const formSchema = z.object({
  awsRegion: z.enum(["us-east-1", "us-east-2", "eu-west-1", "us-west-2"], {
    errorMap: () => ({
      message:
        "AWS Region must be one of: us-east-1, us-east-2, eu-west-1, us-west-2",
    }),
  }),
  awsAccountId: z.string().regex(/^\d{12}$/, {
    message: "AWS Account ID must consist of exactly 12 digit characters.",
  }),
  instanceType: z.string().min(1, { message: "Instance Type is required." }),
  cacheTtlHours: z.string().min(1, { message: "Cache TTL Hours is required." }),
  cidrBlockVpc: z.string().min(1, { message: "CIDR Block VPC is required." }),
  cidrBlockSubnet: z
    .string()
    .min(1, { message: "CIDR Block Subnet is required." }),
});

type SetupFormProps = {
  setFormDataJSON: (input: string) => void;
};

export default function SetupForm({ setFormDataJSON }: SetupFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awsRegion: "us-east-1",
      awsAccountId: "536697269866",
      instanceType: "t2.micro",
      cacheTtlHours: "72",
      cidrBlockVpc: "10.0.0.0/24",
      cidrBlockSubnet: "10.0.0.0/24",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log(values);
      setFormDataJSON(JSON.stringify(values, null, 2));
    }
  }

  const steps = [
    { name: "awsRegion", label: "AWS Region", placeholder: "us-east-1" },
    {
      name: "awsAccountId",
      label: "AWS Account ID",
      placeholder: "536697269866",
    },
    { name: "instanceType", label: "Instance Type", placeholder: "t2.micro" },
    { name: "cacheTtlHours", label: "Cache TTL Hours", placeholder: "72" },
    {
      name: "cidrBlockVpc",
      label: "CIDR Block VPC",
      placeholder: "10.0.0.0/16",
    },
    {
      name: "cidrBlockSubnet",
      label: "CIDR Block Subnet",
      placeholder: "10.0.0.0/24",
    },
  ];

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {steps.map(
            (step, index) =>
              index === currentStep && (
                <FormField
                  key={step.name}
                  control={form.control}
                  name={
                    step.name as
                      | "awsRegion"
                      | "awsAccountId"
                      | "instanceType"
                      | "cacheTtlHours"
                      | "cidrBlockVpc"
                      | "cidrBlockSubnet"
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{step.label}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={step.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
          )}
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            )}
            <Button type="submit">
              {currentStep < steps.length - 1 ? "Next" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

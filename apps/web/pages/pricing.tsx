import { cn } from "@poll/lib";
import { Icon, LoadingButton } from "@poll/ui";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
// import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import Header from "../components/header";
import { routes } from "../config/routes";
import { createPaymentPageUrl } from "../services/api";
import { getBaseUrl } from "../utils/get-base-url";

const pricingPlans = [
  {
    productId: "_",
    name: "Free",
    description: "Ideal for simple polls and initial experimentation.",
  },
  {
    productId: "prod_OdTeDMfvLOovf7",
    name: "Standard",
    description: "For users seeking more options and capabilities.",
  },
  {
    productId: "prod_OdTgXMYSYsi03h",
    name: "Premium",
    description: "Go premium for advanced features and maximum impact",
  },
];

export default function Page() {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["payments-list"],
  //   queryFn: () => axios.get("/payments"),
  // });
  const { mutateAsync } = useMutation({
    mutationFn: ({ productId }: { productId: string }) => {
      return createPaymentPageUrl(productId);
    },
  });
  const { status } = useSession();
  const router = useRouter();

  const handlePayment = async (productId: string) => {
    if (status == "unauthenticated") {
      router.push(routes.LOGIN, {
        query: {
          redirect: `${getBaseUrl()}${routes.PRICING}`,
        },
      });
      return;
    }
    if (status === "authenticated") {
      try {
        const url = await mutateAsync({ productId });
        router.push(url);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Header />
      <NextSeo title="Pricing" />
      <main className="container">
        <div className="space-y-8 my-4 md:my-8 xl:my-16 mx-auto flex flex-col items-center max-w-4xl">
          <div className="space-y-3 flex flex-col items-center">
            <h1 className="text-3xl font-medium">Pricing</h1>
            <p className="text-xl font-medium text-neutral-400 text-center">
              Find your ideal plan and unleash the full potential of our poll
              platform.
            </p>
          </div>
          <section className="flex flex-wrap gap-4">
            {pricingPlans.map(({ productId, name, description }) => (
              <PricingCard
                key={productId}
                className="w-full h-full md:max-w-[calc((100%/2)-16px)] xl:max-w-[calc((100%/3)-16px)]"
                planName={name}
                description={description}
                price={0}
                features={[
                  "Some feature 1",
                  "Some feature 2",
                  "Some feature 3",
                ]}
                ActionComponent={
                  <LoadingButton
                    isLoading={false}
                    type="button"
                    onClick={async () => handlePayment(productId)}>
                    Get {name}
                  </LoadingButton>
                }
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

type PricingCardProps = {
  planName: string;
  price: number;
  description: string;
  features: string[];
  ActionComponent: JSX.Element;
} & React.ComponentPropsWithoutRef<"div">;

function PricingCard({
  planName,
  price,
  description,
  features,
  ActionComponent,
  className,
  ...props
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "dark:bg-neutral-800/50 border-2 px-4 py-8 bg-white border-neutral-100 dark:border-neutral-800 rounded-[8px] flex flex-col justify-between min-w-[240px]",
        className
      )}
      {...props}>
      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-medium text-xl mb-4">{planName}</h2>
          <p className="font-medium text-xl mb-2">
            ${price}{" "}
            <span className="text-neutral-400 text-base">per month</span>
          </p>
          <p className="font-medium text-base mb-2 text-neutral-500">
            {description}
          </p>
        </div>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="text-sm flex space-x-4 items-center">
              <Icon.CheckIcon className="text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {ActionComponent}
    </div>
  );
}

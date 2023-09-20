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
        <div className="mx-auto my-4 flex max-w-4xl flex-col items-center space-y-8 md:my-8 xl:my-16">
          <div className="flex flex-col items-center space-y-3">
            <h1 className="text-3xl font-medium">Pricing</h1>
            <p className="text-center text-xl font-medium text-neutral-400">
              Find your ideal plan and unleash the full potential of our poll
              platform.
            </p>
          </div>
          <section className="flex flex-wrap gap-4">
            {pricingPlans.map(({ productId, name, description }) => (
              <PricingCard
                key={productId}
                className="h-full w-full md:max-w-[calc((100%/2)-16px)] xl:max-w-[calc((100%/3)-16px)]"
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
        "flex min-w-[240px] flex-col justify-between rounded-[8px] border-2 border-neutral-100 bg-white px-4 py-8 dark:border-neutral-800 dark:bg-neutral-800/50",
        className
      )}
      {...props}>
      <div className="mb-6 space-y-4">
        <div>
          <h2 className="mb-4 text-xl font-medium">{planName}</h2>
          <p className="mb-2 text-xl font-medium">
            ${price}{" "}
            <span className="text-base text-neutral-400">per month</span>
          </p>
          <p className="mb-2 text-base font-medium text-neutral-500">
            {description}
          </p>
        </div>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center space-x-4 text-sm">
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

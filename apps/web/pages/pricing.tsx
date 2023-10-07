import { cn } from "@poll/lib";
import type { Plan } from "@poll/prisma";
import type { Payment } from "@poll/types";
import { Alert, AlertTitle, Button, Icon } from "@poll/ui";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { QueryClient, dehydrate, useMutation } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useState } from "react";

import Header from "../components/header/header";
import { routes } from "../config/routes";
import { usePricingPlans } from "../hooks/use-pricing-plans";
import { paymentOptions } from "../queries/payment";
import { createPlanCheckoutSession } from "../services/api";
import { getErrorMessage } from "../utils/error";
import { getBaseUrl } from "../utils/get-base-url";

const plansData: {
  name: Plan;
  description: string;
}[] = [
  {
    name: "STANDARD",
    description: "For users seeking more options and capabilities.",
  },
  {
    name: "PREMIUM",
    description: "Go premium for advanced features and maximum impact",
  },
];

const isPlanOwned = (planName: Plan, currentPlan: Plan) => {
  const plans: Plan[] = ["FREE", "STANDARD", "PREMIUM"];
  if (plans.indexOf(currentPlan) >= plans.indexOf(planName)) return true;
  return false;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const queryClient = new QueryClient();
    await queryClient.fetchQuery(paymentOptions.getPricingPlans);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

export default function Page() {
  const [error, setError] = useState<string>(undefined);

  const { status, data: session } = useSession();
  const router = useRouter();
  const [paymentCycle, setPaymentCycle] =
    useState<Payment.PaymentCycle>("month");
  const { data: pricingPlans } = usePricingPlans();
  const { mutateAsync } = useMutation({
    mutationFn: ({ priceId }: { priceId: string }) => {
      return createPlanCheckoutSession(priceId);
    },
  });

  const handlePayment = async (priceId: string) => {
    try {
      if (status == "unauthenticated") {
        return void redirectUnauthenticatedToLoginPage();
      }
      if (status === "authenticated") {
        const url = await mutateAsync({ priceId });
        router.push(url);
      }
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  const redirectUnauthenticatedToLoginPage = () => {
    if (status == "unauthenticated") {
      router.push(routes.LOGIN, {
        query: {
          redirect: `${getBaseUrl()}${routes.PRICING}`,
        },
      });
    }
  };

  return (
    <>
      <Header />
      <NextSeo title="Pricing" />
      <main className="container">
        <div className="mx-auto my-4 flex max-w-4xl flex-col items-center space-y-8 md:my-8 xl:my-16">
          {error !== undefined ? (
            <Alert variant="error">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          ) : null}

          <div className="flex flex-col items-center space-y-3">
            <h1 className="text-3xl font-medium">Pricing</h1>
            <p className="text-center text-xl font-medium text-neutral-400">
              Find your ideal plan and unleash the full potential of our poll
              platform.
            </p>
          </div>
          <PricingSwitch
            leftText="Monthly"
            rightText="Yearly"
            checked={paymentCycle === "month" ? false : true}
            onCheckedChange={(checked) =>
              setPaymentCycle(checked === false ? "month" : "year")
            }
          />
          <section className="flex flex-wrap gap-4">
            <PricingCard
              className="h-full w-full md:max-w-[calc((100%/2)-16px)] xl:max-w-[calc((100%/3)-16px)]"
              planName="Free"
              description="Ideal for simple polls and initial experimentation."
              price={0}
              planType={paymentCycle}
              features={["Some feature 1", "Some feature 2", "Some feature 3"]}
              ActionComponent={
                <Button
                  type="button"
                  disabled={
                    status === "unauthenticated"
                      ? false
                      : isPlanOwned("FREE", session?.user.plan || "FREE")
                  }
                  onClick={redirectUnauthenticatedToLoginPage}
                  className="capitalize">
                  Get Free
                </Button>
              }
            />
            {plansData.map(({ name, description }, index) => {
              const selectedCyclePrice = pricingPlans[index].prices.find(
                (price) => price.interval === paymentCycle
              );
              return (
                <PricingCard
                  key={name}
                  className="h-full w-full md:max-w-[calc((100%/2)-16px)] xl:max-w-[calc((100%/3)-16px)]"
                  planName={name}
                  description={description}
                  price={selectedCyclePrice.amount / 100}
                  planType={paymentCycle}
                  features={[
                    "Some feature 1",
                    "Some feature 2",
                    "Some feature 3",
                  ]}
                  ActionComponent={
                    <Button
                      type="button"
                      disabled={
                        status === "unauthenticated"
                          ? false
                          : isPlanOwned(name, session?.user.plan || "FREE")
                      }
                      onClick={async () => handlePayment(selectedCyclePrice.id)}
                      className="capitalize">
                      Get {name.toLowerCase()}
                    </Button>
                  }
                />
              );
            })}
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
  planType: Payment.PaymentCycle;
  ActionComponent: JSX.Element;
} & React.ComponentPropsWithoutRef<"div">;

function PricingCard({
  planName,
  price,
  description,
  features,
  planType,
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
          <h2 className="mb-4 text-xl font-medium capitalize">
            {planName.toLowerCase()}
          </h2>
          <p className="mb-2 text-xl font-medium">
            ${price}{" "}
            <span className="text-base text-neutral-400">
              per {planType === "month" ? "month" : "year"}
            </span>
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

export const PricingSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  { leftText: string; rightText: string } & React.ComponentPropsWithoutRef<
    typeof SwitchPrimitives.Root
  >
>(({ leftText, rightText, className, onCheckedChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SwitchPrimitives.Root
      className={cn(
        "focus-visible:ring-ring focus-visible:ring-offset-background peer relative inline-flex h-[40px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800",
        className
      )}
      onCheckedChange={(checked) => {
        onCheckedChange(checked);
        setIsChecked(checked);
      }}
      ref={ref}
      {...props}>
      <span className="z-10 mr-2 px-2 font-medium">{leftText}</span>
      <span className="z-10 px-2 font-medium">{rightText}</span>
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none absolute top-1/2 block h-9 -translate-y-1/2 rounded-full bg-white px-2 text-transparent shadow-lg ring-0 transition-all data-[state=checked]:left-full data-[state=unchecked]:left-0 data-[state=checked]:-translate-x-full dark:bg-neutral-900"
        )}>
        {isChecked ? rightText : leftText}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
PricingSwitch.displayName = SwitchPrimitives.Root.displayName;

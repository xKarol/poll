import { LoadingButton } from "@poll/ui";
// import { useMutation, useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import Header from "../components/header";

// import axios from "../lib/axios";

const pricingPlans = [
  {
    priceId: "test_eVa9CM02gfUGdDqfYZ",
    name: "Premium Plan",
  },
  {
    priceId: "test_eVacOY7uI23Q2YMfYY",
    name: "Pro Plan",
  },
];

export default function Page() {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["payments-list"],
  //   queryFn: () => axios.get("/payments"),
  // });
  // const { mutateAsync } = useMutation({
  //   // @ts-ignore TODO
  //   mutationFn: ({ priceId }) => axios.post("/payments", { priceId }),
  // });
  const router = useRouter();

  return (
    <>
      <Header />
      <NextSeo title="Pricing" />
      <main className="container">
        <div className="flex flex-col">
          {pricingPlans.map((price) => (
            <div key={price.priceId}>
              {price.name}
              {/* {price.unit_amount}
              {price.currency} */}
              <LoadingButton
                isLoading={false}
                type="button"
                onClick={() => {
                  router.push(`https://buy.stripe.com/${price.priceId}`);
                }}>
                Buy
              </LoadingButton>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

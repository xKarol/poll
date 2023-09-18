import { LoadingButton } from "@poll/ui";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
// import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import Header from "../components/header";
import { routes } from "../config/routes";
import axios from "../lib/axios";

const pricingPlans = [
  {
    priceId: "price_1NqCiiBOPlaLJnMUvq8tXGd0",
    name: "Premium Plan",
  },
  {
    priceId: "price_1NqChJBOPlaLJnMU2rBkktKe",
    name: "Pro Plan",
  },
];

export default function Page() {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["payments-list"],
  //   queryFn: () => axios.get("/payments"),
  // });
  const { mutateAsync } = useMutation({
    // @ts-ignore TODO
    mutationFn: ({ priceId }) => axios.post("/payments", { priceId }),
  });
  const { status } = useSession();
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
                onClick={async () => {
                  if (status == "unauthenticated") {
                    // TODO redirect after login to pricing page
                    router.push(routes.LOGIN);
                    return;
                  }
                  if (status === "authenticated") {
                    // @ts-ignore
                    const { data } = await mutateAsync({
                      priceId: price.priceId,
                    });
                    router.push(data);
                  }
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

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
    productId: "prod_OdTgXMYSYsi03h",
    name: "Premium Plan",
  },
  {
    productId: "prod_OdTeDMfvLOovf7",
    name: "Standard Plan",
  },
];

export default function Page() {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["payments-list"],
  //   queryFn: () => axios.get("/payments"),
  // });
  const { mutateAsync } = useMutation({
    // @ts-ignore TODO
    mutationFn: ({ productId }) => axios.post("/payments", { productId }),
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
            <div key={price.productId}>
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
                    try {
                      // @ts-ignore
                      const { data } = await mutateAsync({
                        productId: price.productId,
                      });
                      router.push(data);
                    } catch (e) {
                      console.log(e);
                    }
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

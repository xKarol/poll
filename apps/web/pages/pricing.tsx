import { LoadingButton } from "@poll/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import Header from "../components/header";
import axios from "../lib/axios";

export default function Page() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["payments-list"],
    queryFn: () => axios.get("/payments"),
  });
  const { mutateAsync } = useMutation({
    // @ts-ignore TODO
    mutationFn: ({ priceId }) => axios.post("/payments", { priceId }),
  });
  const router = useRouter();

  return (
    <>
      <Header />
      <NextSeo title="Pricing" />
      <main className="container">
        <div className="flex flex-col">
          {!isLoading &&
            !isError &&
            data.data.map((price) => (
              <div key={price.id}>
                {price.unit_amount}
                {price.currency}
                <LoadingButton
                  isLoading={false}
                  type="button"
                  onClick={async () => {
                    // @ts-ignore
                    const { data: url } = await mutateAsync({
                      priceId: price.id,
                    });
                    router.push(url);
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

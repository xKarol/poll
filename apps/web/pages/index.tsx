import { cn } from "@poll/lib";
import { Button, Icon } from "@poll/ui";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { routes } from "../config/routes";
import { BaseLayout } from "../layouts";
import prisma from "../lib/prisma";
import HeroImage from "../public/hero-image.svg";

type Stats = {
  totalPolls: number;
  totalVotes: number;
  totalUsers: number;
};

export const getServerSideProps = (async () => {
  const stats = {
    totalPolls: await prisma.poll.count().catch(() => 0),
    totalVotes: await prisma.vote.count().catch(() => 0),
    totalUsers: await prisma.user.count().catch(() => 0),
  };
  return { props: { stats } };
}) satisfies GetServerSideProps<{
  stats: Stats;
}>;

export default function HomePage({
  stats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  console.log({ session });

  return (
    <div className="mt-8 space-y-16 xl:mt-32 xl:space-y-32">
      <section className="container flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="flex max-w-xl flex-col space-y-2 xl:space-y-8">
            <h1 className="text-3xl font-extrabold xl:text-6xl">
              Get Quick Answers with Polls
            </h1>
            <p className="text-lg font-semibold text-neutral-500 xl:text-3xl">
              Create polls for quick decisions. Get answers in seconds.
            </p>
          </div>
        </div>
        <div className="mt-8 flex-1 md:mt-0">
          <Image src={HeroImage} alt="hero" />
        </div>
      </section>
      <section className="border-b-2 border-t-2 border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-800/25">
        <div className="container flex max-w-4xl flex-col items-center space-y-4 py-8 md:flex-row md:justify-between md:space-x-4 md:space-y-0">
          <div className="flex flex-1 flex-col items-center">
            <p className="text-4xl font-bold uppercase md:text-5xl">
              {stats.totalPolls}
            </p>
            <p className="text-base font-semibold uppercase md:text-lg">
              Polls
            </p>
          </div>
          <div className="hidden h-[50px] w-[1px] bg-neutral-100 dark:bg-neutral-800 md:block"></div>
          <div className="flex flex-1 flex-col items-center">
            <p className="text-4xl font-bold uppercase md:text-5xl">
              {stats.totalVotes}
            </p>
            <p className="text-base font-semibold uppercase md:text-lg">
              Votes
            </p>
          </div>
          <div className="hidden h-[50px] w-[1px] bg-neutral-100 dark:bg-neutral-800 md:block"></div>

          <div className="flex flex-1 flex-col items-center">
            <p className="text-4xl font-bold uppercase md:text-5xl">
              {stats.totalUsers}
            </p>
            <p className="text-base font-semibold uppercase md:text-lg">
              Users
            </p>
          </div>
        </div>
      </section>
      <section className="container flex flex-col">
        <div className="mx-auto mb-32 flex max-w-4xl flex-col space-y-8">
          <h1 className="text-center text-3xl font-bold xl:text-5xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            delectus!
          </h1>
          <p className="text-center text-lg font-medium text-neutral-500 xl:text-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci,
            modi magnam voluptates excepturi amet corrupti praesentium facilis.
            Ea, sequi eligendi.
          </p>
        </div>
        <div className="flex flex-col gap-16 md:flex-row md:flex-wrap md:gap-8">
          <FeatureCard
            heading="User-Friendly Poll Creation"
            description="Easily create polls using a simple and intuitive interface. No technical skills required"
            Icon={<Icon.BarChart2 />}
            className="min-h-max w-full  md:max-w-[calc((100%/3)-32px)]"
          />
          <FeatureCard
            heading="Real-time Results"
            description="Watch poll results update in real time as participants cast their votes"
            Icon={<Icon.Radio />}
            className="min-h-max w-full md:max-w-[calc((100%/3)-32px)]"
          />
          <FeatureCard
            heading="In-Depth Poll Analytics"
            description="Get valuable data and insights to make informed decisions with our detailed poll statistics"
            Icon={<Icon.LineChart />}
            className="min-h-max w-full md:max-w-[calc((100%/3)-32px)]"
          />
        </div>
      </section>
      <section className="border-b-2 border-t-2 border-neutral-100 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-800/25">
        <div className="container flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-8">
            <h1 className="text-2xl font-bold xl:text-4xl">
              Join the Poll Now!
            </h1>
            <p className="text-lg font-semibold text-neutral-500 xl:text-2xl">
              Lorem, ipsum dolor.
            </p>
          </div>
          <Button asChild className="w-full md:w-auto">
            <Link href={routes.CREATE_POLL}>Create a poll</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

HomePage.Layout = BaseLayout;

type FeatureCardProps = {
  heading: string;
  description: string;
  Icon: JSX.Element;
} & React.ComponentPropsWithoutRef<"div">;
function FeatureCard({
  heading,
  description,
  Icon,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col space-y-8 rounded-[4px] border border-neutral-100 bg-white px-8 py-16 dark:border-neutral-800 dark:bg-neutral-800/25",
        className
      )}
      {...props}>
      <div className="absolute left-1/2 top-[-40px] flex h-[80px] w-[80px] -translate-x-1/2 items-center justify-center rounded-full bg-green-500 text-neutral-900 [&>svg]:h-[40px] [&>svg]:w-[40px]">
        {Icon}
      </div>
      <h1 className="text-center text-xl font-bold">{heading}</h1>
      <p className="text-center text-base font-medium text-neutral-500">
        {description}
      </p>
    </div>
  );
}

import type { Plan } from "@poll/prisma";
import { useSession } from "next-auth/react";

export const useHasPermission = () => {
  const { data: session } = useSession();
  const userPlan = session?.user.plan || "FREE";
  return {
    hasPermission: (planName: Plan) => hasPermission(planName, userPlan),
  };
};

const plans: Plan[] = ["FREE", "BASIC", "PRO"];
function hasPermission(planName: Plan, currentPlan: Plan) {
  if (plans.indexOf(currentPlan) >= plans.indexOf(planName)) return true;
  return false;
}

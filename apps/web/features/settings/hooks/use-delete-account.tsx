import { Icon, toast } from "@poll/ui";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { routes } from "../../../config/routes";
import { deleteUser } from "../../../services/api";

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      signOut({ callbackUrl: routes.HOME });
      toast("The account has been deleted.", { icon: <Icon.Check /> });
    },
  });
};

import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useUserPolls = () => useQuery(analyticsOptions.getUserPollsVotes);

export default useUserPolls;

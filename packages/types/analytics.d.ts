export type GetPollData = {
  pollId: string;
};

// Frontend
export interface Api {
  // TODO add type
  getUserPollVotes: () => Promise<unknown[]>;
  getUserPollTopDevices: () => Promise<
    { device: "mobile" | "desktop" | "tablet"; total: number }[]
  >;
}

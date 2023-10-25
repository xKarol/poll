export type GetPollData = {
  pollId: string;
};

export type Devices = "mobile" | "tablet" | "desktop";

// Frontend
export interface Api {
  // TODO add type
  getUserPollVotes: () => Promise<unknown[]>;
  getUserPollTopDevices: () => Promise<Record<Devices, number>>;
}

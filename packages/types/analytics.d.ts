export type GetPollData = {
  pollId: string;
};

export type Devices = "mobile" | "tablet" | "desktop";

// Frontend
export interface Api {
  getUserPollVotes: () => Promise<{ timestamp: number; totalVotes: number }[]>;
  getUserPollTopDevices: () => Promise<Record<Devices, number>>;
  getUserPollTopCountries: () => Promise<
    { country_name: string; country_code: string; totalVotes: number }[]
  >;
}

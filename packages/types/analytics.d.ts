export type GetPollData = {
  pollId: string;
};

export type Devices = "mobile" | "tablet" | "desktop";
export type Interval = "day" | "hour" | "minute";

export type VotesData = { timestamp: number; total: number };

export type TopCountriesData = {
  country_name: string;
  country_code: string;
  total: number;
};

export type TopDevicesData = Record<Devices, number>;

export type DefaultAnalyticsProps<RestProps = unknown> = {
  start_date?: string;
  end_date?: string;
  limit?: number;
} & RestProps;

export type getUserPollVotesParams = DefaultAnalyticsProps<{
  interval?: Interval;
}>;

// Frontend
export interface Api {
  getUserPollVotes: (params: getUserPollVotesParams) => Promise<VotesData[]>;
  getUserPollTopDevices: (
    params?: DefaultAnalyticsProps
  ) => Promise<TopDevicesData>;
  getUserPollTopCountries: (
    params?: DefaultAnalyticsProps
  ) => Promise<TopCountriesData[]>;
}

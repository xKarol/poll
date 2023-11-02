export type GetPollData = {
  pollId: string;
};

export type Devices = "mobile" | "tablet" | "desktop";
export type Interval = "month" | "day" | "hour";

export type VotesData = { timestamp: number; total: number };

export type TopCountriesData = {
  country_name: string;
  country_code: string;
  total: number;
};

export type TopDevicesData = Record<Devices, number>;

export type ClientAnalyticsParams = {
  dateFrom?: number;
  dateTo?: number;
  limit?: number;
  interval?: string;
};

export type AnalyticsParams<TParams = Record<string, unknown>> = Required<
  Omit<ClientAnalyticsParams, "interval">
> & {
  ownerId: string;
} & TParams;

type TinyBirdResponse<TData extends Record<string, unknown>> = {
  data: TData;
  meta: {
    name: string;
    type: string;
  }[];
  rows?: number | undefined;
  rows_before_limit_at_least?: number | undefined;
  statistics?:
    | {
        elapsed?: number | undefined;
        rows_read?: number | undefined;
        bytes_read?: number | undefined;
      }
    | undefined;
};

// Frontend
export interface Api {
  getUserPollVotes: (params?: ClientAnalyticsParams) => Promise<VotesData[]>;
  getUserPollTopDevices: (
    params?: ClientAnalyticsParams
  ) => Promise<TopDevicesData>;
  getUserPollTopCountries: (
    params?: ClientAnalyticsParams
  ) => Promise<TopCountriesData[]>;
}

// Backend
export interface Services {
  getUserPollVotes: (
    params: AnalyticsParams<{
      groupBy: Interval;
    }>
  ) => Promise<TinyBirdResponse<VotesData[]>>;
  getUserPollTopDevices: (
    params: AnalyticsParams
  ) => Promise<TinyBirdResponse<{ device: Devices; total: number }[]>>;
  getUserPollTopCountries: (
    params: AnalyticsParams
  ) => Promise<TinyBirdResponse<TopCountriesData[]>>;
}

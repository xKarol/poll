export type GetQRParams = {
  text: string;
};

// Frontend
export interface Api {
  getQRCodeImage: (text: string) => Promise<string>;
}

// Backend
export interface Services extends Api {
  getQRCodeImage: (text: string) => Promise<string>;
}

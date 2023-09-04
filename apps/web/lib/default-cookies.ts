import type { CookieOption, CookiesOptions } from "next-auth";

export function defaultCookies(secure: boolean): CookiesOptions {
  const cookiePrefix = secure ? "__Secure-" : "";

  const defaultOptions: CookieOption["options"] = {
    sameSite: secure ? "none" : "lax",
    path: "/",
    secure: secure,
  };

  return {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        ...defaultOptions,
        httpOnly: true,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: defaultOptions,
    },
    csrfToken: {
      name: `${cookiePrefix}next-auth.csrf-token`,
      options: {
        ...defaultOptions,
        httpOnly: true,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        ...defaultOptions,
        httpOnly: true,
      },
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        ...defaultOptions,
        httpOnly: true,
      },
    },
    nonce: {
      name: `${cookiePrefix}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: secure,
      },
    },
  };
}

import GlobalConfig, { frontendConfig } from "@/config";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Open_Sans } from "next/font/google";
import type { AppProps } from "next/app";
import Session from "supertokens-auth-react/recipe/session";
import { useEffect } from "react";
import { useRouter } from "next/router";
const openSans = Open_Sans({
  subsets: ["vietnamese"],
  weight: ["300", "400", "600", "700"],
});
export default function App({ Component, pageProps }: AppProps) {
  const router=useRouter()
  if (typeof window !== "undefined") {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokensReact.init(frontendConfig(router));
  }
  useEffect(() => {
    async function doRefresh() {
      // pageProps.fromSupertokens === 'needs-refresh' will be true
      // when in getServerSideProps, getSession throws a TRY_REFRESH_TOKEN
      // error.

      if (pageProps.fromSupertokens === "needs-refresh") {
        if (await Session.attemptRefreshingSession()) {
          // post session refreshing, we reload the page. This will
          // send the new access token to the server, and then
          // getServerSideProps will succeed
          location.reload();
        } else {
          // the user's session has expired. So we redirect
          // them to the login page

          // redirect to login page
          useRouter().push(GlobalConfig.rel_url.login)
        }
      }
    }
    doRefresh();
  }, [pageProps.fromSupertokens]);

  if (pageProps.fromSupertokens === "needs-refresh") {
    // in case the frontend needs to refresh, we show nothing.
    // Alternatively, you can show a spinner.

    return null;
  }
  return (
    <SuperTokensWrapper>
      <Component {...pageProps} />
    </SuperTokensWrapper>
  );
}

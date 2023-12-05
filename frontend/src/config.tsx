import {  NextRouter, useRouter } from "next/router";
import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
const GlobalConfig = {
  var: {
    title: "LieShop",
    description: "LieShop",
  },
  language: {
    locales: ["vn"],
    defaultLocale: "vn",
  },
  url: {
    login: "0.0.0.0:8000/auth/login",
    api: "0.0.0.0:8000/auth",
    register: "0.0.0.0:8000/auth/register",
    web: "0.0.0.0:3000",
  },
  rel_url: {
    login: "/auth/login",
    register: "/auth/signup",
    homepage: "/homepage",
  },
};
export default GlobalConfig;
export const appInfo = {
  apiDomain: GlobalConfig.url.api,
  websiteDomain: GlobalConfig.url.web,
  apiBasePath: "/auth",
  appName: "LieShop",
};
export const frontendConfig = (router:NextRouter) => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init(),
      SessionReact.init(),
    ],
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            if(typeof(window)!="undefined"){
              router.push(href)
            }
          },
        },
      }
    },
  }
}
import EmailPasswordNode from 'supertokens-node/recipe/emailpassword'
import SessionNode from 'supertokens-node/recipe/session'
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: "0.0.0.0:3567",
      // apiKey: <API_KEY(if configured)>,
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init(),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  }
}
import Session from 'supertokens-node/recipe/session'
import supertokensNode from 'supertokens-node'

export async function getServerSideProps(context: any) {

    // this runs on the backend, so we must call init on supertokens-node SDK
    supertokensNode.init(backendConfig())

    // this will contain the session object post verification
    let session

    try {
        // getSession will do session verification for us
        session = await Session.getSession(context.req, context.res, {
        overrideGlobalClaimValidators: () => {
          // this makes it so that no custom session claims are checked
          return []
        }})
    } catch (err: any) {
        if (err.type === Session.Error.TRY_REFRESH_TOKEN) {

            // in this case, the session is still valid, only the access token has expired.
            // The refresh token is not sent to this route as it's tied to the /api/auth/session/refresh API paths.
            // So we must send a "signal" to the frontend which will then call the 
            // refresh API and reload the page.

            return { props: { fromSupertokens: 'needs-refresh' } }
            // or return {fromSupertokens: 'needs-refresh'} in case of getInitialProps
        } else if (err.type === Session.Error.UNAUTHORISED) {
            // in this case, there is no session, or it has been revoked on the backend.
            // either way, sending this response will make the frontend try and refresh
            // which will fail and redirect the user to the login screen.
            return { props: { fromSupertokens: 'needs-refresh' } }
        }
        
        throw err
    }

    // session verification is successful and we can pass
    // the user's ID to the frontend.

    return {
        props: { userId: session!.getUserId() },
    }
    // or return {userId: session.getUserId()} in case of getInitialProps
}
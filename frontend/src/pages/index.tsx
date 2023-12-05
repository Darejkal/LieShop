import GlobalConfig from "@/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { signOut } from "supertokens-web-js/recipe/emailpassword";

export default function Home(){
  const router=useRouter()
  useEffect(()=>{
      const url = new URL(window.location.href);
      if(url.searchParams.get("logout")=="1"){
        signOut().then(
          ()=>{
            console.log("OK");
            // router.push(GlobalConfig.rel_url.login)
          window.location.href=GlobalConfig.rel_url.login
        }
        )
      } else {
        router.push(GlobalConfig.rel_url.login)
      }
  })
  return (
    <main className="vh-100 bg-light">
      <Container className="h-100 ">
        <div className="row h-100">
          <div className="col-10 m-auto text-center">
            <h6>If you are not redirected automatically, follow <Link
              href={GlobalConfig.rel_url.login}>this link</Link>.
            </h6>
          </div>
        </div>
      </Container>
    </main>
  )
}

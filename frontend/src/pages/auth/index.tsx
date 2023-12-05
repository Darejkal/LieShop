import GlobalConfig from "@/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

export default function RedirectLogin() {
  if (typeof window != "undefined") {
    useRouter().push(GlobalConfig.rel_url.login);
  }
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

import GlobalConfig from "@/config";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { CardHeader, Container, Nav, NavLink, Navbar } from "react-bootstrap";
import { signIn } from "supertokens-web-js/recipe/emailpassword";

async function signInClicked(email: string, password: string, router:NextRouter) {
    try {
        let response = await signIn({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })
        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax).
                    return formField.error
                }
            })
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            return "Email password combination is incorrect."
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            // this can happen due to automatic account linking. Tell the user that their 
            // input credentials is wrong (so that they do through the password reset flow)
        } else {
            // sign in successful. The session tokens are automatically handled by
            // the frontend SDK.
            router.push(GlobalConfig.rel_url.homepage)
            return ""
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            // return err.message;
        } else {
            console.log(err)
        }
    } 
}

export default function Login() {
  const [email, setEmail] = useState("a@a.com");
  const [password, setPassword] = useState("admin1115@");
  const [warning, setWarning] = useState("");
  const router=useRouter()
  return (
    <div
      className="vh-100 row justify-content-md-center border-radius-lg bg-gray-100"
    >
      <Container className="col-9 d-flex flex-column align-items-center justify-content-center border-radius-lg flex-wrap ">
        <h1 className="text-primary">LieShop</h1>
        <div className="card m-3">
          <div className="card-body">
            <h6 id="textWarning" className="text-danger" >
              {warning}
            </h6>

            <form
              onSubmit={(e) => {e.preventDefault();signInClicked(email,password,router).then((flag)=>{
                if(flag){
                  setWarning(flag)
                }
              });}}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="form-group">
                <label className="form-control-label">
                  Email
                  <input
                    className="form-control"
                    type="email"
                    placeholder="cnpm@example.com"
                    id="inputEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-group">
                <label className="form-control-label">
                  Password
                  <input
                    className="form-control"
                    type="password"
                    placeholder="password"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <input
                  type="submit"
                  className="mt-2 btn btn-primary"
                  value="login"
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
      <Container className="bg-primary col-3 h-100 flex-grow-1 d-flex flex-column align-items-center justify-content-center border-radius-lg flex-wrap bg-gray-100">
      <h1 className="text-white">New here? </h1>
        <NavLink  href={GlobalConfig.rel_url.register}><h2 className="btn btn-outline-light btn-lg m-2">SignUp!</h2></NavLink>
      </Container>
    </div>
  );
}

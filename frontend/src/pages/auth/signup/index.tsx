import GlobalConfig from "@/config";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, NavLink } from "react-bootstrap";
import { signUp } from "supertokens-web-js/recipe/emailpassword";
import { doesEmailExist } from "supertokens-web-js/recipe/emailpassword";

async function signUpClicked(email: string, password: string,router:NextRouter) {
    try {
        let response = await signUp({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validaiton
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    window.alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") { 
            // this can happen during automatic account linking. Tell the user to use another
            // login method, or go through the password reset flow.
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            // window.location.href = GlobalConfig.rel_url.main
            router.push(GlobalConfig.rel_url.homepage)
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

async function checkEmail(email: string) {
    try {
        let response = await doesEmailExist({
            email
        });

       return response.doesExist
    } catch (err: any) {
        // if (err.isSuperTokensGeneralError === true) {
        //     // this may be a custom error message sent from the API by you.
        //     window.alert(err.message);
        // } else {
        //     window.alert("Oops! Something went wrong.");
        // }
    }
}
export default function SignUp() {
    const [email,setEmail]=useState("a@a.com");
    const [password,setPassword]=useState("admin1115@");
    const [warning,setWarning]=useState("");
    const router=useRouter();
    return (
      <Container fluid={true} className="vh-100 d-flex flex-column align-items-center justify-content-center border-radius-lg flex-wrap bg-gray-100">
        <h1 className="text-primary">LieShop</h1>
        <div className="card m-3">
          <div className="card-body">
            <h6 id="textWarning" className="text-danger">{warning}</h6>
  
            <form
              onSubmit={(e)=>{e.preventDefault();signUpClicked(email,password,router)}}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="form-group">
                <label className="form-control-label">
                  Email
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="cnpm@example.com"
                    id="inputEmail"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    onBlur={(e)=>{
                      checkEmail(email).then((flag)=>{
                        if(flag){
                          setWarning("Email already existed.")
                        } else {
                          setWarning("")
                        }
                      })
                    }}
                  />
                </label>
              </div>
  
              <div className="form-group">
                <label className="form-control-label">
                  Password
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="password"
                    id="inputPassword"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="row mt-3 nowrap">
              <input type="submit" className="btn btn-primary col" value="Sign up" />
              </div>
              <footer><NavLink className="text-muted"  href={GlobalConfig.rel_url.login}><small>or login</small></NavLink></footer>
            </form>
            
          </div>
        </div>
      </Container>
    );
  }
  
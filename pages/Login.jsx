import "../style/login.css";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const userData = useCallback(
    (e) => {
      e.preventDefault();

      axios
        .post("http://localhost:8080/users/authenticate", {
          email,
          password,
        })
        .then((response) => {
          if (response.data === true) {
            navigate("/home");
          } else {
            navigate("/purchase");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    [navigate, email, password]
  );

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={(e) => userData(e)}>
            <span className="login-form-title"> Bem vindo </span>

            <span className="login-form-title"></span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" type="submit">
                Login
              </button>
            </div>

            <div className="text-center">
              <span className="txt1">Não possui conta? </span>
              <a
                className="createaccount"
                href={"http://localhost:3000/createaccount"}
              >
                Criar conta
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

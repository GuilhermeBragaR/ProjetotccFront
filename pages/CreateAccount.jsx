import axios from "axios";
import "../style/createaccount.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();

  const btnCancel = (e) => {
    e.preventDefault();
    navigate("../");
  };

  const createUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/users", {
        email,
        password,
        admin
      })
      .then((response) => {
        if (response) {
          navigate("../");
          alert("Criado com sucesso!!")
        }
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  const validateAdmin = () => {
    setAdmin(!admin)
  }

  return (
    <div className="createaccount-container">
      <div className="createaccount-container-login">
        <div className="createaccount-wrap-login">
          <form
            className="createaccount-login-form"
            onSubmit={(e) => createUser(e)}
          >
            <span className="createaccount-login-form-title">
              {" "}
              Criar Conta{" "}
            </span>

            <span className="createaccount-login-form-title"></span>

            <div className="createaccount-wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="email"></span>
            </div>

            <div className="createaccount-wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>
            <div className="container-login-form-checkbox">
              <input className="login-form-checkbox" type="checkbox" value={admin} onClick={validateAdmin}></input>
              <label className="login-form-checkbox-label">Admin</label>
            </div>
            <div className="createaccount-container-login-form-btn">
              <button className="createaccount-login-form-btn" type="submit">
                Create
              </button>
            </div>
            <div className="createaccount-container-login-form-btn">
              <button
                className="createaccount-login-form-btn2"
                onClick={(e) => btnCancel(e)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

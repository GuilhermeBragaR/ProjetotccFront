import axios from "axios";
import "../style/product.css";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router";

export const Product = () => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [peso, setPeso] = useState();
  const [estoque, setEstoque] = useState();
  const [preco, setPreco] = useState();
  const [msgError, setMsgError] = useState("");
  const [responseType, setResponseType] = useState("");

  let navigate = useNavigate();

  const timeoutMsgError = () => {
    setTimeout(() => {
      setMsgError("");
      setResponseType("");
    }, 2000);
  };

  const styleRed = {
    color: "#000",
    backgroundColor: "#ff0000",
    margin: "5px",
    padding: "5px",
    borderRadius: "10px",
    opacity: "0.7",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  };

  const styleGreen = {
    color: "#000",
    backgroundColor: "#20fc03",
    margin: "5px",
    padding: "5px",
    borderRadius: "10px",
    opacity: "0.7",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  };

  const postData = () => {
    axios
      .post("http://localhost:8080/product", {
        nome,
        tipo,
        estoque,
        peso,
        preco,
      })
      .then((res) => {
        setMsgError(res.data.msg);
        setResponseType("sucess");
        if (res.status == 200) {
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      })
      .catch((error) => {
        setResponseType("error");
        setMsgError(error.response.data.msg);
      });
  };

  return (
    <div className="main">
      <Form className="create-form">
        <Form.Field>
          <label>Nome do Produto</label>
          <input
            placeholder="nome "
            type="text"
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Tipo do Produto</label>
          <input
            placeholder="Tipo "
            type="text"
            onChange={(e) => setTipo(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Estoque</label>
          <input
            placeholder="Estoque "
            type="number"
            onChange={(e) => setEstoque(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Peso</label>
          <input
            placeholder="Peso "
            type="number"
            onChange={(e) => setPeso(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Preço</label>
          <input
            placeholder="Preco "
            type="number"
            onChange={(e) => setPreco(e.target.value)}
          />
        </Form.Field>
        <div className="container-btn-product">
          <Button
            className="btn-product"
            onClick={() => {
              navigate("../home");
            }}
          >
            Voltar
          </Button>
          <Button
            className="btn-product"
            onClick={() => {
              postData();
              timeoutMsgError();
            }}
            type="submit"
          >
            Criar{" "}
          </Button>
        </div>
      </Form>
      <div className="container-mensagemerror" style={responseType !== "" ? (responseType === "sucess" ? styleGreen : styleRed): {display: "none"}}>
        {responseType === "error" ? <span>{msgError}</span> : <span>{msgError}</span>}
      </div>
    </div>
  );
};

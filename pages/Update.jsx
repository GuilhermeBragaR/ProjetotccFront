import axios from "axios";
import "../style/product.css";
import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router";

export const Update = () => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [peso, setPeso] = useState("");
  const [estoque, setEstoque] = useState("");
  const [id, setId] = useState("");
  const [preco, setPreco] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("_id"));
    setNome(localStorage.getItem("nome"));
    setTipo(localStorage.getItem("tipo"));
    setEstoque(localStorage.getItem("estoque"));
    setPeso(localStorage.getItem("peso"));
    setPreco(localStorage.getItem("preco"));
  }, []);

  const updateProduto = () => {
    axios
      .patch(`http://localhost:8080/product/${id}`, {
        nome,
        tipo,
        peso,
        estoque,
        preco,
      })
      .then(() => {
        navigate("/home");
      });
  };

  return (
    <div className="main">
      <Form className="create-form">
        <Form.Field>
          <label>Nome</label>
          <input
            value={nome}
            type="text"
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Tipo</label>
          <input
            value={tipo}
            type="text"
            onChange={(e) => setTipo(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Estoque</label>
          <input
            value={estoque}
            type="number"
            onChange={(e) => setEstoque(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Peso</label>
          <input
            value={peso}
            type="number"
            onChange={(e) => setPeso(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Preço</label>
          <input
            value={preco}
            type="number"
            onChange={(e) => setPreco(e.target.value)}
          />
        </Form.Field>

        <Button onClick={updateProduto} type="submit">
          {" "}
          Update{" "}
        </Button>
        <br />
        <br />
      </Form>
    </div>
  );
};

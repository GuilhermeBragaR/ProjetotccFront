import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import "../style/purchase.css";
import { useNavigate } from "react-router";
import { moedaBRL } from "./Checkout"

export const Purchase = () => {
  const [produtos, setProdutos] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/product").then((res) => {
      setProdutos(res.data);
    });
  }, []);

  const setProduct = (produto) => {
    produto.quantidade = 1;
    let { _id, nome, peso, preco, quantidade } = produto;
    let vendaProdutos = new Array();

    if (localStorage.hasOwnProperty("vendaProdutos")) {
      vendaProdutos = JSON.parse(localStorage.getItem("vendaProdutos"));
    }

    const produtoIndexExist = vendaProdutos.findIndex(
      (produto) => produto._id == _id
    );

    if (produtoIndexExist != -1) {
      vendaProdutos[produtoIndexExist].quantidade += 1;
    } else {
      vendaProdutos.push({ _id, nome, peso, preco, quantidade });
    }
    localStorage.setItem("vendaProdutos", JSON.stringify(vendaProdutos));
  };

  const validatePurchase = () => {
    if (localStorage.getItem("vendaProdutos") === null) {
      return window.alert("Não existe produtos no carrinho");
    } else navigate("/checkout");
  };

  function moedaBRL(valor) {
    const moedaFinal = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return moedaFinal;
  }

  return (
    <div className="container-purchase">
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Tipoe</Table.HeaderCell>
            <Table.HeaderCell>Estoque</Table.HeaderCell>
            <Table.HeaderCell>Peso</Table.HeaderCell>
            <Table.HeaderCell>Preço</Table.HeaderCell>
            <Table.HeaderCell>Carrinho</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {produtos.map((produto) => {
            return (
              <Table.Row key={produto._id}>
                <Table.Cell>{produto.nome}</Table.Cell>
                <Table.Cell>{produto.tipo}</Table.Cell>
                <Table.Cell>{produto.estoque}</Table.Cell>
                <Table.Cell>{produto.peso} Kg</Table.Cell>
                <Table.Cell>{moedaBRL(produto.preco)}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => setProduct(produto)}>+</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div className="container-btn-purchase">
        <Button
          onClick={() => {
            navigate("../");
          }}
        >
          Sair
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            validatePurchase();
          }}
        >
          Carrinho
        </Button>
      </div>
    </div>
  );
};

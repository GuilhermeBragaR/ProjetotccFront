import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [produto, setProduto] = useState([]);
  let navigate = useNavigate();

  function moedaBRL(valor) {
    const moedaFinal = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return moedaFinal;
  }

  useEffect(() => {
    axios.get("http://localhost:8080/product").then((res) => {
      setProduto(res.data);
    });
  }, []);

  const setData = (data) => {
    let { _id, nome, tipo, estoque, peso, preco } = data;
    localStorage.setItem("_id", _id);
    localStorage.setItem("nome", nome);
    localStorage.setItem("tipo", tipo);
    localStorage.setItem("estoque", estoque);
    localStorage.setItem("peso", peso);
    localStorage.setItem("preco", preco);
  };

  const oneDelete = (id) => {
    axios.delete(`http://localhost:8080/product/${id}`).then((response) => {
      alert(response.data.msg);
    });
    window.location.reload(false);
  };

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell>Estoque</Table.HeaderCell>
            <Table.HeaderCell>Peso</Table.HeaderCell>
            <Table.HeaderCell>Preço</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {produto.map((produto) => {
            return (
              <Table.Row key={produto._id}>
                <Table.Cell>{produto.nome}</Table.Cell>
                <Table.Cell>{produto.tipo}</Table.Cell>
                <Table.Cell>{produto.estoque}</Table.Cell>
                <Table.Cell>{produto.peso} KG</Table.Cell>
                <Table.Cell>{moedaBRL(produto.preco)}</Table.Cell>
                <Table.Cell>
                  <Link to="/update">
                    <Button onClick={() => setData(produto)}>Update</Button>
                  </Link>
                  <Button onClick={() => oneDelete(produto._id)}>Delete</Button>
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
          onClick={() => {
            navigate("../product");
          }}
        >
          Novo Produto
        </Button>
      </div>
    </div>
  );
};

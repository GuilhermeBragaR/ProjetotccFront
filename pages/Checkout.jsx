import React, { useEffect, useState } from "react";
import { Button, Tab, Table } from "semantic-ui-react";
import "../style/checkout.css";
import axios from "axios";
import { useNavigate } from "react-router";

export const moedaBRL = () => {

};

export const Checkout = () => {
  const [produto, setProduto] = useState([]);
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [numero, setNumero] = useState("");
  const [valorTotalProdutos, setValorTotalProdutos] = useState("");
  const [valorParcela, setValorParcela] = useState([]);
  const [pagamento, setPagamento] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [msgError, setMsgError] = useState("");
  const [aux, setAux] = useState(Boolean);

  let navigate = useNavigate();

  useEffect(() => {
    const produtosVenda = JSON.parse(localStorage.getItem("vendaProdutos"));
    setProduto(produtosVenda);
  }, [aux]);

  useEffect(() => {
    let total = new Array();
    produto.forEach((elem) => {
      total.push({ valortotal: elem.preco * elem.quantidade });
    });
    const totalVendasProdutos = total.reduce((prevVal, elem) => {
      return prevVal + elem.valortotal;
    }, 0);
    setValorTotalProdutos(totalVendasProdutos);
    setPagamento(
      "1 x R$ " +
        totalVendasProdutos
          .toFixed(2)
          .replace(".", ",")
          .replace(/\d(?=(\d{3})+,)/g, "$&.")
    );
  }, [produto]);

  useEffect(() => {
    let valordiv = 0;
    let i = 1;
    let valorArray = new Array();
    do {
      valordiv = valorTotalProdutos / i;
      valorArray.push({ valordiv });
      setValorParcela(valorArray);
      i++;
    } while (valordiv > 30 && i < 13);
  }, [valorTotalProdutos]);

  function moedaBRL(valor) {
    const moedaFinal = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return moedaFinal;
  }

  const finalizaVenda = () => {
    axios
      .post("http://localhost:8080/purchaseitens", {
        nomeCliente: nomeCliente,
        produtos: produto,
        valortotal: valorTotalProdutos,
        formaPagamento: pagamento,
        endereco: endereco,
        numero: numero,
        bairro: bairro,
        telefone: telefone,
      })
      .then((res) => {
        setMsgError(res.data.msg);
        if (res.status === 200) {
          window.alert("Compra Finalizada com Sucesso");
          localStorage.clear();
          navigate("../purchase");
        }
      })
      .catch((error) => {
        setMsgError(error.response.data.msg);
      });
  };

  const timeoutMsgError = () => {
    setTimeout(() => {
      setMsgError("");
    }, 3000);
  };

  const diminuirProduto = (id) => {
    let produtoEscolido = new Array();
    produtoEscolido = JSON.parse(localStorage.getItem("vendaProdutos"));

    const produtoIndexExist = produtoEscolido.findIndex(
      (produto) => produto._id == id
    );

    if (
      produtoIndexExist != -1 &&
      produtoEscolido[produtoIndexExist].quantidade > 1
    ) {
      produtoEscolido[produtoIndexExist].quantidade -= 1;
    } else {
      produtoEscolido.splice(produtoIndexExist, 1);
    }
    localStorage.setItem("vendaProdutos", JSON.stringify(produtoEscolido));


    if (!aux) {
      setAux(true);
    } else {
      setAux(false);
    }
  };

  const excluirProduto = (id) => {
    let produtoEscolido = new Array();
    produtoEscolido = JSON.parse(localStorage.getItem("vendaProdutos"));
    const produtoIndexExist = produtoEscolido.findIndex(
      (produto) => produto._id == id
    );
    if (produtoIndexExist != -1) {
      produtoEscolido.splice(produtoIndexExist, 1);
    }

    localStorage.setItem("vendaProdutos", JSON.stringify(produtoEscolido));

    if (!aux) {
      setAux(true);
    } else {
      setAux(false);
    }
  };

  return (
    <div>
      <div className="container-Checkout">
        <span className="form-text">Carrinho de compras </span>
        <Table singleLine className="teste">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Produtos</Table.HeaderCell>
              <Table.HeaderCell>Quantidades</Table.HeaderCell>
              <Table.HeaderCell>Valor Total</Table.HeaderCell>
              <Table.HeaderCell>Retirar</Table.HeaderCell>
              <Table.HeaderCell>Excluir</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {produto.map((produtos) => {
              return (
                <Table.Row key={produtos._id}>
                  <Table.Cell>{produtos.nome}</Table.Cell>
                  <Table.Cell>{produtos.quantidade}</Table.Cell>
                  <Table.Cell>
                    {moedaBRL(produtos.preco * produtos.quantidade)}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        diminuirProduto(produtos._id);
                      }}
                    >
                      -
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        excluirProduto(produtos._id);
                      }}
                    >
                      x
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <div className="container-formapagamento">
          <span className="form-text"> Formas de Pagamentos </span>
          <div className="container-formapagamento-endereco">
            <span className="text-formapagamento">Nome Completo: </span>
            <input
              className="input-formapagamento"
              type="text"
              onChange={(e) => setNomeCliente(e.target.value)}
            ></input>
            <br />
            <span className="text-formapagamento">Endereço: </span>
            <input
              className="input-formapagamento"
              type="text"
              onChange={(e) => setEndereco(e.target.value)}
            ></input>
            <span className="text-formapagamento">Numero: </span>
            <input
              className="input-formapagamento"
              type="number"
              onChange={(e) => setNumero(e.target.value)}
            ></input>
            <br />
            <span className="text-formapagamento">Bairro: </span>
            <input
              className="input-formapagamento"
              type="text"
              onChange={(e) => setBairro(e.target.value)}
            ></input>
            <span className="text-formapagamento">Telefone: </span>
            <input
              className="input-formapagamento"
              type="number"
              onChange={(e) => setTelefone(e.target.value)}
            ></input>
            <br />
            <span className="text-formapagamento">Pagamento: </span>
            <select
              className="select-formapagamento"
              onChange={(e) => setPagamento(e.target.value)}
            >
              {valorParcela.map((valor, index) => {
                return (
                  <option key={valor.valordiv}>
                    {index +
                      1 +
                      " x R$ " +
                      valor.valordiv
                        .toFixed(2)
                        .replace(".", ",")
                        .replace(/\d(?=(\d{3})+,)/g, "$&.")}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="container-confir-pagamento">
          <span className="text-confir-formapagamento">
            Nome Completo: {nomeCliente}
          </span>
          <span className="text-confir-formapagamento">
            Endereço: {endereco}
            <span className="text-confir-formapagamento-numero">
              Numero: {numero}
            </span>
          </span>
          <span className="text-confir-formapagamento">Bairro: {bairro}</span>
          <span className="text-confir-formapagamento">
            Telefone: {telefone}
          </span>
          <span className="text-confir-formapagamento">
            Pagamento: {pagamento}{" "}
          </span>
        </div>
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("../purchase");
            }}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            onClick={() => {
              finalizaVenda();
              timeoutMsgError();
            }}
          >
            Finalizar
          </Button>
        </div>
        {msgError != "" && <span className="msg-error">{msgError}</span>}
      </div>
    </div>
  );
};


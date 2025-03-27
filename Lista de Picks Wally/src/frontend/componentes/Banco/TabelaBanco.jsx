import React, { useState, useEffect } from "react";
import LinhaBanco from "./LinhaBanco";
import "./TabelaBanco.css";

const TabelaBanco = ({ dadosIniciais }) => {
  const [dados, setDados] = useState(dadosIniciais);

  useEffect(() => {
    setDados(dadosIniciais);
  }, [dadosIniciais]);

  // Atualiza o valor do crédito (valor) do banco
  const atualizarCredito = (index, novoCredito) => {
    const novosDados = [...dados];
    novosDados[index] = { ...novosDados[index], valor: novoCredito }; // Altere de 'credito' para 'valor'
    setDados(novosDados);

    // Enviar atualização para o backend
    fetch("http://localhost:5000/banco", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novosDados), // Envia os dados atualizados
    }).catch((error) => console.error("Erro ao atualizar crédito:", error));
  };

  // Exclui uma linha do banco
  const excluirLinha = (index) => {
    const novosDados = dados.filter((_, i) => i !== index);
    setDados(novosDados);

    fetch("http://localhost:5000/banco", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }), // Envia o índice da linha a ser excluída
    }).catch((error) => console.error("Erro ao excluir linha:", error));
  };

  return (
    <div className="tabela">
      <div className="cabecalho">
        <div className="coluna">Nome</div>
        <div className="coluna">Crédito (R$)</div>
      </div>
      {dados.map((jogador, index) => (
        <LinhaBanco
          key={jogador.id} 
          index={index}
          nome={jogador.nome}
          credito={jogador.valor} 
          onAtualizarCredito={atualizarCredito}
          onExcluir={excluirLinha}
        />
      ))}
    </div>
  );
};

export default TabelaBanco;

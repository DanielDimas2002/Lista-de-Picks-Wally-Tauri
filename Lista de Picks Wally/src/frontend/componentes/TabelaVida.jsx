import React, { useState } from "react";
import LinhaVida from "./LinhaVida";
import "./Tabela.css";

const TabelaVida = ({ dadosIniciais }) => {
  const [dados, setDados] = useState(dadosIniciais);

  const adicionarVida = (index) => {
    setDados((prevDados) => {
      const novosDados = [...prevDados];
      novosDados[index].vida += 1;
      return novosDados;
    });
  };

  const vitoria = (index) => {
    setDados((prevDados) => {
      const novosDados = [...prevDados];
      novosDados[index].vitorias += 1;
      return novosDados;
    });
  };

  const derrota = (index) => {
    setDados((prevDados) => {
      const novosDados = [...prevDados];
      novosDados[index].derrotas += 1;
      return novosDados;
    });
  };

  const limpar = (index) => {
    setDados((prevDados) => {
      const novosDados = [...prevDados];
      novosDados[index].vida = 0;
      return novosDados;
    });
  };

  const excluir = (index) => {
    setDados((prevDados) => prevDados.filter((_, i) => i !== index));
  };

  const calcularWinRate = (vitorias, derrotas) => {
    const totalPartidas = vitorias + derrotas;
    return totalPartidas > 0 ? ((vitorias / totalPartidas) * 100).toFixed(2) : 0;
  };

  return (
    <div className="tabela">
      <div className="cabecalho">
        <div className="coluna">Jogador</div>
        <div className="coluna">Vida</div>
        <div className="coluna">Win Rate</div>
        <div className="coluna">Vitórias</div>
        <div className="coluna">Derrotas</div>
        <div className="coluna">Total de Vidas Usadas</div>
        <div className="coluna">Ações</div>
      </div>
      {dados.map((jogador, index) => (
        <LinhaVida
          key={index}
          index={index}
          nome={jogador.nome}
          vida={jogador.vida}
          winRate={calcularWinRate(jogador.vitorias, jogador.derrotas)}
          vitorias={jogador.vitorias}
          derrotas={jogador.derrotas}
          totalVidas={jogador.totalVidas}
          onAdicionarVida={adicionarVida}
          onVitoria={vitoria}
          onDerrota={derrota}
          onLimpar={limpar}
          onExcluir={excluir}
        />
      ))}
    </div>
  );
};

export default TabelaVida;

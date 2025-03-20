import React, { useState } from "react";
import LinhaVida from "./LinhaVida";
import "./TabelaVida.css";

const TabelaVida = ({ dadosIniciais }) => {
  const [dados, setDados] = useState(dadosIniciais);

  const atualizarJogador = (id, novoValor, tipo) => {
    setDados((prevDados) =>
      prevDados.map((jogador) =>
        jogador.id === id
          ? {
              ...jogador,
              vida: tipo === "adicionar" ? jogador.vida + 1 : 
                    tipo === "reduzir" ? jogador.vida - 1 : 
                    tipo === "limpar" ? 0 : jogador.vida,
              vitorias: tipo === "vitoria" ? jogador.vitorias + 1 : jogador.vitorias,
              derrotas: tipo === "derrota" ? jogador.derrotas + 1 : jogador.derrotas,
            }
          : jogador
      )
    );
  };

  const excluirJogador = (id) => {
    setDados((prevDados) => prevDados.filter((jogador) => jogador.id !== id));
  };

  // Função para calcular o Win Rate Ajustado com 2 casas decimais
  const calcularWinRateAjustado = (vitorias, derrotas, fatorDeSuavizacao = 10) => {
    const totalJogos = vitorias + derrotas;
    const winRate = totalJogos > 0 ? (vitorias / totalJogos) * 100 : 0;
    const winRateAjustado = (winRate * totalJogos + fatorDeSuavizacao) / (totalJogos + fatorDeSuavizacao);
    return winRateAjustado.toFixed(2);
  };

  // Ordena os dados com base no win rate ajustado
  const dadosOrdenados = [...dados].sort((a, b) => {
    const winRateAjustadoA = calcularWinRateAjustado(a.vitorias, a.derrotas);
    const winRateAjustadoB = calcularWinRateAjustado(b.vitorias, b.derrotas);
    return winRateAjustadoB - winRateAjustadoA;  // Ordem decrescente
  });

  return (
    <div className="tabela">
      <div className="cabecalho">
        <div className="coluna">Jogador</div>
        <div className="coluna">Vida</div>
        <div className="coluna">Win Rate Ajustado</div>
        <div className="coluna">Vitórias</div>
        <div className="coluna">Derrotas</div>
        <div className="coluna">Total de Vidas</div>
        <div className="coluna">Ações</div>
      </div>
      {dadosOrdenados.map((jogador) => (
        <LinhaVida
          key={jogador.id}
          id={jogador.id}
          nome={jogador.nome}
          vida={jogador.vida}
          winRate={calcularWinRateAjustado(jogador.vitorias, jogador.derrotas)}
          vitorias={jogador.vitorias}
          derrotas={jogador.derrotas}
          totalVidas={jogador.totalVidas}
          onAtualizar={atualizarJogador}
          onExcluir={excluirJogador}
        />
      ))}
    </div>
  );
};

export default TabelaVida;

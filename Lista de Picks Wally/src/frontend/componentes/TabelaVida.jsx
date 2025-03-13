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

  const reduzirVida = (index) => {
    setDados((prevDados) => {
      const novosDados = [...prevDados];
      novosDados[index].vida -= 1;
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

  // Função para calcular o Win Rate Ajustado com 2 casas decimais
  const calcularWinRateAjustado = (vitorias, derrotas, fatorDeSuavizacao = 10) => {
    const totalJogos = vitorias + derrotas;
    const winRate = totalJogos > 0 ? (vitorias / totalJogos) * 100 : 0;

    // Ajuste do win rate com o número de jogos e fator de suavização
    const winRateAjustado = (winRate * totalJogos + fatorDeSuavizacao) / (totalJogos + fatorDeSuavizacao);
    
    // Retorna o win rate ajustado com 2 casas decimais
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
        <div className="coluna">Total de Vidas Usadas</div>
        <div className="coluna">Ações</div>
      </div>
      {dadosOrdenados.map((jogador, index) => (
        <LinhaVida
          key={index}
          index={index}
          nome={jogador.nome}
          vida={jogador.vida}
          winRate={calcularWinRateAjustado(jogador.vitorias, jogador.derrotas)}
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

import React, { useState, useEffect } from "react";
import LinhaVida from "./LinhaVida";
import "./TabelaVida.css";

const TabelaVida = () => {
  const [dados, setDados] = useState([]);

  // Buscar os dados do backend ao montar o componente
  useEffect(() => {
    fetch("http://localhost:5000/vidas")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na resposta do servidor");
        }
        return res.json();
      })
      .then((dadosRecebidos) => {
        if (Array.isArray(dadosRecebidos)) {
          setDados(dadosRecebidos); // Se o backend retorna diretamente um array
        } else if (dadosRecebidos.vidas && Array.isArray(dadosRecebidos.vidas)) {
          setDados(dadosRecebidos.vidas);
        } else {
          console.error("Formato de dados inesperado:", dadosRecebidos);
          setDados([]); // Evita que o estado fique indefinido
        }
      })
      .catch((erro) => console.error("Erro ao buscar dados:", erro));
  }, []);


  const atualizarEstado = (index, modificador) => {
    setDados((prevDados) => {
      const novosDados = [...prevDados];
      novosDados[index] = { ...novosDados[index], ...modificador };
      return novosDados;
    });

    // Aqui você pode adicionar uma chamada ao backend para salvar a alteração
  };

  const adicionarVida = (index) => atualizarEstado(index, { vidas: dados[index].vidas + 1 });
  const reduzirVida = (index) => atualizarEstado(index, { vidas: dados[index].vidas - 1 });
  const vitoria = (index) => atualizarEstado(index, { vitorias: dados[index].vitorias + 1 });
  const derrota = (index) => atualizarEstado(index, { derrotas: dados[index].derrotas + 1 });
  const limpar = (index) => atualizarEstado(index, { vida: 0 });

  const excluir = (index) => {
    setDados((prevDados) => prevDados.filter((_, i) => i !== index));
  };

  const calcularWinRateAjustado = (vitorias, derrotas, fatorDeSuavizacao = 10) => {
    const totalJogos = vitorias + derrotas;
    const winRate = totalJogos > 0 ? (vitorias / totalJogos) * 100 : 0;
    const winRateAjustado = (winRate * totalJogos + fatorDeSuavizacao) / (totalJogos + fatorDeSuavizacao);
    return winRateAjustado.toFixed(2);
  };

  const dadosOrdenados = [...dados].sort((a, b) => {
    return calcularWinRateAjustado(b.vitorias, b.derrotas) - calcularWinRateAjustado(a.vitorias, a.derrotas);
  });

  const jogadoresFormatados = dados.map((jogador) => ({
    ...jogador,
    vitorias: jogador.vitorias ?? 0, // Se vitorias não existe, assume 0
    derrotas: jogador.derrotas ?? 0, // Se derrotas não existe, assume 0
    totalVidas: jogador.vidas, // Total de vidas
    winRate:
      jogador.vitorias + jogador.derrotas > 0
        ? ((jogador.vitorias / (jogador.vitorias + jogador.derrotas)) * 100).toFixed(1)
        : "0.0", // Se não tem partidas, winRate é 0%
  }));


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
      {jogadoresFormatados.map((jogador, index) => (
        <LinhaVida
          key={index}
          index={index}
          nome={jogador.nome}
          vida={jogador.totalVidas}
          vitorias={jogador.vitorias}
          derrotas={jogador.derrotas}
          winRate={jogador.winRate}
          onAdicionarVida={adicionarVida}
          onReduzirVida={reduzirVida}
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

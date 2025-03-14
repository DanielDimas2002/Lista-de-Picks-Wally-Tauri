import React from "react";

const LinhaVida = ({ index, nome, vida, winRate, vitorias, derrotas, totalVidas, onAdicionarVida, onReduzirVida, onVitoria, onDerrota, onLimpar, onExcluir }) => {
  return (
    <div className="linha">
      <div className="coluna">{nome}</div>
      <div className="coluna">{vida}</div>
      <div className="coluna">{winRate}%</div>
      <div className="coluna">{vitorias}</div>
      <div className="coluna">{derrotas}</div>
      <div className="coluna">{totalVidas}</div>
      <div className="coluna">
        <button onClick={() => onAdicionarVida(index)}>+Vida</button>
        <button onClick={() => onReduzirVida(index)}>-Vida</button>
        <button onClick={() => onVitoria(index)}>Vit</button>
        <button onClick={() => onDerrota(index)}>Der</button>
        <button onClick={() => onLimpar(index)}>Limpar</button>
        <button onClick={() => onExcluir(index)}>Excluir</button>
      </div>
    </div>
  );
};

export default LinhaVida;

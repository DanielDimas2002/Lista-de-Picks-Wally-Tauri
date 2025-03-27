import React from "react";

const LinhaVida = ({ index, nome, vida, winRate, vitorias, derrotas, totalVidas, onAdicionarVida, onReduzirVida, onVitoria, onDerrota, onLimpar, onExcluir }) => {
  
  console.log("Renderizando LinhaVida:", { index, nome, vida, winRate, vitorias, derrotas, totalVidas });


  return (
    <div className="linha">
      <div className="coluna">{nome}</div>
      <div className="coluna">{vida}</div>
      <div className="coluna">{winRate}%</div>
      <div className="coluna">{vitorias}</div>
      <div className="coluna">{derrotas}</div>
      <div className="coluna">{totalVidas}</div>
      <div className="coluna">
        <button onClick={() => onAdicionarVida(index)} title="Adicionar uma vida">
          <span className="material-symbols-outlined">add</span>
        </button>

        <button onClick={() => onReduzirVida(index)} title="Reduzir uma vida">
          <span className="material-symbols-outlined">remove</span>
        </button>

        <button onClick={() => onVitoria(index)} title="Registrar uma vitória">
          <span className="material-symbols-outlined">emoji_events</span>
        </button>

        <button onClick={() => onDerrota(index)} title="Registrar uma derrota">
          <span className="material-symbols-outlined">thumb_down</span>
        </button>

        <button onClick={() => onLimpar(index)} title="Zerar vidas do jogador">
          <span className="material-symbols-outlined">restart_alt</span>
        </button>

        <button onClick={() => onExcluir(index)} title="Remover jogador da lista">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default LinhaVida;

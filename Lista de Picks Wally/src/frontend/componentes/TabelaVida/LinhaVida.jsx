import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

const LinhaVida = ({ index, nome, vida, winRate, vitorias, derrotas, totalVidas, onAtualizar, onExcluir }) => {

  const handleAdicionarVida = async () => {
    const novaVida = vida + 1;
    await invoke("atualizar_vida_jogador", { index, novaVida });
    onAtualizar(index, { vida: novaVida });
  };

  const handleReduzirVida = async () => {
    if (vida > 0) {
      const novaVida = vida - 1;
      await invoke("atualizar_vida_jogador", { index, novaVida });
      onAtualizar(index, { vida: novaVida });
    }
  };

  const handleVitoria = async () => {
    const novaVitoria = vitorias + 1;
    await invoke("atualizar_vitoria_jogador", { index, novaVitoria });
    onAtualizar(index, { vitorias: novaVitoria });
  };

  const handleDerrota = async () => {
    const novaDerrota = derrotas + 1;
    await invoke("atualizar_derrota_jogador", { index, novaDerrota });
    onAtualizar(index, { derrotas: novaDerrota });
  };

  const handleLimpar = async () => {
    await invoke("zerar_vidas_jogador", { index });
    onAtualizar(index, { vida: 0 });
  };

  const handleExcluir = async () => {
    await invoke("excluir_jogador", { index });
    onExcluir(index);
  };

  return (
    <div className="linha">
      <div className="coluna">{nome}</div>
      <div className="coluna">{vida}</div>
      <div className="coluna">{winRate}%</div>
      <div className="coluna">{vitorias}</div>
      <div className="coluna">{derrotas}</div>
      <div className="coluna">{totalVidas}</div>
      <div className="coluna">
        <button onClick={handleAdicionarVida} title="Adicionar uma vida">
          <span className="material-symbols-outlined">add</span>
        </button>

        <button onClick={handleReduzirVida} title="Reduzir uma vida">
          <span className="material-symbols-outlined">remove</span>
        </button>

        <button onClick={handleVitoria} title="Registrar uma vitória">
          <span className="material-symbols-outlined">emoji_events</span>
        </button>

        <button onClick={handleDerrota} title="Registrar uma derrota">
          <span className="material-symbols-outlined">thumb_down</span>
        </button>

        <button onClick={handleLimpar} title="Zerar vidas do jogador">
          <span className="material-symbols-outlined">restart_alt</span>
        </button>

        <button onClick={handleExcluir} title="Remover jogador da lista">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default LinhaVida;

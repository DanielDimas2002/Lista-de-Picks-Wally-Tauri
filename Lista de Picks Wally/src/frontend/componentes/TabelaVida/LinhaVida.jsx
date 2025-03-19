import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

const LinhaVida = ({ index, nome, vida, winRate, vitorias, derrotas, totalVidas, onAtualizar, onExcluir }) => {

  const handleAdicionarVida = async () => {
    const novaVida = vida + 1;
    await invoke("atualizar_vida_jogador", { index, novaVida }); // Salva no backend
    onAtualizar(index, novaVida, "adicionar"); // Atualiza no estado local
  };

  const handleReduzirVida = async () => {
    if (vida > 0) {
      const novaVida = vida - 1;
      await invoke("atualizar_vida_jogador", { index, novaVida }); // Salva no backend
      onAtualizar(index, novaVida, "reduzir"); // Atualiza no estado local
    }
  };

  const handleVitoria = async () => {
    const novaVitoria = vitorias + 1;
    await invoke("atualizar_vitoria_jogador", { index, novaVitoria }); // Salva no backend
    onAtualizar(index, novaVitoria, "vitoria"); // Atualiza no estado local
  };

  const handleDerrota = async () => {
    const novaDerrota = derrotas + 1;
    await invoke("atualizar_derrota_jogador", { index, novaDerrota }); // Salva no backend
    onAtualizar(index, novaDerrota, "derrota"); // Atualiza no estado local
  };

  const handleLimpar = async () => {
    await invoke("zerar_vidas_jogador", { index }); // Zera no backend
    onAtualizar(index, 0, "limpar"); // Atualiza no estado local
  };

  const handleExcluir = async () => {
    await invoke("excluir_jogador", { index }); // Remove do backend
    onExcluir(index); // Remove do estado local
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

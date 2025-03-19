import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

const LinhaPick = ({ index, nome, vidas, onAtualizar, onExcluir }) => {

  const handleReduzirVida = async () => {
    if (vidas > 0) {
      const novasVidas = vidas - 1;
      await invoke("atualizar_vidas_pick", { index, novasVidas }); // Salva no backend
      onAtualizar(index, novasVidas); // Atualiza no estado local
    }
  };

  const handleExcluir = async () => {
    await invoke("excluir_pick", { index }); // Remove do backend
    onExcluir(index); // Remove do estado local
  };

  return (
    <div className="linha">
      <div className="coluna">{nome}</div>
      <div className="coluna">{vidas}</div>
      <div className="coluna">
        <button onClick={handleReduzirVida} title="Reduzir uma vida">
          <span className="material-symbols-outlined">remove</span>
        </button>
        
        <button onClick={() => onAtualizar(index, "editar")} title="Editar nome e vidas">
          <span className="material-symbols-outlined">edit</span>
        </button>
        
        <button onClick={() => onAtualizar(index, "subir")} title="Mover para cima">
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
        
        <button onClick={() => onAtualizar(index, "descer")} title="Mover para baixo">
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
        
        <button onClick={() => onAtualizar(index, "topo")} title="Mover para o topo">
          <span className="material-symbols-outlined">vertical_align_top</span>
        </button>
        
        <button onClick={handleExcluir} title="Excluir da lista">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default LinhaPick;

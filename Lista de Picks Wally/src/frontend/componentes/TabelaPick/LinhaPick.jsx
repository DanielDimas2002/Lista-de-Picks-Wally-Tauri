import React from "react";

const LinhaPick = ({ index, nome, vidas, onReduzirVida, onEditar, onMoverParaTopo, onSubir, onDescer, onExcluir }) => {
  return (
    <div className="linha">
      <div className="coluna">{nome}</div>
      <div className="coluna">{vidas}</div>
      <div className="coluna">
        <button onClick={() => onReduzirVida(index)} title="Reduzir uma vida">
          <span className="material-symbols-outlined">remove</span>
        </button>
        
        <button onClick={() => onEditar(index)} title="Editar nome e vidas">
          <span className="material-symbols-outlined">edit</span>
        </button>
        
        <button onClick={() => onSubir(index)} title="Mover para cima">
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
        
        <button onClick={() => onDescer(index)} title="Mover para baixo">
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
        
        <button onClick={() => onMoverParaTopo(index)} title="Mover para o topo">
          <span className="material-symbols-outlined">vertical_align_top</span>
        </button>
        
        <button onClick={() => onExcluir(index)} title="Excluir da lista">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default LinhaPick;

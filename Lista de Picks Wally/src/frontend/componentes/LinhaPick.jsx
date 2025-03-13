import React from "react";

const LinhaPick = ({ index, nome, vidas, onReduzirVida, onEditar, onMoverParaTopo, onSubir, onDescer, onExcluir }) => {
  return (
    <div className="linha">
      <div className="coluna">{nome}</div>
      <div className="coluna">{vidas}</div>
      <div className="coluna">
        <button onClick={() => onReduzirVida(index)}>Reduzir Vida</button>
        <button onClick={() => onEditar(index)}>Editar</button>
        <button onClick={() => onSubir(index)}>↑</button>
        <button onClick={() => onDescer(index)}>↓</button>
        <button onClick={() => onMoverParaTopo(index)}>Topo</button>
        <button onClick={() => onExcluir(index)}>Excluir</button>
      </div>
    </div>
  );
};

export default LinhaPick;

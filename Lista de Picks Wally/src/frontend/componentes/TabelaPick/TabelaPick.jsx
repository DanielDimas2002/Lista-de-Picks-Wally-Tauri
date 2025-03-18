import React, { useState } from "react";
import LinhaPick from "./LinhaPick";
import "./TabelaPick.css";

const TabelaPick = ({ dadosIniciais }) => {
  const [dados, setDados] = useState(dadosIniciais);

  const reduzirVida = (index) => {
    setDados((prevPicks) => {
      const novosPicks = [...prevPicks];
      if (novosPicks[index].vidas > 0) {
        novosPicks[index].vidas -= 1;
      }
      return novosPicks;
    });
  };

  const excluirPick = (index) => {
    setDados((prevPicks) => prevPicks.filter((_, i) => i !== index));
  };

  const subirPick = (index) => {
    setDados((prevPicks) => {
      const novosPicks = [...prevPicks];
      if (index > 0) {
        const [moverPick] = novosPicks.splice(index, 1);
        novosPicks.splice(index - 1, 0, moverPick);
      }
      return novosPicks;
    });
  };

  const descerPick = (index) => {
    setDados((prevPicks) => {
      const novosPicks = [...prevPicks];
      if (index < novosPicks.length - 1) {
        const [moverPick] = novosPicks.splice(index, 1);
        novosPicks.splice(index + 1, 0, moverPick);
      }
      return novosPicks;
    });
  };

  const moverParaTopo = (index) => {
    setDados((prevPicks) => {
      const novosPicks = [...prevPicks];
      const [moverPick] = novosPicks.splice(index, 1);
      novosPicks.unshift(moverPick); 
      return novosPicks;
    });
  };

  return (
    <div className="tabela">
      <div className="cabecalho">
        <div className="coluna">Campeão</div>
        <div className="coluna">Vidas</div>
        <div className="coluna">Ações</div>
      </div>
      {dados.map((pick, index) => (
        <LinhaPick
          key={index}
          index={index}
          nome={pick.nome}
          vidas={pick.vidas}
          onReduzirVida={reduzirVida}
          onSubir={subirPick}
          onDescer={descerPick}
          onMoverParaTopo={moverParaTopo}
          onExcluir={excluirPick}
        />
      ))}
    </div>
  );
};

export default TabelaPick;

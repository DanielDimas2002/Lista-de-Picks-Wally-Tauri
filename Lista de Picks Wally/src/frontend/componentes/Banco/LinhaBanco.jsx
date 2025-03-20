import React, { useState } from "react";

const LinhaBanco = ({ index, nome, credito, onAtualizarCredito, onExcluir }) => {
  const [novoCredito, setNovoCredito] = useState(credito);

  const handleCreditoChange = (e) => {
    const valorCredito = parseFloat(e.target.value);
    if (!isNaN(valorCredito)) {
      setNovoCredito(valorCredito);
    }
  };

  const handleCreditoBlur = () => {
    onAtualizarCredito(index, novoCredito);
  };

  return (
    <div className="linha">
      <div className="coluna">{nome}</div>
      <div className="coluna">
        <input
          type="number"
          value={novoCredito}
          onChange={handleCreditoChange}
          onBlur={handleCreditoBlur}
        />
      </div>
      <div className="coluna">
        <button onClick={() => onExcluir(index)} title="Excluir linha">
          Excluir
        </button>
      </div>
    </div>
  );
};

export default LinhaBanco;

import React, { useState } from "react";

const LinhaBanco = ({ index, nome, credito, onAtualizarCredito, onExcluir }) => {

    const [valor, setValor] = useState(credito);
    const [editando, setEditando] = useState(false);


    const handleBlur = () => {
        if (valor === "" || isNaN(parseFloat(valor))) {
            alert("A linha será excluída se permanecer vazia.");
            onExcluir(index);
        } else {
            onAtualizarCredito(index, parseFloat(valor));
            setEditando(false);
        }
    }

    return (
        <div className="linha">
            <div className="coluna">{nome}</div>
            <div className="coluna">{
                editando ? (
                    <input
                        type="number"
                        step="0.01"
                        value={valor}
                        onChange={(e) => setValor(parseFloat(e.target.value) || "")}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    <span onClick={() => setEditando(true)}>{credito.toFixed(2)}</span>
                )}
            </div>
        </div>
    )

}
export default LinhaBanco
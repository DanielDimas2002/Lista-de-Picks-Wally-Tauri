// PopUp.jsx
import React, { useState } from "react";
import "./PopUp.css";

function PopUp({ tipo }) {
  const [valor, setValor] = useState("");  // Defina o estado para 'valor'
  const [nome, setNome] = useState("");

  const handleChange = (e) => {
    setValor(e.target.value);  // Atualize o valor com o que foi digitado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Nome: ${nome}, Valor: ${valor}`);
    // Lógica para salvar ou enviar os dados
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default PopUp;

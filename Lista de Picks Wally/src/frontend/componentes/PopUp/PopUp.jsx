import React, { useState } from "react";
import "./PopUp.css";

function PopUp({ tipo, fecharPopUp, onClose }) {
  const [valor, setValor] = useState("");
  const [nome, setNome] = useState("");
  const [vidas, setVidas] = useState("");

  const handleChangeValor = (e) => {
    setValor(e.target.value);
  };

  const handleChangeVidas = (e) => {
    setVidas(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Nome: ${nome}, Vidas: ${vidas}, Valor: ${valor}`);

    let endpoint = "";
    let data = {};

    if (tipo === "personagem") {
      endpoint = "picks";
      data = { nome, vidas: Number(vidas) || 0 };
    } else if (tipo === "jogador") {
      endpoint = "vidas";
      data = { nome, vidas: Number(vidas) || 0 };
    } else if (tipo === "banco") {
      endpoint = "banco";
      data = { nome, valor: parseFloat(valor) || 0 };
    }

    if (endpoint) {
      try {
        const response = await fetch(`http://localhost:5000/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Erro ao salvar os dados");
        }
        console.log("Dados salvos com sucesso!");

        fecharPopUp();
        if (onClose) onClose(); 
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
      }
    }
  };

  return (
    <div className="popup">
      <div className="popup-conteudo">
        <h2>
          {tipo === "personagem"
            ? "Adicionar Personagem"
            : tipo === "jogador"
            ? "Adicionar Jogador"
            : tipo === "banco"
            ? "Adicionar Crédito ao Banco"
            : ""}
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome"
              required
            />
          </div>

          {(tipo === "personagem" || tipo === "jogador") && (
            <div>
              <label htmlFor="vidas">Vidas:</label>
              <input
                type="number"
                id="vidas"
                value={vidas}
                onChange={handleChangeVidas}
                placeholder="Quantidade de Vidas"
                min="0"
                required
              />
            </div>
          )}

          {tipo === "banco" && (
            <div>
              <label htmlFor="valor">Valor:</label>
              <input
                type="number"
                id="valor"
                value={valor}
                onChange={handleChangeValor}
                step="0.01"
                placeholder="Valor do Crédito"
                required
              />
            </div>
          )}

          <div className="popup-botoes">
            <button type="button" onClick={fecharPopUp}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopUp;

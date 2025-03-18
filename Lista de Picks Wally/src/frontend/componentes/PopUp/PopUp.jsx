import React, { useState } from "react";
import "./PopUp.css";

function PopUp({ tipo, fecharPopUp }) {
  const [valor, setValor] = useState("");  // Defina o estado para 'valor'
  const [nome, setNome] = useState("");
  const [vidas, setVidas] = useState("");  // Defina o estado para 'vidas'

  const handleChangeValor = (e) => {
    setValor(e.target.value);  // Atualize o valor com o que foi digitado
  };

  const handleChangeVidas = (e) => {
    setVidas(e.target.value);  // Atualize as vidas com o que foi digitado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Nome: ${nome}, Vidas: ${vidas}, Valor: ${valor}`);

    // Lógica para salvar ou enviar os dados (pode ser modificada conforme necessidade)
    fecharPopUp();
  };

  const handleCancel = () => {
    // Ao clicar no botão "Cancelar", o pop-up será fechado
    fecharPopUp();  // Chame corretamente a função passada como prop
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
            />
          </div>

          {tipo === "personagem" && (
            <div>
              <label htmlFor="vidas">Vidas:</label>
              <input
                type="number"
                id="vidas"
                value={vidas}
                onChange={handleChangeVidas}
                placeholder="Quantidade de Vidas"
                min="0"
              />
            </div>
          )}

          {tipo === "jogador" && (
            <div>
              <label htmlFor="vidas">Vidas:</label>
              <input
                type="number"
                id="vidas"
                value={vidas}
                onChange={handleChangeVidas}
                placeholder="Quantidade de Vidas"
                min="0"
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
              />
            </div>
          )}

          <div className="popup-botoes">
            <button type="button" onClick={handleCancel}>
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

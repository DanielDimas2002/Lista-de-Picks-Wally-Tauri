import React, { useState } from "react";
import Menu from "./componentes/Menu/Menu";
import PopUp from "./componentes/PopUp/PopUp";
import TabelaPick from "./componentes/TabelaPick/TabelaPick";
import TabelaVida from "./componentes/TabelaVida/TabelaVida";
import TabelaBanco from "./componentes/Banco/TabelaBanco";
import "./resetCSS.css"
import "./App.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("picks");
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [tipoPopup, setTipoPopup] = useState("");

  const dadosPicks = [
    { nome: "Campeão 1", vidas: 10 },
    { nome: "Campeão 2", vidas: 12 },
    { nome: "Campeão 3", vidas: 8 },
  ];

  const dadosVidas = [
    { nome: "Jogador 1", vida: 5, vitorias: 10, derrotas: 2, totalVidas: 50 },
    { nome: "Jogador 2", vida: 7, vitorias: 8, derrotas: 5, totalVidas: 60 },
    { nome: "Jogador 3", vida: 4, vitorias: 15, derrotas: 1, totalVidas: 45 },
  ];

  const dadosBanco = [
    { nome: "Wally", credito: 150.75 },
    { nome: "Jogador X", credito: 80.00 },
    { nome: "Jogador Y", credito: 45.30 },
  ];

  const navegar = (tela) => {
    if (tela === "adicionar") {
      setMostrarPopUp(true);
      let tipo = "";
      if (paginaAtual === "picks") {
        tipo = "personagem";
      } else if (paginaAtual === "vidas") {
        tipo = "jogador";
      } else if (paginaAtual === "banco") {
        tipo = "banco";
      }
      setTipoPopup(tipo);
    } else {
      setPaginaAtual(tela);
    }
  };

  const fecharPopup = () => {
    console.log("Fechando o PopUp");
    setMostrarPopUp(false);
  };

  return (
    <div>
      <Menu paginaAtual={paginaAtual} onBotaoClick={navegar} />
      <div>
        {paginaAtual === "picks" ? (
          <TabelaPick dadosIniciais={dadosPicks} />
        ) : null}
        {paginaAtual === "vidas" ? (
          <TabelaVida dadosIniciais={dadosVidas} />
        ) : null}
        {paginaAtual === "banco" ? (
          <TabelaBanco dadosIniciais={dadosBanco} />
        ) : null}
      </div>
      {mostrarPopUp === true ? (
        <PopUp tipo={tipoPopup} fecharPopUp={fecharPopup} />
      ) : null}
    </div>
  );
}

export default App;

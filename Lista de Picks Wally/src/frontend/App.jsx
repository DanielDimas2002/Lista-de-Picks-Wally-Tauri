import React, { useState, useEffect } from "react";
import Menu from "./componentes/Menu/Menu";
import PopUp from "./componentes/PopUp/PopUp";
import TabelaPick from "./componentes/TabelaPick/TabelaPick";
import TabelaVida from "./componentes/TabelaVida/TabelaVida";
import TabelaBanco from "./componentes/Banco/TabelaBanco";
import "./resetCSS.css";
import "./App.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("picks");
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [tipoPopup, setTipoPopup] = useState("");
  const [dadosPicks, setDadosPicks] = useState([]);
  const [dadosVidas, setDadosVidas] = useState([]);
  const [dadosBanco, setDadosBanco] = useState([]);
// Buscar os picks do backend
const fetchPicks = async () => {
  try {
    const response = await fetch("http://localhost:5000/picks");
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados");
    }
    const data = await response.json();
    setDadosPicks(data);
  } catch (error) {
    console.error("Erro ao buscar os picks:", error);
  }
};

// Buscar os dados de vidas do backend
const fetchVidas = async () => {
  try {
    const response = await fetch("http://localhost:5000/vidas");
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados de vidas");
    }
    const data = await response.json();
    setDadosVidas(data);
  } catch (error) {
    console.error("Erro ao buscar os dados de vidas:", error);
  }
};

// Buscar os dados do banco
const fetchBanco = async () => {
  try {
    const response = await fetch("http://localhost:5000/banco");
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados do banco");
    }
    const data = await response.json();
    setDadosBanco(data);
  } catch (error) {
    console.error("Erro ao buscar os dados do banco:", error);
  }
};

// Chamar as funções ao montar o componente
useEffect(() => {
  fetchPicks();
  fetchVidas();
  fetchBanco();
}, []);

const fecharPopup = async () => {
  console.log("Fechando o PopUp");

  if (tipoPopup === "personagem") {
    await fetchPicks(); // Atualiza apenas os picks
  } else if (tipoPopup === "jogador") {
    await fetchVidas(); // Atualiza apenas os jogadores
  } else if (tipoPopup === "banco") {
    await fetchBanco(); // Atualiza apenas o banco
  }

  setMostrarPopUp(false);
};


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

  return (
    <div>
      <Menu paginaAtual={paginaAtual} onBotaoClick={navegar} />
      <div>
        {paginaAtual === "picks" && <TabelaPick dadosIniciais={dadosPicks} />}
        {paginaAtual === "vidas" && <TabelaVida dadosIniciais={dadosVidas} />}
        {paginaAtual === "banco" && <TabelaBanco dadosIniciais={dadosBanco} />}
      </div>
      {mostrarPopUp && <PopUp tipo={tipoPopup} fecharPopUp={fecharPopup} />}
    </div>
  );
}

export default App;

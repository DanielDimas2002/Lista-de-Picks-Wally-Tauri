import React, {useState} from "react";
import Menu from "./componentes/Menu";
import PopUp from "./componentes/PopUp";
import "./App.css";

function App(){
  const [paginaAtual, setPaginaAtual] = useState("picks");
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [tipoPopup, setTipoPopup] = useState("");

  const navegar = (tela) =>{
    if(tela === "adicionar"){
      setMostrarPopUp(true);
      let tipo = "";
      if (paginaAtual === "picks") {
        tipo = "personagem";
      } else if (paginaAtual === "vidas"){
        tipo = "jogador";
      }else if(paginaAtual === "banco"){
        tipo = "banco";
      }
      setTipoPopup(tipo); 
    }else{
      setPaginaAtual(tela);
    }
  }

  const fecharPopup = () =>{
    setMostrarPopUp(false)
  }

  return(
    <div>
      <Menu paginaAtual = {paginaAtual} onBotaoClick = {navegar}/>
        <div>
          {paginaAtual === "picks" ? <p>Tabela de Picks</p> : null}
          {paginaAtual === "vidas" ? <p>Vidas do Chat</p> : null}
          {paginaAtual === "banco" ? <p>Banco</p> : null}
        </div>
      {mostrarPopUp === true ? <PopUp tipo = {tipoPopup} fecharPopup = {fecharPopup}/> : null}
    </div>
  )
}

export default App;

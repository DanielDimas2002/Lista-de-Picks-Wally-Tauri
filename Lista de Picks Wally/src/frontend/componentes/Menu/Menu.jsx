import React from "react";
import "./Menu.css";


const Menu = ({paginaAtual, onBotaoClick}) => {


    const botoes = {
        picks: [
          { label: "Adicionar", action: "adicionar", destaque: true},
          { label: "Vidas do Chat", action: "vidas" },
          { label: "Banco", action: "banco" },
        ],
        vidas: [
          { label: "Adicionar", action: "adicionar", destaque: true},
          { label: "Picks do Chat", action: "picks" },
          { label: "Banco", action: "banco" },
        ],
        banco: [
          { label: "Adicionar", action: "adicionar", destaque: true },
          { label: "Picks do Chat", action: "picks" },
          { label: "Vidas do Chat", action: "vidas" },
        ],
      };

    return(
        <div className="menu">
            <h1>PICKS DO CHAT</h1>
            <div className="menu-botoes">
                {botoes[paginaAtual]?.map((botao)=>(
                    <button
                    key={botao.action}
                    onClick={() => onBotaoClick(botao.action)}
                    className={botao.destaque ? "botao-adicionar" : ""}
                  >{botao.label}</button>
                ))}
            </div>
        </div>
    );
};

export default Menu;
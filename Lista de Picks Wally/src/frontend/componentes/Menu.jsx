import React from "react";

const Menu = ({paginaAtual, onBotaoClick}) => {
    return(
        <div>
            <h1>PICKS DO CHAT</h1>
            <div>
                <button onClick = {() => onBotaoClick('adicionar')}>Adicionar</button>
                <button onClick = {() => onBotaoClick('vidas')}>Vidas do Chat</button>
                <button onClick = {() => onBotaoClick('banco')}>Banco</button>
            </div>
        </div>
    );
};

export default Menu;
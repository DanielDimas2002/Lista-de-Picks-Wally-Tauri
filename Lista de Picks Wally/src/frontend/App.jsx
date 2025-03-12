// src/App.jsx
import React, { useState } from 'react';
import Menu from './components/Menu';
import Popup from './components/Popup';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('picks');
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [tipoPopup, setTipoPopup] = useState('');

  // Função de navegação que altera a tela exibida
  const navegar = (tela) => {
    setPaginaAtual(tela);
    if (tela === 'adicionar') {
      // Define o tipo de pop-up a ser exibido
      setMostrarPopup(true);
      setTipoPopup(paginaAtual === 'picks' ? 'personagem' : paginaAtual === 'vidas' ? 'jogador' : 'banco');
    }
  };

  const fecharPopup = () => {
    setMostrarPopup(false);
  };

  return (
    <div>
      <Menu paginaAtual={paginaAtual} onBotaoClick={navegar} />
      <div>
        {paginaAtual === 'picks' && <p>Tabela de Picks</p>}
        {paginaAtual === 'vidas' && <p>Vidas do Chat</p>}
        {paginaAtual === 'banco' && <p>Banco</p>}
      </div>
      {mostrarPopup && <Popup tipo={tipoPopup} fecharPopup={fecharPopup} />}
    </div>
  );
}

export default App;

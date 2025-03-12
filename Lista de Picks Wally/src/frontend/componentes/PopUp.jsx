import React, { use, useState } from "react";

const PopUp = ({ tipo, fecharPopup }) => {
    const [nome, setNome] = useState("");
    const [vidas, setVidas] = useState(0);

    // Função para adicionar dados, verificando o tipo
    const adicionar = () => {
        if (tipo === 'personagem' || tipo === 'jogador') {
            // Lógica para adicionar personagem ou jogador
            console.log(`Adicionando ${tipo}: ${nome} com ${valor} vidas`);
        } else if (tipo === 'banco') {
            // Lógica para adicionar ao banco (valor em reais)
            console.log(`Adicionando pessoa no Banco: ${nome} com R$ ${valor}`);
        }
        fecharPopup(); // Fecha o pop-up após adicionar
    };

    return (
        <div>
            <h3>Adicionar {tipo === 'banco' ? 'Pessoa no Banco' : tipo === 'personagem' ? 'Personagem' : 'Jogador'}</h3>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="number"
                placeholder={tipo === 'banco' ? "Valor (R$)" : "Vidas"}
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
            />
            <button onClick={adicionar}>Adicionar</button>
            <button onClick={fecharPopup}>Fechar</button>
        </div>
    )
}

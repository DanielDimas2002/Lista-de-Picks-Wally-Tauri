import React, { useState } from "react";
import LinhaBanco from "./LinhaBanco";
import "./TabelaBanco.css";

const TabelaBanco = ({ dadosIniciais }) => {
    const [dados, setDados] = useState(dadosIniciais);

    const atualizarCredito = (index, novoCredito) => {
        setDados((prevDados) => {
            const novosDados = [...prevDados];
            novosDados[index].credito = novoCredito;
            return novosDados;
        })
    }

    const excluirLinha = (index) => {
        setDados((prevDados) => prevDados.filter((_, i) => i !== index));
    }

    return (
        <div className="tabela">
            <div className="cabecalho">
                <div className="coluna">Nome</div>
                <div className="coluna">Crédito</div>
            </div>

            {dados.map((jogador, index) =>(
                <LinhaBanco
                key = {index}
                index={index}
                nome={jogador.nome}
                credito = {jogador.credito}
                onAtualizarCredito={atualizarCredito}
                onExcluir={excluirLinha}
                />
            ))}
        </div>
    )
} 

export default TabelaBanco
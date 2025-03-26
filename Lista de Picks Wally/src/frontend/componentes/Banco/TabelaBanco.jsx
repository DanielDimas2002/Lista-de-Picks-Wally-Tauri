import React, { useState, useEffect } from "react";
import LinhaBanco from "./LinhaBanco";
import "./TabelaBanco.css";

const TabelaBanco = ({ novoItem }) => {
    const [dadosBanco, setDadosBanco] = useState([]);

    useEffect(() => {
        carregarDados();
    }, []);

    useEffect(() => {
        if (novoItem) {
            setDadosBanco((prevDados) => [...prevDados, novoItem]);
        }
    }, [novoItem]);

    const carregarDados = async () => {
        try {
            const response = await fetch("http://localhost:5000/banco");
            if (!response.ok) {
                throw new Error("Erro ao buscar dados do banco.");
            }
            const data = await response.json();
            setDadosBanco(data);
        } catch (error) {
            console.error("Erro ao carregar os dados do banco:", error);
        }
    };

    const atualizarCredito = async (index, novoCredito) => {
        try {
            const atualizado = [...dadosBanco];
            atualizado[index].valor = novoCredito;
            setDadosBanco(atualizado);

            // Atualizar no backend
            await fetch("http://localhost:5000/banco", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(atualizado[index]),
            });
        } catch (error) {
            console.error("Erro ao atualizar crédito:", error);
        }
    };

    const excluirLinha = async (index) => {
        try {
            const itemExcluido = dadosBanco[index];

            // Atualizar o estado local
            setDadosBanco((prevDados) => prevDados.filter((_, i) => i !== index));

            // Remover do backend
            await fetch(`http://localhost:5000/banco/${itemExcluido.id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error("Erro ao excluir item:", error);
        }
    };

    return (
        <div className="tabela">
            <div className="linha cabecalho">
                <div className="coluna">Nome</div>
                <div className="coluna">Crédito</div>
            </div>
            {dadosBanco.map((item, index) => (
                <LinhaBanco
                    key={item.id}
                    index={index}
                    nome={item.nome}
                    credito={item.valor}
                    onAtualizarCredito={atualizarCredito}
                    onExcluir={excluirLinha}
                />
            ))}
        </div>
    );
};

export default TabelaBanco;

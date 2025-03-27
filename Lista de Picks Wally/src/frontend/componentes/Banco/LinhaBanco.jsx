import React from "react";
import LinhaBanco from "./LinhaBanco";

const TabelaBanco = ({ dadosIniciais }) => {

    const [dadosBanco, setDadosBanco] = useState(dadosIniciais);

    // Atualiza o valor do crédito
    const atualizarCredito = (index, novoValor) => {
        const novosDados = [...dadosBanco];
        novosDados[index].valor = novoValor; // Alteração aqui para usar 'valor' do backend
        setDadosBanco(novosDados);
    };

    // Exclui uma linha
    const excluirLinha = (index) => {
        const novosDados = dadosBanco.filter((_, i) => i !== index);
        setDadosBanco(novosDados);
    };

    return (
        <div>
            {dadosBanco.map((dado, index) => (
                <LinhaBanco
                    key={dado.id}
                    index={index}
                    nome={dado.nome}
                    credito={dado.valor} 
                    onAtualizarCredito={atualizarCredito}
                    onExcluir={excluirLinha}
                />
            ))}
        </div>
    );
};

export default TabelaBanco;

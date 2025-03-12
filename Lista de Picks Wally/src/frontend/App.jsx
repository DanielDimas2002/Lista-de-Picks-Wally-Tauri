import React, { use, useState } from "react";
import { invoke } from "@tauri-apps/api";

function App() {

  const [nome, setNome] = useState("");
  const [vidas, setVidas] = useState(0);
  const [mensagem, setMensage] = useState("")

  const adicionarPersonagem = async () => {
    try {
      const response = await invoke("adicionar_personagem", { nome, vidas });
      setMensage(response);
    } catch (error) {
      console.error("Erro ao adicionar personagem", error);
    }
  }

  return (
    <div>
      
    </div>
  )

}


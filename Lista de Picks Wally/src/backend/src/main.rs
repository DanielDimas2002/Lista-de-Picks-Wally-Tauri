// Importando as dependências necessárias
use tauri::Manager; // Necessário para gerenciar o estado do Tauri e invocar comandos
use serde::{Serialize, Deserialize}; // Para serialização e deserialização de dados
use std::sync::Mutex; // Usado para garantir acesso seguro ao estado compartilhado
use std::collections::HashMap; // Para armazenar os dados dos personagens em um mapa (chave: nome, valor: Personagem)

// Definindo a estrutura 'Personagem', que irá representar os dados de cada personagem
#[derive(Serialize, Deserialize, Clone)] // Derivando Serialize e Deserialize para permitir que Personagem seja convertido para JSON e vice-versa
pub struct Personagem {
    nome: String, // Nome do personagem
    vidas: i32,   // Quantidade de vidas do personagem
}

// Definindo o estado compartilhado da aplicação, que conterá a lista de personagens
#[derive(Default)] // Implementa o Default, permitindo criar uma instância vazia de AppState
struct AppState {
    personagens: Mutex<HashMap<String, Personagem>>, // Usamos Mutex para garantir que o acesso ao HashMap seja seguro entre múltiplas threads
}

// Função principal que inicializa a aplicação Tauri
fn main() {
    tauri::Builder::default()
        .manage(AppState::default()) // Gerenciamos o estado compartilhado da aplicação (AppState)
        .invoke_handler(tauri::generate_handler![adicionar_personagem, editar_personagem, excluir_personagem]) // Registramos os comandos que podem ser invocados pelo frontend
        .run(tauri::generate_context!()) // Inicia a aplicação Tauri com o contexto padrão
        .expect("Erro ao rodar o Tauri"); // Caso aconteça algum erro, mostramos uma mensagem
}

// Comando para adicionar um personagem à lista
#[tauri::command] // A macro #[tauri::command] permite que esta função seja chamada pelo frontend
fn adicionar_personagem(state: tauri::State<AppState>, nome: String, vidas: i32) -> String {
    // Bloqueando o Mutex para garantir acesso seguro ao HashMap de personagens
    let mut personagens = state.personagens.lock().unwrap();

    // Criando o personagem com os dados recebidos
    let personagem = Personagem { nome: nome.clone(), vidas };

    // Adicionando o personagem ao HashMap, com o nome como chave
    personagens.insert(nome.clone(), personagem);

    // Retornando uma mensagem indicando que o personagem foi adicionado com sucesso
    format!("Personagem '{}' adicionado com {} vidas.", nome, vidas)
}

// Comando para editar as vidas de um personagem existente
#[tauri::command]
fn editar_personagem(state: tauri::State<AppState>, nome: String, novas_vidas: i32) -> String {
    // Bloqueando o Mutex para garantir acesso seguro ao HashMap de personagens
    let mut personagens = state.personagens.lock().unwrap();

    // Verificando se o personagem existe no HashMap
    if let Some(personagem) = personagens.get_mut(&nome) {
        // Atualizando o número de vidas do personagem
        personagem.vidas = novas_vidas;
        // Retornando uma mensagem indicando que o personagem foi editado com sucesso
        format!("Personagem '{}' agora tem {} vidas.", nome, novas_vidas)
    } else {
        // Caso o personagem não exista, retornamos uma mensagem de erro
        "Personagem não encontrado.".to_string()
    }
}

// Comando para excluir um personagem da lista
#[tauri::command]
fn excluir_personagem(state: tauri::State<AppState>, nome: String) -> String {
    // Bloqueando o Mutex para garantir acesso seguro ao HashMap de personagens
    let mut personagens = state.personagens.lock().unwrap();

    // Tentando remover o personagem pelo nome
    if personagens.remove(&nome).is_some() {
        // Caso o personagem seja removido com sucesso, retornamos uma mensagem confirmando a exclusão
        format!("Personagem '{}' excluído.", nome)
    } else {
        // Caso o personagem não seja encontrado, retornamos uma mensagem de erro
        "Personagem não encontrado.".to_string()
    }
}

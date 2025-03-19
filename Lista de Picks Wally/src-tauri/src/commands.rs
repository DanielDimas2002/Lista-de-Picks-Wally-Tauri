mod commands;  // Importando o arquivo de comandos

use tauri::Manager;
use std::sync::Mutex;
use std::collections::HashMap;

use crate::data::{carregar_dados, salvar_dados, inicializar_arquivos, Pick, VidaChat, Banco};
use std::io;


#[derive(Default)]
struct AppState {
    personagens: Mutex<HashMap<String, commands::Personagem>>,
}

fn main() {
    tauri::Builder::default()
        .manage(AppState::default())  // Registrando o estado global
        .invoke_handler(tauri::generate_handler![
            commands::adicionar_personagem,
            commands::editar_personagem,
            commands::excluir_personagem
        ])  // Registrando os comandos
        .run(tauri::generate_context!())
        .expect("Erro ao rodar o Tauri");
}

#[tauri::command]
pub fn get_picks() -> Result<Vec<Pick>, String> {
    carregar_dados::<Vec<Pick>>("picks.json").map_err(|e| e.to_string())
}

#[tauri::command]
pub fn set_picks(picks: Vec<Pick>) -> Result<(), String> {
    salvar_dados("picks.json", &picks).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_vidas_chat() -> Result<Vec<VidaChat>, String> {
    carregar_dados::<Vec<VidaChat>>("vidas_chat.json").map_err(|e| e.to_string())
}

#[tauri::command]
pub fn set_vidas_chat(vidas_chat: Vec<VidaChat>) -> Result<(), String> {
    salvar_dados("vidas_chat.json", &vidas_chat).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_banco() -> Result<Vec<Banco>, String> {
    carregar_dados::<Vec<Banco>>("banco.json").map_err(|e| e.to_string())
}

#[tauri::command]
pub fn set_banco(banco: Vec<Banco>) -> Result<(), String> {
    salvar_dados("banco.json", &banco).map_err(|e| e.to_string())
}

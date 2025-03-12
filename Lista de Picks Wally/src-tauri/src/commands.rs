mod commands;  // Importando o arquivo de comandos

use tauri::Manager;
use std::sync::Mutex;
use std::collections::HashMap;

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

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::commands::{get_picks, set_picks, get_vidas_chat, set_vidas_chat, get_banco, set_banco};
use crate::data::inicializar_arquivos;

fn main() {
    // Garante que os arquivos existem antes de rodar
    inicializar_arquivos();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_picks, set_picks,
            get_vidas_chat, set_vidas_chat,
            get_banco, set_banco
        ])
        .run(tauri::generate_context!())
        .expect("Erro ao iniciar o Tauri");
}

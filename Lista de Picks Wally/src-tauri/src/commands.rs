mod commands;  // Importando o arquivo de comandos

use tauri::Manager;
use std::sync::Mutex;
use std::collections::HashMap;

use crate::data::{carregar_dados, salvar_dados, inicializar_arquivos, Pick, VidaChat, Banco};
use std::fs;
use std::io;
use serde::{Deserialize, Serialize};

#[derive(Default)]
struct AppState {
    personagens: Mutex<HashMap<String, commands::Personagem>>,  // Estado global
}

fn main() {
    tauri::Builder::default()
        .manage(AppState::default())  // Registrando o estado global
        .invoke_handler(tauri::generate_handler![  // Registrando comandos
            commands::adicionar_personagem,
            commands::editar_personagem,
            commands::excluir_personagem
        ])
        .run(tauri::generate_context!())
        .expect("Erro ao rodar o Tauri");
}

/// Função para carregar dados a partir de um arquivo JSON
fn carregar_dados<T: for<'de> Deserialize<'de>>(caminho: &str) -> Result<Vec<T>, String> {
    let conteudo = fs::read_to_string(caminho).map_err(|e| e.to_string())?;
    serde_json::from_str(&conteudo).map_err(|e| e.to_string())
}

/// Função para salvar dados em um arquivo JSON
fn salvar_dados<T: Serialize>(caminho: &str, dados: &Vec<T>) -> Result<(), String> {
    let json = serde_json::to_string_pretty(dados).map_err(|e| e.to_string())?;
    fs::write(caminho, json).map_err(|e| e.to_string())
}

/// Comando para obter os picks
#[tauri::command]
pub fn get_picks() -> Result<Vec<Pick>, String> {
    carregar_dados::<Vec<Pick>>("picks.json")
}

/// Comando para salvar os picks
#[tauri::command]
pub fn set_picks(picks: Vec<Pick>) -> Result<(), String> {
    salvar_dados("picks.json", &picks)
}

/// Comando para obter as vidas do chat
#[tauri::command]
pub fn get_vidas_chat() -> Result<Vec<VidaChat>, String> {
    carregar_dados::<Vec<VidaChat>>("vidas_chat.json")
}

/// Comando para salvar as vidas do chat
#[tauri::command]
pub fn set_vidas_chat(vidas_chat: Vec<VidaChat>) -> Result<(), String> {
    salvar_dados("vidas_chat.json", &vidas_chat)
}

/// Comando para obter os dados do banco
#[tauri::command]
pub fn get_banco() -> Result<Vec<Banco>, String> {
    carregar_dados::<Vec<Banco>>("banco.json")
}

/// Comando para salvar os dados do banco
#[tauri::command]
pub fn set_banco(banco: Vec<Banco>) -> Result<(), String> {
    salvar_dados("banco.json", &banco)
}

/// Comando para adicionar um item (personagem, jogador, banco)
#[derive(Serialize, Deserialize)]
struct Item {
    nome: String,
    vidas: Option<i32>,
    valor: Option<f64>,
}

#[tauri::command]
fn adicionar_item(tipo: String, item: Item) -> Result<(), String> {
    let caminho = match tipo.as_str() {
        "personagem" => "backend/picks.json",
        "jogador" => "backend/vidas.json",
        "banco" => "backend/banco.json",
        _ => return Err("Tipo inválido".to_string()),
    };

    let mut dados: Vec<Item> = carregar_dados(&caminho).unwrap_or_else(|_| vec![]);

    // Verificar duplicação do item com base no nome
    if dados.iter().any(|i| i.nome == item.nome) {
        return Err("Item já existe".to_string());
    }

    dados.push(item);
    salvar_dados(&caminho, &dados)
}

/// Comando para editar um item (personagem, jogador, banco)
#[tauri::command]
fn editar_item(tipo: String, nome: String, novo_item: Item) -> Result<(), String> {
    let caminho = match tipo.as_str() {
        "personagem" => "backend/picks.json",
        "jogador" => "backend/vidas.json",
        "banco" => "backend/banco.json",
        _ => return Err("Tipo inválido".to_string()),
    };

    let mut dados: Vec<Item> = carregar_dados(&caminho).unwrap_or_else(|_| vec![]);

    // Encontra e modifica o item correspondente
    if let Some(item) = dados.iter_mut().find(|i| i.nome == nome) {
        item.vidas = novo_item.vidas;
        item.valor = novo_item.valor;
        salvar_dados(&caminho, &dados)?;
        Ok(())
    } else {
        Err("Item não encontrado".to_string())
    }
}

/// Comando para excluir um item (personagem, jogador, banco)
#[tauri::command]
fn excluir_item(tipo: String, nome: String) -> Result<(), String> {
    let caminho = match tipo.as_str() {
        "personagem" => "backend/picks.json",
        "jogador" => "backend/vidas.json",
        "banco" => "backend/banco.json",
        _ => return Err("Tipo inválido".to_string()),
    };

    let mut dados: Vec<Item> = carregar_dados(&caminho).unwrap_or_else(|_| vec![]);

    // Filtra o item a ser excluído
    dados.retain(|item| item.nome != nome);

    salvar_dados(&caminho, &dados)
}

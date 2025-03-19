use serde::{Deserialize, Serialize};
use std::fs;
use std::io::{self, Write};
use std::path::Path;

const PASTA_BACKEND: &str = "src/backend/";
const PICKS_JSON: &str = "src/backend/picks.json";
const VIDAS_JSON: &str = "src/backend/vidas.json";
const BANCO_JSON: &str = "src/backend/banco.json";

/// Representação dos dados de um pick
#[derive(Serialize, Deserialize, Debug)]
pub struct Pick {
    pub nome: String,
    pub vidas: u32,
}

/// Representação dos dados de um jogador na tabela de vidas
#[derive(Serialize, Deserialize, Debug)]
pub struct Vida {
    pub nome: String,
    pub vida: u32,
    pub vitorias: u32,
    pub derrotas: u32,
    pub total_vidas: u32,
}

/// Representação dos dados do banco
#[derive(Serialize, Deserialize, Debug)]
pub struct Banco {
    pub nome: String,
    pub credito: f64,
}

/// Função genérica para ler um arquivo JSON e desserializar os dados
fn ler_arquivo<T: for<'de> Deserialize<'de>>(caminho: &str) -> io::Result<Vec<T>> {
    if !Path::new(caminho).exists() {
        fs::write(caminho, "[]")?; // Cria o arquivo com um array vazio
    }

    let conteudo = fs::read_to_string(caminho)?;
    let dados: Vec<T> = serde_json::from_str(&conteudo).unwrap_or_else(|_| vec![]);
    Ok(dados)
}

/// Função genérica para escrever um vetor de dados em um arquivo JSON
fn escrever_arquivo<T: Serialize>(caminho: &str, dados: &Vec<T>) -> io::Result<()> {
    let json = serde_json::to_string_pretty(dados)?;
    let mut arquivo = fs::File::create(caminho)?;
    arquivo.write_all(json.as_bytes())?;
    Ok(())
}

/// Lê os picks do arquivo JSON
pub fn ler_picks() -> io::Result<Vec<Pick>> {
    ler_arquivo(PICKS_JSON)
}

/// Salva os picks no arquivo JSON
pub fn salvar_picks(picks: &Vec<Pick>) -> io::Result<()> {
    escrever_arquivo(PICKS_JSON, picks)
}

/// Lê as vidas do arquivo JSON
pub fn ler_vidas() -> io::Result<Vec<Vida>> {
    ler_arquivo(VIDAS_JSON)
}

/// Salva as vidas no arquivo JSON
pub fn salvar_vidas(vidas: &Vec<Vida>) -> io::Result<()> {
    escrever_arquivo(VIDAS_JSON, vidas)
}

/// Lê os dados do banco do arquivo JSON
pub fn ler_banco() -> io::Result<Vec<Banco>> {
    ler_arquivo(BANCO_JSON)
}

/// Salva os dados do banco no arquivo JSON
pub fn salvar_banco(banco: &Vec<Banco>) -> io::Result<()> {
    escrever_arquivo(BANCO_JSON, banco)
}

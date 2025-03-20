use serde::{Deserialize, Serialize};
use std::fs;
use std::io::{self, Write};
use std::path::Path;

const PASTA_BACKEND: &str = "src/backend/";
const PICKS_JSON: &str = "src/backend/picks.json";
const VIDAS_JSON: &str = "src/backend/vidas.json";
const BANCO_JSON: &str = "src/backend/banco.json";

/// Representação dos dados de um pick
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct Pick {
    pub nome: String,
    pub vidas: u32,
}

/// Representação dos dados de um jogador na tabela de vidas
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct Vida {
    pub nome: String,
    pub vida: u32,
    pub vitorias: u32,
    pub derrotas: u32,
    pub total_vidas: u32,
}

/// Representação dos dados do banco
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
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

/// Função para adicionar um pick, garantindo que não haja duplicação pelo nome
pub fn adicionar_pick(pick: Pick) -> io::Result<()> {
    let mut picks = ler_picks()?;
    
    // Verificar se já existe um pick com o mesmo nome
    if picks.contains(&pick) {
        return Err(io::Error::new(io::ErrorKind::AlreadyExists, "Pick já existe"));
    }
    
    picks.push(pick);
    salvar_picks(&picks)
}

/// Função para editar um pick
pub fn editar_pick(nome: String, novo_pick: Pick) -> io::Result<()> {
    let mut picks = ler_picks()?;
    
    // Encontra o pick e edita
    if let Some(pick) = picks.iter_mut().find(|p| p.nome == nome) {
        pick.vidas = novo_pick.vidas;  // Atualiza a quantidade de vidas
        salvar_picks(&picks)?;
        Ok(())
    } else {
        Err(io::Error::new(io::ErrorKind::NotFound, "Pick não encontrado"))
    }
}

/// Função para excluir um pick
pub fn excluir_pick(nome: String) -> io::Result<()> {
    let mut picks = ler_picks()?;
    
    // Remove o pick pelo nome
    picks.retain(|p| p.nome != nome);
    
    salvar_picks(&picks)
}

/// Função para adicionar um jogador na tabela de vidas, sem duplicação
pub fn adicionar_vida(vida: Vida) -> io::Result<()> {
    let mut vidas = ler_vidas()?;
    
    // Verifica se já existe o jogador
    if vidas.iter().any(|v| v.nome == vida.nome) {
        return Err(io::Error::new(io::ErrorKind::AlreadyExists, "Jogador já existe"));
    }
    
    vidas.push(vida);
    salvar_vidas(&vidas)
}

/// Função para editar um jogador na tabela de vidas
pub fn editar_vida(nome: String, nova_vida: Vida) -> io::Result<()> {
    let mut vidas = ler_vidas()?;
    
    // Encontra o jogador e edita
    if let Some(vida) = vidas.iter_mut().find(|v| v.nome == nome) {
        vida.vida = nova_vida.vida;
        vida.vitorias = nova_vida.vitorias;
        vida.derrotas = nova_vida.derrotas;
        vida.total_vidas = nova_vida.total_vidas;
        salvar_vidas(&vidas)?;
        Ok(())
    } else {
        Err(io::Error::new(io::ErrorKind::NotFound, "Jogador não encontrado"))
    }
}

/// Função para excluir um jogador da tabela de vidas
pub fn excluir_vida(nome: String) -> io::Result<()> {
    let mut vidas = ler_vidas()?;
    
    // Remove o jogador pelo nome
    vidas.retain(|v| v.nome != nome);
    
    salvar_vidas(&vidas)
}

/// Função para adicionar um crédito no banco, sem duplicação
pub fn adicionar_credito(banco: Banco) -> io::Result<()> {
    let mut dados_banco = ler_banco()?;
    
    // Verifica se já existe um banco com o mesmo nome
    if dados_banco.iter().any(|b| b.nome == banco.nome) {
        return Err(io::Error::new(io::ErrorKind::AlreadyExists, "Banco já existe"));
    }
    
    dados_banco.push(banco);
    salvar_banco(&dados_banco)
}

/// Função para editar um crédito no banco
pub fn editar_credito(nome: String, novo_credito: Banco) -> io::Result<()> {
    let mut dados_banco = ler_banco()?;
    
    // Encontra e edita o banco
    if let Some(banco) = dados_banco.iter_mut().find(|b| b.nome == nome) {
        banco.credito = novo_credito.credito;
        salvar_banco(&dados_banco)?;
        Ok(())
    } else {
        Err(io::Error::new(io::ErrorKind::NotFound, "Banco não encontrado"))
    }
}

/// Função para excluir um crédito no banco
pub fn excluir_credito(nome: String) -> io::Result<()> {
    let mut dados_banco = ler_banco()?;
    
    // Remove o banco pelo nome
    dados_banco.retain(|b| b.nome != nome);
    
    salvar_banco(&dados_banco)
}

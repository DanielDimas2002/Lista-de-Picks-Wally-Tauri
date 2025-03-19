import {invoke} from "@tauri-apps/api/tauri"

export async function getPicks(){
    try{
        return await invoke("get_picks");
    } catch (error){
        console.error("Erro ao buscar Picks", error);
        return[];
    }
}

export async function setPicks(picks) {
    try{
        await invoke("set_picks", {picks});
    } catch (error){
        console.error("Erro ao salvar Picks:", error)
    }
}

export async function getVidasChat(){
    try{
        return await invoke("get_vidas_chat");
    } catch (error) {
        console.error("Erro ao buscar Vidas do Chat:", error);
        return[];
    }
}

export async function getBanco(){
    try{
        return await invoke("get_banco")
    } catch(error){
        console.error("Erro ao bsucar Banco:", error);
        return [];
    }
}

export async function setBanco(banco){
    try{
        await invoke("set_banco", {banco})
    } catch (error) {
        console.error("Erro ao salvar Banco", error)
    }
}
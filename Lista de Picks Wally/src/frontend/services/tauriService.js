// src/frontend/services/tauriService.js

export const invokeTauriCommand = async (command, params) => {
    if (window.__TAURI__) {
      try {
        const { invoke } = require('@tauri-apps/api/tauri');
        const response = await invoke(command, params);
        return response;
      } catch (error) {
        console.error("Erro ao invocar comando Tauri:", error);
      }
    } else {
      console.warn("Tauri não está disponível no ambiente atual.");
    }
  };
  
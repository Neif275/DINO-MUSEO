import { createContext, useContext } from 'react';

// Valores por defecto: sin sesion. Los usa cualquier componente que este fuera del AuthProvider
export const AuthContext = createContext({
    usuario: null,
    verificando: false,
    login: async () => {},
    registrar: async () => {},
    logout: () => {},
    tieneRol: () => false,
});

// Hook para leer la sesion desde cualquier componente: const { usuario, logout } = useAuth();
export function useAuth() {
    return useContext(AuthContext);
}

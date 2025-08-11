import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosHeaders } from 'axios';

const useProdAPI = false;

// Créer une instance d'Axios avec des paramètres par défaut
const myAxios: AxiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === "production" || useProdAPI
            ? "https://green-quest.nexford.fr/api"
            : "http://localhost:3000/api",
    timeout: 10000, // Temps d'attente maximal pour une requête
});
console.log(myAxios);

// Intercepteur pour les requêtes
myAxios.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
    const headers = new AxiosHeaders({
        'Content-Type': 'application/json',
    });

    return {
        ...config,
        withCredentials: true,
        headers,
    };
},
    (error: any) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour les réponses (gestion des erreurs)
myAxios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        let errorMessage = "Erreur lors de la communication avec le serveur.";
        if (error.response?.data) {
            errorMessage = error.response.data;
        }

        errorMessage ||= "Aucune réponse du serveur";

        console.error("Erreur API :", errorMessage);

        return Promise.reject(error);
    }
);

export default myAxios;

const API_BASE_URL = import.meta.env.VITE_API_URL

/**
 * Realiza una solicitud a la API y devuelve los datos.
 * @param {string} url - La ruta de la API a la que se realizará la solicitud.
 * @param {string} method - El método HTTP de la solicitud (por defecto 'GET').
 * @param {object} data - Los datos a enviar en el cuerpo de la solicitud (para POST y PUT).
 * @param {string} token - El token JWT para autorización (opcional).
 * @returns {Promise} Una promesa que resuelve en los datos de la respuesta de la API.
 * @throws {Error} Si se produce un error en la solicitud.
 */
export const fetchDataFromAPI =
    async (url, method = 'GET',
        token = '112e4fb5c9dc55f51d1b790445f19a293651ac22c8119e8b3c61a9ab902b4598222f7c3a65b1fd923717a2de91e78152f11e73af5f46e1150b7d180a379b4f58c4dce100c08dbc2d52086845a4550c6e569931b973b1e7378838cc5a40d959acb766d7befe21467b8d7e54ed02aba45916709850660108532ff82de2bd47a203',
        data = null) => {
        try {
            if (!url || typeof url !== 'string') throw new Error('La URL no es válida.')

            const headers = { 'Content-Type': 'application/json', }

            if (token) headers['Authorization'] = `Bearer ${token}`

            const requestOptions = { method, headers, }

            if (data) requestOptions.body = JSON.stringify(data)

            const response = await fetch(API_BASE_URL + url, requestOptions)

            const errorList = {
                'Bad Request': () => { throw new Error('Bad Request') },
                Unauthorized: () => window.location.href = `./unauthorized`,
                Forbidden: () => window.location.href = `./unauthorized`,
                'Not Found': () => { },
                'Internal Server Error': () => { },
                "Failed to fetch": () => { alert('No hay conexión con el servidor') }
            }

            if (!response.ok)
                if (errorList[response.statusText]) errorList[response.statusText]()
                else throw new Error(response.statusText)

            const responseData = await response.json()
            return responseData
        } catch (error) { alert(error.message) }
    }
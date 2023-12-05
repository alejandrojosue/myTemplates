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
    async (url, method = 'GET', data = null) => {
        const token = 'd2dea4119266c82c9576470edc68f993cf582816b45a7f2cd5c63f3bff14198af369ccf8f3544c5d138bdc6f95d06c052b3e93657e64f8601528a6451662f1cfeee0bf2c784b6ae1bbb1d5e557ed68c0cb49bb0222c2103721e52f465c8a78066042d060b6d615bfdba43b0e8c7185fb595612d3a27551cdd2dc3676568679b9'
        try {
            if (!url || typeof url !== 'string') throw new Error('La URL no es válida.')

            const headers = { 'Content-Type': 'application/json', }

            if (token) headers['Authorization'] = `Bearer ${token}`

            const requestOptions = { method, headers, }

            if (data) requestOptions.body = JSON.stringify(data)

            const response = await fetch(API_BASE_URL + url, requestOptions)

            const errorList = {
                'Bad Request': () => { throw new Error('Bad Request') },
                Unauthorized: () => window.location.href = `#/unauthorized`,
                Forbidden: () => window.location.href = `#/unauthorized`,
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
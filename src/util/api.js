const API_BASE_URL = 'https://tiendamuebles.onrender.com/api/';

/**
 * Realiza una solicitud a la API y devuelve los datos.
 * @param {string} url - La ruta de la API a la que se realizará la solicitud.
 * @param {string} method - El método HTTP de la solicitud (por defecto 'GET').
 * @param {object} data - Los datos a enviar en el cuerpo de la solicitud (para POST y PUT).
 * @param {string} token - El token JWT para autorización (opcional).
 * @returns {Promise} Una promesa que resuelve en los datos de la respuesta de la API.
 * @throws {Error} Si se produce un error en la solicitud.
 */
export const fetchDataFromAPI = async (url, method = 'GET', token = null, data = null) => {

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
        }

        if (!response.ok)
            if (errorList[response.statusText]) errorList[response.statusText]()
            else throw new Error(response.statusText)

        const responseData = await response.json()
        return responseData
    } catch (error) { throw new Error(error.message) }
}
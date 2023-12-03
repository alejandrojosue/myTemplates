import { useEffect, useState } from "react"
import { fetchDataFromAPI } from "../util/api"
const useFetch = (_endpoint, _method = 'GET', _data = null) => {
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [endpoint, setEndpoint] = useState(_endpoint)

    useEffect(() => {
        makeApiCall()
    }, [endpoint])

    const handleEndpoint = (endpoint) => setEndpoint(endpoint)

    const makeApiCall = async () => {
        setLoading(true)
        const { data, meta } = await fetchDataFromAPI(endpoint, _method, '112e4fb5c9dc55f51d1b790445f19a293651ac22c8119e8b3c61a9ab902b4598222f7c3a65b1fd923717a2de91e78152f11e73af5f46e1150b7d180a379b4f58c4dce100c08dbc2d52086845a4550c6e569931b973b1e7378838cc5a40d959acb766d7befe21467b8d7e54ed02aba45916709850660108532ff82de2bd47a203', _data)
            .catch(err => setError(err))
            .finally(() => setLoading(false))
        setData(data)
        setMeta(meta)
    }

    return { data, meta, loading, error, handleEndpoint }
}
export default useFetch

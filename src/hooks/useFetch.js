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
        const response = await fetchDataFromAPI(endpoint, _method, _data)
            .catch(err => setError(err))
            .finally(() => setLoading(false))
        if (response.data)
            setData(response.data)
        else setData(response)
        if (response.meta)
            setMeta(response.meta)
    }

    return { data, meta, loading, error, handleEndpoint }
}
export default useFetch

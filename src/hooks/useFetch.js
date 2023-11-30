import { useEffect, useState } from "react"
import { fetchDataFromAPI } from "../util/api"
const useFetch = (_endpoint) => {
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({})
    const [loading, setLoading] = useState(true)
    const [endpoint, setEndpoint] = useState(_endpoint)

    useEffect(() => {
        makeApiCall()
    }, [endpoint])

    const handleEndpoint = (endpoint) => setEndpoint(endpoint)

    const makeApiCall = async () => {
        setLoading(true)
        const { data, meta } = await fetchDataFromAPI(endpoint)
            .catch(err => setLoading(false))
        setData(data)
        setMeta(meta)
        setLoading(false)
    }

    return { data, meta, loading, handleEndpoint }
}
export default useFetch

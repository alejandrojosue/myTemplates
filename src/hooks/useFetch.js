import { useEffect, useState } from "react"
import { fetchDataFromAPI } from "../util/api"
const useFetch = (endpoint) => {
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        makeApiCall()
    }, [endpoint])

    const makeApiCall = async () => {
        const { data, meta } = await fetchDataFromAPI(endpoint)
        setData(data)
        setMeta(meta)
        setLoading(false)
    }

    return { data, meta, loading }
}
export default useFetch

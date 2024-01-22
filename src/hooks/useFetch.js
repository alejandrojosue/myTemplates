import { useEffect, useState } from 'react'
import { fetchDataFromAPI } from '../util/api'
const useFetch = (_endpoint, _method = 'GET', _data = null) => {
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [endpoint, setEndpoint] = useState(_endpoint)
    const [method, setMethod] = useState(_method)
    const [sendData, setSendData] = useState(_data)

    useEffect(() => {
        makeApiCall()
        // eslint-disable-next-line
    }, [endpoint])

    const handleEndpoint = (endpoint) => setEndpoint(endpoint)
    const handleMethod = (method) => setMethod(method)
    const handleSendData = (data) => setSendData(data)

    const makeApiCall = async () => {
        setLoading(true)
        const response = await fetchDataFromAPI(endpoint, method, sendData)
            .catch(err => setError(err))
            .finally(() => setLoading(false))
        if (response?.data)
            setData(response.data)
        else setData(response)
        if (response?.meta)
            setMeta(response.meta)
    }

    return {
        data, meta, loading, error,
        handleEndpoint,
        handleMethod,
        handleSendData,
    }
}
export default useFetch

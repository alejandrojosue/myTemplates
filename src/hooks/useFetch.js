import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../util/api";
const useFetch = (endpoint) => {
    const [data, setData] = useState();

    useEffect(() => {
        makeApiCall();
    }, [endpoint]);

    const makeApiCall = async () => {
        const res = await fetchDataFromAPI(endpoint);
        setData(res.data);
    };

    return { data };
};
export default useFetch;

const deleteDuplicate = (arr, key) => {
    const seen = new Set();
    return arr.filter(obj => {
        const keyValue = key ? obj[key] : JSON.stringify(obj);
        return seen.has(keyValue) ? false : seen.add(keyValue);
    });
}

export default deleteDuplicate
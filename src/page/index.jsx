import DatatableSale from "../components/datatable/DatatableSale"

const Index = () => {
    // const { data, meta, loading } =  useFetch(`ventas?populate=detalleVentas&pagination[pageSize]=${rowsPerPage}&pagination[page]=${page + 1}`);

    return (<>
        <DatatableSale />
    </>)
}

export default Index
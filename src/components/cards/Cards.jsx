import './cards.scss'
// import Card from './Card'
// import { categoryMapper } from '../../mapper/mapper'
import useFetch from '../../hooks/useFetch'
// import CardLoading from './CardLoading'
const Cards = () => {
    // eslint-disable-next-line 
    const { data, meta, loading } = useFetch('categories')
    document.title = 'Cards'
    return (
        <div className="row p-2">
            {/* {loading
                ? <CardLoading />
                : categoryMapper(data)?.map(({ name, description }, index) =>
                (<Card key={index} title={name}
                    description={description} />))} */}
        </div>
    )
}

export default Cards
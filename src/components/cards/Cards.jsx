import './cards.scss'
import Card from './Card'
import { categoryMaper } from '../../maper/maper'
import useFetch from '../../hooks/useFetch'
const Cards = () => {
    const { data } = useFetch('categories')
    return (
        <div className="container">
            {categoryMaper(data)?.map(({ name, description }, index) =>
            (<Card key={index} title={name}
                description={description} />))}
        </div>
    )
}

export default Cards
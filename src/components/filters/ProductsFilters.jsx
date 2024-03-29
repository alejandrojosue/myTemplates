import { useEffect } from 'react';
import useSubcategoryService from '../../hooks/useSubcategoryService'
// eslint-disable-next-line 
const ProductsFilters = ({ handleProducts }) => {
    const { subcategories, categories, getAll, handleSubcategoriesList } = useSubcategoryService();
    useEffect(() => {
        getAll()
        handleSubcategoriesList('none')
        // eslint-disable-next-line 
    }, [])
    return (
        <div className='col-12 col-sm-12 col-lg-5'>
            <div className="filters row">
                <div className="col-12 col-sm-6 col-lg-6">
                    <label className="form-label text-secondary">Categorías:</label>
                    <select key={'categories'} name="categoria" className='selectCategory w-100' id="categoria" onChange={(e) => handleSubcategoriesList(e.target.value)}>
                        <option key={'none1'} value="none">Seleccione una Categoria</option>
                        {
                            categories.map(data => (
                                <option key={data.name + '-categories'} value={data.name}>
                                    {data.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-12 col-sm-6 col-lg-6">
                    <label className="form-label text-secondary">Subcategorías:</label>
                    <select key={'subcategories'} name="subcategoria" className='selectSubcategory w-100' id="subcategoria" onChange={e => {
                        if (e.target.value !== 'none')
                            handleProducts(parseInt((e.target.value).trim()))
                    }}>
                        <option key={'none-subcategories'} value="none">Seleccione una Subcategoría</option>
                        {
                            subcategories.map(data => (
                                <option key={data.id + '-subcategories'} value={data.id}>
                                    {data.nombre}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div >
    )
}

export default ProductsFilters
import Category from "../models/Category"
import { fetchDataFromAPI } from "../util/api"

export default class CategoryRepository {
    async get() {
        const { data, meta } = await fetchDataFromAPI('categories')
        const values = data.map(value => (
            new Category(
                value.attributes?.Name,
                value.attributes?.Description
            )
        ))

        const { pagination } = meta
        return { values, pagination }
    }
}
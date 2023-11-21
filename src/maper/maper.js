import Category from "../models/Category"

const categoryMaper = (data) => {
    try {
        return data?.map(value => (
            new Category(
                value.attributes?.Name,
                value.attributes?.Description
            )
        ))
    } catch (error) {
        console.error(error)
    }
}

export {
    categoryMaper
}
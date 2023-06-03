type PartialProduct = { model: string, brand: string }
type FPresentProduct<T extends PartialProduct> = (product: T) => T

function presentFor<T extends PartialProduct>(category: string): FPresentProduct<T> {
    return (product: T) => {
        let presenter: T
        presenter = Object.assign({}, product)
        presenter.model = presenter.model.replace(category, "").trim()
        return presenter
    }
}

const samsungCategories: string[] = [
    "Note",
    "Z",
]

export function groupProductsByCategories<T extends PartialProduct>(
    products: Array<T>,
): Record<string, Array<T>>{
    if (products.length === 0)
        return {}
    let grouped: Record<string, Array<T>> = {}
    for (let product of products) {
        if (product.brand !== "Samsung")
            continue
        for (let category of samsungCategories) {
            const categoryProducts = products
                .filter(product => product.model.includes(category))
            if (categoryProducts.length !== 0) {
                grouped[category] = categoryProducts.map(presentFor(category))
            }
        }
    }
    return grouped
}

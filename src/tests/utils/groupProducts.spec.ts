import {groupProductsByCategories} from "@/utils/groupProducts";

describe("Samsung grouping", () => {

    test("one product product and two series with one matching", () => {
        const products = [
            { product: "Samsung", model: "Note 9", _id: "24" },
        ]
        const grouped = groupProductsByCategories(products)
        expect(grouped).toEqual({
            "Note": [
                { product: "Samsung", model: "9", _id: "24" }
            ],
        })
    })

    test("several variantGroups and several categories all matching", () => {
        const products = [
            { product: "Samsung", model: "Note 9", _id: "24" },
            { product: "Samsung", model: "Z Flip", _id: "234" },
            { product: "Samsung", model: "Note 8", _id: "25" },
        ]
        const grouped = groupProductsByCategories(products)
        expect(grouped).toEqual({
            "Note": [
                { product: "Samsung", model: "9", _id: "24" },
                { product: "Samsung", model: "8", _id: "25" },
            ],
            "Z": [
                { product: "Samsung", model: "Flip", _id: "234" }
            ],
        })
    })

})

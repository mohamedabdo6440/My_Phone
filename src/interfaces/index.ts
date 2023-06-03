export interface TVariantGroup {
    id: string
    model: string
    brand: string
    imageUrl: string
    carrier: string[]
    condition: string[]
    storage: string[]
    color: string[]
    price?: number
    metaData?: string
}


export interface TCompany {
    company: string | undefined
    id: string
    url: string
    name: string
    imageUrl: string
}

export interface TProduct {
    id: string
    url: string
    company: string
    name: string
    imageUrl: string
}

export interface TOrders {
    next : string | null
    previous : string | null
    count : number
    results:[
        {
        url: string
        price: string
        lines: [
            {
                url: string
                id:string
                str:string
                sub_total:string
                is_deleted:string
                quantity:string
                model_variant:string
                order:string
                variantInfo:{
                    id:number
                    info:{
                        storage:string
                        state:string
                        carrier:String
                        color:String
                    }
                }
                modelInfo:{
                    str:string
                    seriesInfo:{
                        name:string
                    }
                }
            }

        ]
        id:string
        str:string
        type:string
        status:string
        customer:string | null
    }
]
 
}

export interface product{
    lines: any[]; 
    type: string; 
    status: string; 
    id: any;
}

export interface productDetails{
    id: React.Key | null | undefined; 
    modelInfo: { seriesInfo: 
        { name: string};
         str: string 
        }; variantInfo: 
        { info: 
            { 
                color: string  
            }; 
        }; 
            sub_total:  number  
}

export interface TSpecifcOrder {
    customer: string
    id: string
    origin: string
    price: string
    status: string
    type: string
    lines: [
        {
    id: string
    quantity:number
    sub_total:number
    modelInfo:{
        str:string
        imageUrl:string
        id:number
        name:string
        seriesInfo:{
            name:string
        }
    }
    variantInfo:{
        price:number
        info:{
            carrier:string
            color:string
            state:string
            storage:string
        }
    }
            
        }
    ]
    reference:string
    includes:any
    detail:string
}




export interface TCarier {
    info:{
        carrier:string
        color:string
        storage:string
        state:string
        condition:string
    }
 
    price:string
    id: string
}


export interface TSeries {
    id: string
    url: string
    product: string
    name: string
    imageUrl: string
}

export interface TModel {
    id: string
    series: string
    name: string
    imageUrl: string
    url : string
    str : string
    sold_out:boolean
    full_name:string
}

export interface TSearchData{
    count: number,
    next: string,
    previous : string,
    results:[
        {
            url: string,
            id: number,
            str: string,
            company: string,
            model:string,
            series: string,
            product: string,
            variantInfo: {
                storage: string,
                carrier: string,
                color: string
            },
            imageUrl:string
            is_deleted: string | null,
            deleted_by_cascade: boolean,
            price: {
                buy:number,
                sell:number
            },
        }

    ]
}

export interface IOrderProducts {
    product: {
        _id: string
        model: string
        brand: string
        imageUrl: string
        carrier: string
        condition: string
        storage: string
        color: string
        price?: number
        metaData?: string
    }
    qty: number
}

export interface TUserInput {
    email: string
    first_name: string
    last_name: string
    birth_date: string
    phone: number 
    gender: string
    address: string
    city: string
    id:number
    detail : string
}

export interface TAddressInput {
    city: string
    country: string
    fName: string,
    lName: string,
    company: string,
    address1: string,
    address2: string,
    state: string,
    postCode : number,
    phoneNumber: string,
    customer: string
}

export interface TAddress extends TAddressInput {
    _id: string
}

export interface TUser extends TUserInput {
    password: string
}

export interface TOrder {
    _id: string
    productIds: IOrderProducts[]
    userId: TUser
    type: string
    date: string
    status: string
    carrier: string
    amount: number
    paymentProcessor: string
    paymentIdentifier: string
    shippingProvider: string
    createdAt: string
    updatedAt: string
}

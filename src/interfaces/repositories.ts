import {
    TAddress,
    TAddressInput,
    TProduct,
    TOrder,
    TVariantGroup,
    TUser,
    TUserInput, TSeries, TModel, TCarier, TCompany,TOrders,TSpecifcOrder,TSearchData
} from '@/interfaces/index'


export interface TUserRepository {
    getCurrentUserProfile: () => Promise<TUser | undefined>
    editCurrentUserProfile: (payload: TUserInput , e:any) => Promise<any>
    resetPw: (payload:TUserInput) => Promise<boolean>
}

export interface TAddressRepository {
    getCurrentUserAddresses: () => Promise<any>
    getSpecifcAddresses: (id:any) => Promise<any>
    createAddress: (payload: TAddressInput) => Promise<any>
    updateAddress: (id:any , payload:any) => Promise<any>
    deleteAddress: (addressId: string) => Promise<boolean>
}

export interface TDeviceRepository {
    getCategories(): any
    getDeviceRepairs(e:any): any
    getCompanies: () => Promise<TProduct[]>
    getProducts: (e: string) => Promise<TCompany[]>
    getSeries: (e:string) => Promise<TSeries[]>
    getModels: (e:string) => Promise<TModel[]>
    getVariantGroups: () => Promise<TVariantGroup[]>
    getModelData: (e:any)=>Promise<TCarier[]>
    getOrders: () => Promise<TOrders[]>
    getSpecifcOrder: (e:any) =>Promise<TSpecifcOrder[]>
    serachData:(e:any) =>Promise<TSearchData[]>
}

export interface TOrderRepository {
    getUserOrders: () => Promise<TOrder[]>
    getOrderById: (id: string) => Promise<TOrder | undefined>
    updateOrderByIdentifier: (id: string, status: string) => Promise<TOrder | undefined>
    addOrder(
        type:any  , quantity:number , url:any
    ): Promise<any>
    addRepairOrder(url:any):Promise<any>
    notACustomer:(email:string , first_name:string , last_name:string , phone:string)=>Promise<any>
    getCartItems:()=>Promise<any>
    getCart:()=>Promise<any>
    createCart:(e:string , i:string)=>Promise<any>
    confirmOrder:()=>Promise<any>
    deleteItem:(e:number)=>Promise<any>
    SchudleConfirmation:(time:any , date:any)=>Promise<any>
    collectionConfirmation:(collection:any)=>Promise<any>
    deleteItems:(collection:any)=>Promise<any>
    confirmAddress:(address:any , cart:any)=>Promise<any>
}

export interface TRepositories {
    type: "production" | "development" | "test"
    order: TOrderRepository
    device: TDeviceRepository
    user: TUserRepository
    address: TAddressRepository
}

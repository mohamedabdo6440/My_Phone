import axios from '@/lib/axios'
import {
    TAddress,
    TAddressInput,
    TProduct,
    TOrder,
    TVariantGroup,
    TUser,
    TUserInput, TSeries, TModel, TCompany,
} from '@/interfaces'
import {
    TAddressRepository,
    TOrderRepository,
    TDeviceRepository,
    TUserRepository,
} from '@/interfaces/repositories'
import Cookies from 'universal-cookie'

const cookie = new Cookies()


export const axiosUserRepository: TUserRepository = {
    async getCurrentUserProfile() {
        const rep = await axios.get<TUser>('me' , {
            headers:{
                Authorization : `Bearer ${cookie.get('token')}` 
            }
        })
        return rep.data
    },
    async editCurrentUserProfile(e:any , payload: TUserInput ) {
        const rep = await axios.patch(e,{
            'email': payload.email,
            'first_name': payload.first_name,
            'last_name': payload.last_name,
            'phone': payload.phone,
            'birth_date': payload.birth_date,
            'gender': payload.gender,
        } ,{
            headers:{
                Authorization : `Bearer ${cookie.get('token')}` 
            },
        })
        return rep
    },
    async  resetPw(payload:any) {
        const rep = await axios.post('/request-reset-email/',{ 
            "email" :  payload
        } ,{
            headers:{
                Authorization : `Bearer ${cookie.get('token')}` 
            },
        })
        return rep.data
    }
}

// function refine(data: any) {
//     for (const object of data) {
//         if (object.hasOwnProperty('url'))
//             // Django REST Framework hyperlink serializers
//             // are using full URLs instead of IDs...
//             object.id = object.url
//     }
//     return data
// }

export const axiosDeviceRepository: TDeviceRepository = {
    async getCompanies() {
        const rep = await axios.get('/device/companies?nopagination')
        return rep.data
    },
    async getProducts(e: string) {
        const rep = await axios.get<TCompany[]>(`${e}/products`)
        return rep.data
    },
    async getSeries(e: string) {
        const rep = await axios.get<TSeries[]>(`${e}/series`)
        return rep.data
    },
    async getModels(e: string) {
        const rep = await axios.get<TModel[]>(`${e}/models`)
        return rep.data
    },
    async getVariantGroups() {
        const rep = await axios.get<TVariantGroup[]>('/device/products?nopagination')
        return rep.data
    },
    async getModelData(e: any) {
        const rep = await axios.get(`${e}`)
        return rep.data
    },
    async getOrders() {
        const rep = await axios.get(`/orders`)
        return rep.data
    },
    async getSpecifcOrder(e: any) {
        const rep = await axios.get(`/orders/${e}`)
        return rep.data
    },
    async serachData(e) {
        const rep = await axios.get(`/device/models-variants/search?search=${e}`)
        return rep.data
    },
    async getDeviceRepairs(e:any) {
        const rep = await axios.get(`${e}/repairs`)
        return rep.data
    },
    getCategories: async function () {
        const rep = await axios.get(`/device/categories`)
        return rep.data
    }
}

export const axiosOrderRepository: TOrderRepository = {

    async getUserOrders() {
        const rep = await axios.get<TOrder[]>('/products/get-user-orders')
        return rep.data
    },

    async getOrderById(id: string) {
        const rep = await axios.get<TOrder>(`/products/get-order-by-id/${id}`)
        return rep.data
    },

    async updateOrderByIdentifier(id: string, status: string) {
        const rep = await axios.get<TOrder>(
            `/products/update-order-by-identifier/${id}/${status}`
        )
        return rep.data
    },

    async addOrder(type , quantity , url){
        try {
            const response = await axios.post('/cartitems', {
                'type' : type,
                "model_variant":url,
                "quantity": quantity,
               
            },
            // {
            //     headers:{
            //         Authorization : `Bearer ${cookie.get('token')}` 
            //     }
            // }
            )
 
            return response
        } catch (error) {
            return false
        }
    },

    async addRepairOrder(issues){
        try {
            const response = await axios.post('/cartitems', {
                // 'type' : type,
                'repairs' : issues
            },
            // {
            //     headers:{
            //         Authorization : `Bearer ${cookie.get('token')}` 
            //     }
            // }
            
            )
 
            return response
        } catch (error) {
            return false
        }
    },
    async createCart(e:string , i:string){
        const response = await axios.post(`/carts`,{
            "type": e,
            "origin": i
        },
        // {
        //     headers:{
        //         Authorization : `Bearer ${cookie.get('token')}` 
        //     }
        //   }
          )  
    
          return response
    },

    async notACustomer(email , first_name , last_name , phone){
        const response = await axios.post('/customers/pos_first_creation', {
            "email": email,
            "first_name": first_name,
            "last_name":last_name,
            "phone": phone,
            "birth_date": "2023-03-08",
        })

        return response
    },

    async getCartItems(){
      const response = await axios.get(`/cartitems`,
    //   {
    //     headers:{
    //         Authorization : `Bearer ${cookie.get('token')}` 
    //     }
    //   }
      
      )  

      return response.data
    },

    async getCart(){
        const response = await axios.get(`/carts/active`,
        // {
        //     headers:{
        //         Authorization : `Bearer ${cookie.get('token')}` 
        //     }
        //   }
          
          )  
        
        return response
      },
    async confirmOrder(){
        let response = await axios.post('/carts/validate',
        
        // null,{
        //     headers:{
        //         Authorization : `Bearer ${cookie.get('token')}` 
        //     }   
        // }
        
        )

        return response
    },

    async deleteItem(e:number){
        let response = await axios.delete(`/cartitems/${e}`,
        // {
        //     headers:{
        //         Authorization : `Bearer ${cookie.get('token')}` 
        //     }   
        // }
        )

        return response
    },
    async SchudleConfirmation(time , date){
        let response = await axios.post(`/carts/schedule`,{
            "schedule": `${date}T${time}`
        },
        // {
        //     headers:{
        //         Authorization : `Bearer ${cookie.get('token')}` 
        //     }   
        // }
        )

        return response
    },
    async collectionConfirmation(collection){
        let response = await axios.post(`/carts/collection-method`,{
            "collection_method": collection
        },
        // {
        //     headers:{
        //         Authorization : `Bearer ${cookie.get('token')}` 
        //     }   
        // }
        )

        return response
    },
    async deleteItems(collection){
        let response = await axios.post(`/cartitems/bulk_delete`,
        {
            "items": collection
        },
        // {
        //     headers:{
        //         Authorization : `Bearer ${cookie.get('token')}` 
        //     }   
        // }
        
        )

        return response
    },
    async confirmAddress(address , cart){
        let response = await axios.post(`/cartaddress/from-customer-address`,{
            "customer_address":address,
            "cart": cart
        },{
            headers:{
                Authorization : `Bearer ${cookie.get('token')}` 
            }   
        })

        return response  
    }
}

export const axiosAddressRepository: TAddressRepository = {
    async getCurrentUserAddresses() {
        const rep = await axios.get<TAddress[]>(`/address`,{
            headers:{
                Authorization : `Bearer ${cookie.get('token')}` 
            },
        })
        return rep
    },
    async createAddress(payload: TAddressInput) {
        const rep = await axios.post<TAddress>(`/address`,{
            city: payload.city ,
            firstName: payload.fName,
            lastName: payload.lName,
            company: payload.company,
            address1: payload.address1,
            address2: payload.address2,
            state: payload.state,
            postCode : payload.postCode,
            phone: `+${payload.phoneNumber}`,
            customer: payload.customer
        },{
            headers:{
                Authorization : `Bearer ${cookie.get('token')}` 
            }
        })
        
        return rep
    },
    async updateAddress(id , payload) {

        const rep = await axios.patch<TAddress>(`/address/${id}`, {
            "firstName": payload.fName,
            "lastName": payload.lName,
            "company": payload.company,
            "address1": payload.address1,
            "address2": payload.address2,
            "city":  payload.city,
            "state":  payload.state,
            "postCode":  payload.postCode,
            "phone": payload.phone,
            "customer": payload.customer
        },{
            headers:{
                Authorization : `Bearer ${cookie.get('token')}` 
            }
        })
        
        return rep
    },
    async deleteAddress(addressId: string) {
        const rep = await axios.delete(`/address/${addressId}`,{
          headers:{
            Authorization : `Bearer ${cookie.get('token')}` 
          }
        })
        return (rep.status >= 200 && rep.status <= 299)
    },
    async getSpecifcAddresses(addressId: string) {
        const rep = await axios.get(`/address/${addressId}`,{
          headers:{
            Authorization : `Bearer ${cookie.get('token')}` 
          }
        })
        return rep
    },
}

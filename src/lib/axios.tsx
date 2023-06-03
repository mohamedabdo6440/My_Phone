import axios from 'axios'
import { toast } from 'react-hot-toast'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const instance = axios.create({
    baseURL: `${process.env.server_uri}`,
    headers: 
    { 
        'Content-Type': 'application/json',
     },
    withCredentials: true,
    
})

instance.interceptors.response.use(
    (response) => {
        if(response.status == 200 || 201){
            return Promise.resolve(response)
        }else if(response.status == 500){
            toast.error('Wee Have An Updates Try Later on')
        }
    },
    async (error) => {
        if (!error.response) return Promise.reject(
            `${error.code} \n${error.request._currentUrl}`
        )
        // if (error.response.status !== 401) return Promise.resolve(error.response)
        // const res = await instance.get('/auth/refresh')
        // if (res.status === 200) {
        //     return error.response.config.method === 'get'
        //         ? instance.get(error.response.config.url)
        //         : instance.post(error.response.config.url, error.response.config.data)
        // } else {
        //     return Promise.resolve(error.response)
        // }
    }
)

export default instance

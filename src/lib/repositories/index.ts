import {
    axiosAddressRepository,
    axiosDeviceRepository,
    axiosOrderRepository,
    axiosUserRepository,
} from '@/lib/repositories/axios'
import { TRepositories } from '@/interfaces/repositories'

const repositoriesTypes: {
    production: TRepositories,
} = {
    production: {
        type: "production",
        device: axiosDeviceRepository,
        order: axiosOrderRepository,
        user: axiosUserRepository,
        address: axiosAddressRepository,
    },
}

const getRepositories = (mode?: "test" | "development" | "production") => {
    return repositoriesTypes["production"]
}

export default getRepositories

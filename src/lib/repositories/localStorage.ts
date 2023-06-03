import {
    TAddressRepository,
    TOrderRepository,
    TDeviceRepository,
    TUserRepository
} from "@/interfaces/repositories";
import {TAddressInput, TOrder, TUser, TUserInput} from "@/interfaces";

// export const fakeUser: TUser = {
//     emailAddress: "example@this.com",
//     firstName: "Before",
//     lastName: "After",
//     password: "root",
//     birthDate: "1980-01-01",
//     phoneNumber: 555,
//     gender: "male",
//     address: "here",
//     city: "there",
// }

interface IStorage {
    getItem: (key: string) => string | null
    setItem: (key: string, value: any) => void
}

const fakeStorage: IStorage = {
    getItem: () => null,
    setItem: () => {},
}

export class LocalStorageRepositoryBase {

    storage: IStorage
    nextId = 1

    constructor(storage?: IStorage) {
        if (!storage)
            storage = this.getDefaultStore()
        this.storage = storage
    }

    protected getNextId() {
        return (this.nextId++).toString()
    }

    private getDefaultStore() {
        try {
            return localStorage
        } catch {
            return fakeStorage
        }
    }

    protected get(key: string): any | null {
        const serialized = this.storage.getItem(key)
        if (!serialized)
            return null
        return JSON.parse(serialized)
    }

    protected set(key: string, object: Object) {
        const serialized = JSON.stringify(object)
        this.storage.setItem(key, serialized)
    }

}

export class LocalStorageUserRepository
    extends LocalStorageRepositoryBase
    implements TUserRepository
{
    async getCurrentUserProfile() {
        // this.checkCurrentUser()
        return this.get("current-user") as TUser
    }

    // private checkCurrentUser() {
    //     if (!this.get("current-user"))
    //         this.set("current-user", fakeUser)
    // }

    async editCurrentUserProfile(payload: TUserInput) {
        const user = this.get("current-user")
        this.set("current-user", Object.assign(user, payload))
        return true
    }
}

export const localStorageUserRepository = new LocalStorageUserRepository()

const createFakeOrder = (props = {}) => {
    const defaultProps = {
        _id: "1",
        productIds: [],
        // userId: fakeUser,
        type: "buy",
        status: "pending",
        carrier: "some carrier",
        amount: 100,
        createdAt: "2020-01-01",
        date: "",
        paymentIdentifier: "",
        paymentProcessor: "",
        updatedAt: "",
        shippingProvider: "",
    }
    return Object.assign({}, defaultProps, props)
}

export class LocalStorageAddressRepository
    extends LocalStorageRepositoryBase
    implements TAddressRepository
{

    key = "addresses"

    constructor() {
        super();
        this.set(this.key, [])
    }

    async getCurrentUserAddresses() {
        return this.get(this.key)
    }
    async createAddress(payload: TAddressInput) {
        const _id = this.getNextId()
        const address = Object.assign({_id}, payload)
        const addresses = this.get(this.key)
        addresses[_id] = address
        this.set(this.key, addresses)
        return address
    }
    async updateAddress(addressId: string, payload: TAddressInput) {
        const addresses = this.get(this.key)
        Object.assign(addresses[addressId], payload)
        this.set(this.key, addresses)
        return true
    }
    async deleteAddress(addressId: string) {
        const addresses = this.get(this.key)
        delete addresses[addressId]
        this.set(this.key, addresses)
        return true
    }
}

export const localStorageAddressRepository = new LocalStorageAddressRepository()

import {  createSlice, PayloadAction } from '@reduxjs/toolkit'


interface TInitialState {
    userData:{
        firstName:string
        lastName:string
        Email:string
        gender:string
        birth:string
        phone:string
        url:string
        addressId:string
    }
  
}

const initialState: TInitialState = {
    userData:{
        firstName:'',
        lastName:'',
        Email:'',
        gender:'',
        birth:'',
        phone:'',
        url:'',
        addressId:''
    },
  

}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: any) => {
           state.userData.Email = action.payload.Email
           state.userData.birth = action.payload.birth
           state.userData.firstName = action.payload.firstName
           state.userData.lastName = action.payload.lastName
           state.userData.gender = action.payload.gender
           state.userData.url = action.payload.url
           state.userData.phone = `+ ${action.payload.phone}`
        },
        setAddressId: (state , action)=>{
        state.userData.addressId = action.payload.id
        }
    },
})

export const { setUserData , setAddressId } = userSlice.actions
export default userSlice.reducer

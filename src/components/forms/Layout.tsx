// local modules
import Footer from '@/components/mainComponents/Footer'
import ForgotPassword from '@/components/forms/ForgotPassword'
import LoginForm from '@/components/forms/LoginForm'
import Modal from '@/components/mainComponents/Modal'
import Nav from '@/components/mainComponents/Nav'
import RegisterForm from '@/components/forms/RegisterForm'
import Toast from '@/components/loaders/Toast'
import UpdatePassword from '@/components/forms/UpdatePassword'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/layout.module.scss'
import OrderConfirmation from './OrderConfirmation'
import AddressForm from '@/components/forms/AddressForm'
import DeleteAddress from './DeleteAddress'
import ChooseAddress from './ChooseAddress'
import UpdateAddress from './UpdateAddress'
import DunnoForm from './DunnoForm'
import UserConfirmation from './UserConfirmation'





interface LayoutProps {
    children: React.ReactNode | any
}

const Layout = ({ children }: LayoutProps) => {
    const { authFormOpen } = useAppSelector((state) => state.auth)
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    const closeHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const target = e.target as HTMLDivElement

        if (target.classList.contains('form_close')) {
            return dispatch(toggleAuthForm(false))
        }
    }

    const authForms: Record<Exclude<typeof authFormOpen, false>, JSX.Element> = {
        login: <LoginForm />,
        register: <RegisterForm />,
        forgotPassword: <ForgotPassword />,
        updatePassword: <UpdatePassword />,
        confirmation : <OrderConfirmation action={''} />,
        addAdress: <AddressForm />,
        deleteAddress: <DeleteAddress />,
        availAddress: <ChooseAddress />,
        updateAddress: <UpdateAddress />,
        dunno: <DunnoForm />,
        user : <UserConfirmation />
    }

    return (
        <>
            <Nav />
            <div className={`${styles.layout} ${theme === 'light' ? styles.light : styles.dark}`}>
                <div className='container'>
                    {children}
                    {authFormOpen && (
                        <div className={`${styles.auth_form} form_close`} onClick={closeHandler}>
                            {authForms[authFormOpen]}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <Modal />
            <Toast />
        </>
    )
}

export default Layout

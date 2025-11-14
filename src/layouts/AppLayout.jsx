
import { Outlet } from 'react-router'

import AppFooter from "../components/AppFooter"
import AppHeader from "../components/AppHeader"
import AppNavbar from "../components/AppNavbar"


const AppLayout = ({products, carts, setToken}) => {


    return (
        <div className="border p-3 mx-auto -3 border-black rounded-3" style={{width: 'fit-content'}}>
            <AppHeader />
            <AppNavbar products={products} carts={carts} setToken={setToken}/>
            <Outlet />
            <AppFooter />
        </div>
    )
}

export default AppLayout
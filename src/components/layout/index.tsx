import { Header } from "../header"
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from "./style"

export const DefaultLayout = () => {
    return(
        <LayoutContainer>
            <Header />
            <Outlet />
        </LayoutContainer>

    )
}
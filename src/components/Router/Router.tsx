import { Routes, Route } from "react-router-dom"
import { Home } from "../../pages/home"
import { History } from "../../pages/History"
import { DefaultLayout } from "../layout"

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="/history" element={<History />}/>
            </Route>
        </Routes>
    )
}
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"


export default function Layout() {
    return (
        <div className="layout-container">
            <Navbar />
            <Outlet />
        </div>
    )
}

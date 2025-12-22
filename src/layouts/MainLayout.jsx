import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import NavigateMenu from "../components/NavigateMenu";
import SortAndFilter from "../components/SortAndFilter";

export default function MainLayout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
            <Header />

            <div className="app-wrapper">
                <div className="main_container">
                    <div className="left_sidebar">
                        <NavigateMenu />
                        {isHomePage && <SortAndFilter />}
                    </div>

                    <div className="page_container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

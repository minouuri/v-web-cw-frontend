import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import NavigateMenu from "./components/NavigateMenu";
import SortAndFilter from "./components/SortAndFilter";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { FilterProvider } from "./components/FilterContext";
import ProjectManager from "./pages/ProjectManager";
import ProjectList from "./pages/ProjectList";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import UserProjects from "./pages/UserProjects";
import Auth from "./pages/Auth";
import Responses from "./pages/Responses";
import Bookmarks from "./pages/Bookmarks";
import { AuthProvider } from "./Context/AuthContext";
import { UserProvider } from './Context/UserContext'

function LeftSidebar() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className="left_sidebar">
            <NavigateMenu />
            {isHomePage && <SortAndFilter />}
        </div>
    );
}

function AppContent() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/auth";

    return (
        <div className={isAuthPage ? "auth-page" : ""}>
            <Header />

            <div className="app-wrapper">
                <div className="main_container">
                    {!isAuthPage && <LeftSidebar />}

                    <div className="page_container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/projects" element={<UserProjects />} />
                            <Route path="/projectslist" element={<ProjectList />} />
                            <Route path="/project/:id" element={<ProjectDetailsPage />} />
                            <Route path="/project/:id/edit" element={<ProjectManager />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/responses" element={<Responses />} />
                            <Route path="/bookmarks" element={<Bookmarks />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <FilterProvider>
                        <AppContent />
                    </FilterProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
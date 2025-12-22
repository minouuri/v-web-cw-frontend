import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import OtherProfile from "./pages/OtherProfile";
import UserProjects from "./pages/UserProjects";
import ProjectList from "./pages/ProjectList";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectManager from "./pages/ProjectManager";
import Auth from "./pages/Auth";
import Responses from "./pages/Responses";
import Bookmarks from "./pages/Bookmarks";

import { FilterProvider } from "./Context/FilterContext";
import { AuthProvider } from "./Context/AuthContext";
import { UserProvider } from "./Context/UserContext";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <FilterProvider>
                        <Routes>

                            <Route element={<AuthLayout />}>
                                <Route path="/auth" element={<Auth />} />
                            </Route>

                            <Route element={<MainLayout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/profile/:userId" element={<OtherProfile />} />
                                <Route path="/projects" element={<UserProjects />} />
                                <Route path="/projectslist" element={<ProjectList />} />
                                <Route path="/project/:id" element={<ProjectDetailsPage />} />
                                <Route path="/project/:id/edit" element={<ProjectManager />} />
                                <Route path="/responses" element={<Responses />} />
                                <Route path="/bookmarks" element={<Bookmarks />} />
                            </Route>

                        </Routes>
                    </FilterProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

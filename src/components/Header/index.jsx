import './style.css';
import SearchBar from '../SearchBar';
import ButtonLogin from '../ButtonLogin';
import ButtonRegistration from '../ButtonRegistration';
import UserName from '../UserName';
import LogoIcon from '../LogoIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    console.log('HEADER USER:', user);

    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const hideSearchPaths = ["/auth", "/project/:id", "/project/:id/edit", "/profile", "/projects", "/responses", "/bookmarks", "/friends", "/about"];
    const shouldShowSearch = !hideSearchPaths.includes(location.pathname);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => setShowMobileMenu(false), [location]);

    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    const handleLogoClick = () => {
        navigate('/');
        setShowMobileMenu(false);
    };

    return (
        <>
            <header>
                <div className="header-content">
                    <div className="left-section">
                        <div className="logo_container" onClick={handleLogoClick}>
                            <LogoIcon className="logo_icon" />
                            <h1 className="logo_name">КОМАНДУМ</h1>
                        </div>
                        {!isMobile && shouldShowSearch && <SearchBar />}
                    </div>

                    <div className="right-section">
                        {!isMobile && (
                            <>
                                {user ? <UserName user={user} /> : (
                                    <>
                                        <ButtonLogin />
                                        <div className="vertical-line"></div>
                                        <ButtonRegistration />
                                    </>
                                )}
                            </>
                        )}
                        {isMobile && (
                            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {isMobile && showMobileMenu && (
                <div className="mobile-menu-overlay">
                    <div className="mobile-menu">
                        <div className="mobile-menu-content">
                            {shouldShowSearch && (
                                <div className="mobile-search">
                                    <SearchBar mobile />
                                </div>
                            )}
                            <div className="mobile-auth-buttons">
                                {user ? <UserName user={user} /> : (
                                    <>
                                        <ButtonLogin onClick={() => setShowMobileMenu(false)} />
                                        <ButtonRegistration onClick={() => setShowMobileMenu(false)} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

import './style.css'
import { NavLink } from 'react-router-dom'

export default function NavigateMenu(){
    return(
        <div className="navigate_bar">
            <NavLink 
                to="/"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                <span>Лента</span>
            </NavLink>
            <NavLink 
                to="/profile"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                <span>Профиль</span>
            </NavLink>
            <NavLink 
                to="/projects"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                <span>Мои проекты</span>
            </NavLink>
            <NavLink 
                to="/responses"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                <span>Мои отклики</span>
            </NavLink>
            <NavLink 
                to="/bookmarks"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                <span>Мои закладки</span>
            </NavLink>
        </div>
    )    
}
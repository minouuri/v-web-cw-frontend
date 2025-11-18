import './style.css'
import { NavLink } from 'react-router-dom'

export default function NavigateMenu(){
    return(
        <div className="navigate_bar">
            <NavLink 
                to="/profile"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                Профиль
            </NavLink>
            <NavLink 
                to="/"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                Лента
            </NavLink>
            <NavLink 
                to="/activities"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                Активности
            </NavLink>
            <NavLink 
                to="/projects"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                Проекты
            </NavLink>
            <NavLink 
                to="/about"
                className={({ isActive }) => 
                    isActive ? 'nav-button active' : 'nav-button'}>
                О нас
            </NavLink>
        </div>
    )    
}
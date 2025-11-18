import './style.css'
import SearchBar from '../SearchBar'
import ButtonLogin from '../ButtonLogin'
import ButtonRegistration from '../ButtonRegistration'

export default function Header() {
    return (
        <header>
            <div className="left-section">
                <h1 className='logo_name'>КОМАНДУМ</h1>
                <img className='logo_icon' src="/logo_icon.svg" alt="Logo" />
                <SearchBar />
            </div>
            <div className="right-section">
                <ButtonLogin />
                <div className="vertical-line"></div>
                <ButtonRegistration />
            </div>
        </header>
    )  
}
import './style.css'
import { useNavigate } from 'react-router-dom'

export default function AuthRedirectButton({ 
    type = 'register' 
}) {
    const navigate = useNavigate()

    const buttonTexts = {
        register: 'Зарегистрироваться',
        login: 'Войти'
    }

    const handleClick = () => {
        navigate('/auth', { state: { activeTab: type } })
    }

    return (
        <button 
            className="auth-text-btn"
            onClick={handleClick}
        >
            {buttonTexts[type]}
        </button>
    )
}
import './style.css'

import { useNavigate } from 'react-router-dom';

export default function ButtonLogin() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/auth', { state: { activeTab: 'login' } });
    };

    return (
        <button className="auth-button-login" onClick={handleClick}>
            Войти
        </button>
    );
}
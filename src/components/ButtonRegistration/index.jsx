import './style.css'

import { useNavigate } from 'react-router-dom';

export default function ButtonRegistration() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/auth', { state: { activeTab: 'register' } });
    };

    return (
        <button className="auth-button-registration" onClick={handleClick}>
            Зарегистрироваться
        </button>
    );
}
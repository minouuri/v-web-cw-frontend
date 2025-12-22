import './style.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'
import RegistrationForm from '../../components/RegistrationForm'

export default function Auth() {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('login')

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab)
        }
    }, [location.state])

    return (
        <div className="auth-page">
            <div className='auth-form-base'>
                <div className="auth-tabs">
                    <button 
                        className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Вход
                    </button>
                    <button 
                        className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Регистрация
                    </button>
                </div>

                <div className="auth-content">
                    {activeTab === 'login' ? (
                        <LoginForm onSwitchToRegister={() => setActiveTab('register')} />
                    ) : (
                        <RegistrationForm onSwitchToLogin={() => setActiveTab('login')} />
                    )}
                </div>
            </div>
        </div>
    )
}
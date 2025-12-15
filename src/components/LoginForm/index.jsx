import './style.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = () => {
        const newErrors = {}
        if (!email.trim()) newErrors.email = 'Введите email'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Неверный формат email'

        if (!password.trim()) newErrors.password = 'Введите пароль'
        else if (password.length < 6) newErrors.password = 'Пароль должен содержать минимум 6 символов'

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsLoading(true)
        setErrors({})

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password })
            })
            const data = await response.json()

            if (!response.ok) throw new Error(data.message || data.error || 'Ошибка входа')

            const userData = {
                id: data.user_id,
                email: email.trim(),
                username: data.username || 'Пользователь',
                token: data.token
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(userData))
            login(userData)

            navigate('/')
        } catch (error) {
            console.error('Ошибка входа:', error)
            let errorMessage = 'Ошибка соединения. Попробуйте позже'
            if (/Неверный|Invalid|incorrect/.test(error.message)) errorMessage = 'Неверный email или пароль'
            else if (/User not found|Пользователь не найден/.test(error.message)) errorMessage = 'Пользователь с таким email не найден'
            setErrors({ submit: errorMessage })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Вход</h1>
            <h4>Введите email привязанный к аккаунту и пароль</h4>

            <div className="input-group">
                <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })) }}
                    className={errors.email ? 'error' : ''}
                    disabled={isLoading}
                />
                {errors.email && <div className="error-message"><span className="error-icon">⚠</span>{errors.email}</div>}
            </div>

            <div className="input-group">
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })) }}
                    className={errors.password ? 'error' : ''}
                    disabled={isLoading}
                />
                {errors.password && <div className="error-message"><span className="error-icon">⚠</span>{errors.password}</div>}

                <button type="button" className="forgot-password" onClick={() => console.log('Восстановление пароля')} disabled={isLoading}>
                    Забыли пароль?
                </button>
            </div>

            {errors.submit && <div className="submit-error"><span className="error-icon">⚠</span>{errors.submit}</div>}

            <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? <><span className="spinner"></span> Вход...</> : 'Вход'}
            </button>

            <div className="registration-section">
                <h5>Нет аккаунта?</h5>
                <button type="button" className="registration-btn" disabled={isLoading} onClick={() => console.log('Переход к регистрации')}>
                    Зарегистрироваться
                </button>
            </div>
        </form>
    )
}

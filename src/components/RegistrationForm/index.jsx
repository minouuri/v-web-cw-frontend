import './style.css'
import { useState } from 'react'

export default function RegistrationForm() {

    const [formData, setFormData] = useState({
        phone: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const validateForm = () => {
        const newErrors = {}

        // Валидация телефона
        if (!formData.phone.trim()) {
            newErrors.phone = 'Введите номер телефона'
        } else if (!/^[\d+()\s-]{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Неверный формат номера телефона'
        }

        // Валидация никнейма
        if (!formData.username.trim()) {
            newErrors.username = 'Введите никнейм'
        } else if (formData.username.length < 3) {
            newErrors.username = 'Никнейм должен содержать минимум 3 символа'
        } else if (formData.username.length > 20) {
            newErrors.username = 'Никнейм не должен превышать 20 символов'
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Можно использовать только буквы, цифры и подчеркивание'
        }

        // Валидация email
        if (!formData.email.trim()) {
            newErrors.email = 'Введите email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Неверный формат email'
        }

        // Валидация пароля
        if (!formData.password.trim()) {
            newErrors.password = 'Введите пароль'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Пароль должен содержать минимум 8 символов'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Пароль должен содержать заглавные, строчные буквы и цифры'
        }

        // Подтверждение пароля
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Подтвердите пароль'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают'
        }

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
            const userData = {
                email: formData.email.trim(),
                password: formData.password,
                username: formData.username.trim(),
            }

            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || data.error || 'Ошибка регистрации')
            }

            console.log('Регистрация успешна:', data)

            setFormData({
                phone: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            setErrors({ submit: 'Регистрация успешно завершена!' })
        } catch (error) {
            console.error('Ошибка регистрации:', error)

            let errorMessage = 'Ошибка соединения. Попробуйте позже'

            if (error.message.includes('already exists') ||
                error.message.includes('уже существует') ||
                error.message.includes('duplicate')) {
                errorMessage = 'Пользователь с таким телефоном или email уже существует'
            } else if (error.message.includes('password') ||
                error.message.includes('пароль')) {
                errorMessage = 'Пароль не соответствует требованиям'
            } else if (error.message.includes('email') ||
                error.message.includes('почта')) {
                errorMessage = 'Некорректный email адрес'
            } else if (error.message.includes('username') ||
                error.message.includes('никнейм')) {
                errorMessage = 'Некорректный никнейм'
            } else if (error.message) {
                errorMessage = error.message
            }

            setErrors({ submit: errorMessage })
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (field) => (e) => {
        const value = e.target.value

        // Автоматическое форматирование телефона
        if (field === 'phone') {
            const formattedValue = value.replace(/\D/g, '')
                .replace(/^(\d{1})/, '+$1')
                .replace(/^(\+\d{1})(\d{0,3})/, '$1 $2')
                .replace(/^(\+\d{1} \d{3})(\d{0,3})/, '$1 $2')
                .replace(/^(\+\d{1} \d{3} \d{3})(\d{0,4})/, '$1-$2')
                .replace(/^(\+\d{1} \d{3} \d{3}-\d{2})(\d{0,2})/, '$1-$2')

            setFormData(prev => ({ ...prev, [field]: formattedValue }))
        } else {
            setFormData(prev => ({ ...prev, [field]: value }))
        }

        // Очищаем ошибку при вводе
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }

        // Очищаем ошибку подтверждения пароля при изменении основного пароля
        if (field === 'password' && errors.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: '' }))
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible)
    }

    const getPasswordStrength = (password) => {
        if (!password) return { score: 0, text: '' }

        let score = 0
        if (password.length >= 8) score++
        if (/[a-z]/.test(password)) score++
        if (/[A-Z]/.test(password)) score++
        if (/\d/.test(password)) score++
        if (/[^a-zA-Z0-9]/.test(password)) score++

        const levels = [
            { text: 'Слишком слабый', color: '#FF6B6B' },
            { text: 'Слабый', color: '#FFA726' },
            { text: 'Средний', color: '#FFD166' },
            { text: 'Хороший', color: '#A2FFB2' },
            { text: 'Отличный', color: '#06D6A0' }
        ]

        return levels[Math.min(score - 1, 4)] || levels[0]
    }

    const passwordStrength = getPasswordStrength(formData.password)

    return (
        <form className='registration-form' onSubmit={handleSubmit}>
            <h1>Регистрация</h1>

            <div className="input-group">
                <label htmlFor="phone">Номер телефона *</label>
                <input id="phone" type="tel" placeholder="+7 999 123-45-67" value={formData.phone} onChange={handleChange('phone')}
                    className={errors.phone ? 'error' : ''} disabled={isLoading}
                />
                {errors.phone && (
                    <div className="error-message">
                        <span className="error-icon">⚠</span>
                        {errors.phone}
                    </div>
                )}
            </div>

            <div className="input-group">
                <label htmlFor="username">Никнейм *</label>
                <input id="username" type="text" placeholder="user123" value={formData.username} onChange={handleChange('username')}
                    className={errors.username ? 'error' : ''} disabled={isLoading}
                />
                {errors.username && (
                    <div className="error-message">
                        <span className="error-icon">⚠</span>
                        {errors.username}
                    </div>
                )}
            </div>

            <div className="input-group">
                <label htmlFor="email">Эл. почта *</label>
                <input id="email" type="email" placeholder="example@mail.com" value={formData.email} onChange={handleChange('email')}
                    className={errors.email ? 'error' : ''} disabled={isLoading}
                />
                {errors.email && (
                    <div className="error-message">
                        <span className="error-icon">⚠</span>
                        {errors.email}
                    </div>
                )}
            </div>

            <div className="input-group">
                <div className="password-header">
                    <label htmlFor="password">Пароль *</label>
                    <button type="button" className="toggle-visibility" onClick={togglePasswordVisibility} tabIndex="-1" >
                        {passwordVisible ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                <div className="password-input-wrapper">
                    <input id="password" type={passwordVisible ? "text" : "password"} placeholder="Минимум 8 символов" value={formData.password}
                        onChange={handleChange('password')} className={errors.password ? 'error' : ''} disabled={isLoading}
                    />
                </div>

                {formData.password && (
                    <div className="password-strength">
                        <div className="strength-bar">
                            <div
                                className="strength-fill"
                                style={{
                                    width: `${(passwordStrength.score / 5) * 100}%`,
                                    backgroundColor: passwordStrength.color
                                }}
                            />
                        </div>
                        <span className="strength-text" style={{ color: passwordStrength.color }}>
                            {passwordStrength.text}
                        </span>
                    </div>
                )}

                {errors.password && (
                    <div className="error-message">
                        <span className="error-icon">⚠</span>
                        {errors.password}
                    </div>
                )}

                <div className="password-hints">
                    <div className={formData.password.length >= 8 ? 'hint-valid' : ''}>
                        Не менее 8 символов
                    </div>
                    <div className={/[a-z]/.test(formData.password) ? 'hint-valid' : ''}>
                        Строчные буквы (a-z)
                    </div>
                    <div className={/[A-Z]/.test(formData.password) ? 'hint-valid' : ''}>
                        Заглавные буквы (A-Z)
                    </div>
                    <div className={/\d/.test(formData.password) ? 'hint-valid' : ''}>
                        Цифры (0-9)
                    </div>
                </div>
            </div>

            <div className="input-group">
                <div className="password-header">
                    <label htmlFor="confirmPassword">Подтвердите пароль *</label>
                    <button type="button" className="toggle-visibility" onClick={toggleConfirmPasswordVisibility} tabIndex="-1" >
                        {confirmPasswordVisible ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                <div className="password-input-wrapper">
                    <input id="confirmPassword" type={confirmPasswordVisible ? "text" : "password"} placeholder="Повторите ввод пароля" value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')} className={errors.confirmPassword ? 'error' : ''} disabled={isLoading}
                    />
                </div>
                {errors.confirmPassword && (
                    <div className="error-message">
                        <span className="error-icon">⚠</span>
                        {errors.confirmPassword}
                    </div>
                )}
            </div>

            {errors.submit && (
                <div className="submit-error">
                    <span className="error-icon">⚠</span>
                    {errors.submit}
                </div>
            )}

            <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span className="spinner"></span>
                        Регистрация...
                    </>
                ) : 'Зарегистрироваться'}
            </button>

            <div className="login-section">
                <h5>Есть аккаунт?</h5>
                <button type="button" className="login-btn" disabled={isLoading} >
                    Войти
                </button>
            </div>
        </form>
    )
}
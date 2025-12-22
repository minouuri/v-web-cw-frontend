import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from './AuthContext'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    const location = useLocation()

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchProfile = async () => {
        if (!user) {
            setProfile(null)
            return
        }

        setLoading(true)
        try {
            const token = localStorage.getItem('token')

            const params = new URLSearchParams(location.search)
            const userId = params.get('userId')

            const url = userId
                ? `http://155.212.247.183:5000/api/profile/${userId}`
                : `http://155.212.247.183:5000/api/profile`

            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (!res.ok) throw new Error('Ошибка загрузки профиля')

            const data = await res.json()
            setProfile(data)
            setError(null)
        } catch (err) {
            setError(err.message)
            setProfile(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [user, location.search])

    return (
        <UserContext.Provider value={{ profile, loading, error, fetchProfile }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)

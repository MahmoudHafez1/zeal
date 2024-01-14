import { useContext } from 'react'
import { setJWT } from '../api/api'
import { useLocalStorage } from './useLocalStorage'
import { AuthContext } from '../context/AuthContext'

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext)
  const { setItem, removeItem } = useLocalStorage()

  const login = async (user: any) => {
    await setItem('user', JSON.stringify(user))
    setUser(user)
    setJWT(user.token)
  }

  const logout = async () => {
    await removeItem('user')
    setUser(null)
    setJWT(null)
  }

  return { user, login, logout }
}

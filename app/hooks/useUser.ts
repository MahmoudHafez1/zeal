import { useContext } from 'react'
import { setJWT } from '../api/api'
import { useLocalStorage } from './useLocalStorage'
import { AuthContext } from '../context/AuthContext'

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext)
  const { setItem, removeItem } = useLocalStorage()

  const addUser = async (user: any) => {
    await setItem('user', JSON.stringify(user))
    setUser(user)
    setJWT(user.token)
  }

  const removeUser = async () => {
    await removeItem('user')
    setUser(null)
    setJWT(null)
  }

  return { user, addUser, removeUser }
}

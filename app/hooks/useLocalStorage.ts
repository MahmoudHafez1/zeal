import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

export const useLocalStorage = () => {
  const [value, setValue] = useState<null | string>(null)

  const setItem = async (key: string, userData: string) => {
    await AsyncStorage.setItem(key, userData)
    setValue(userData)
  }

  const getItem = async (key: string) => {
    const newValue = await AsyncStorage.getItem(key)
    setValue(newValue)
    return newValue
  }

  const removeItem = async (key: string) => {
    await AsyncStorage.removeItem(key)
    setValue(null)
  }

  return { value, setItem, getItem, removeItem }
}

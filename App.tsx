import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './app/navigation/Navigator'
import { Button, NativeBaseProvider } from 'native-base'
import theme from './app/theme/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useLocalStorage } from './app/hooks/useLocalStorage'
import { useEffect, useState } from 'react'
import { setJWT } from './app/api/api'
import { AuthContext } from './app/context/AuthContext'

export default function App() {
  const client = new QueryClient()
  const { getItem } = useLocalStorage()

  const [loggedUser, setLoggedUser] = useState<any>(null)

  useEffect(() => {
    if (!loggedUser) {
      getItem('user').then((storedUser) => {
        if (storedUser) {
          setLoggedUser(storedUser)
          setJWT(JSON.parse(storedUser).token)
        }
      })
    }
  }, [loggedUser])

  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={client}>
        <AuthContext.Provider
          value={{ user: loggedUser, setUser: setLoggedUser }}
        >
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </AuthContext.Provider>
      </QueryClientProvider>
    </NativeBaseProvider>
  )
}

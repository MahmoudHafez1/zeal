import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ScreensNames } from './screenNames'
import {
  AddEditUser,
  AddLocation,
  Login,
  Register,
  UserDetails,
  Users,
} from '../screens'
import { useAuth } from '../hooks/useAuth'
import { IUserParams } from '../types/User'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  const { user } = useAuth()

  return (
    <Stack.Navigator
      initialRouteName={user ? ScreensNames.Login : ScreensNames.Users}
    >
      {!user ? (
        <>
          <Stack.Screen name={ScreensNames.Login} component={Login} />
          <Stack.Screen name={ScreensNames.Register} component={Register} />
        </>
      ) : (
        <>
          <Stack.Screen name={ScreensNames.Users} component={Users} />
          <Stack.Screen
            options={({ route }) => ({
              title: (route?.params as IUserParams)?.name || 'Add New User',
            })}
            name={ScreensNames.AddEditUser}
            component={AddEditUser}
          />
          <Stack.Screen
            name={ScreensNames.AddLocation}
            component={AddLocation}
          />
          <Stack.Screen
            name={ScreensNames.UserDetails}
            component={UserDetails}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default Navigator

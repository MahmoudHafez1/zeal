import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { IStackNavigationProps } from '../types/StackScreenProps'
import { Button, HStack, Pressable, Text, VStack } from 'native-base'
import { PageContainer } from '../components/PageContainer'
import { useMutation, useQuery } from 'react-query'
import { ScreensNames } from '../navigation/screenNames'
import { useAuth } from '../hooks/useAuth'
import { apiDeleteUser, apiGetUsers } from '../api/user'
import { apiGetLocations } from '../api/location'
import { useFocusEffect } from '@react-navigation/native'
import { CardContainer } from '../components/CardContainer'
import { GestureResponderEvent } from 'react-native'

export const Users: React.FC<IStackNavigationProps> = ({ navigation }) => {
  const { logout } = useAuth()

  const usersQuery = useQuery('users-list', apiGetUsers)

  const locationsQuery = useQuery('locations-list', apiGetLocations)

  const deleteUserQuery = useMutation((userEmail: string) =>
    apiDeleteUser(userEmail)
  )

  useFocusEffect(
    useCallback(() => {
      usersQuery.refetch()
      locationsQuery.refetch()
    }, [])
  )

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <Button variant={'ghost'} onPress={logout}>
          Logout
        </Button>
      ),
    })
  }, [])

  const handleEdit = (
    event: GestureResponderEvent,
    name: string,
    email: string
  ) => {
    event.preventDefault()
    navigation?.navigate(ScreensNames.AddEditUser, { name, email })
  }

  const handleDelete = (event: GestureResponderEvent, email: string) => {
    event.preventDefault()
    deleteUserQuery.mutate(email)
  }

  useEffect(() => {
    if (deleteUserQuery.isSuccess) {
      usersQuery.refetch()
      locationsQuery.refetch()
    }
  }, [deleteUserQuery.isSuccess])

  return (
    <PageContainer
      refresh={() => {
        usersQuery.refetch()
        locationsQuery.refetch()
      }}
      isLoading={usersQuery.isLoading || locationsQuery.isLoading}
    >
      <VStack space={'16px'}>
        <HStack justifyContent={'space-between'} alignItems={'flex-start'}>
          <Button
            onPress={() => navigation?.navigate(ScreensNames.AddEditUser)}
          >
            Add User
          </Button>
          <VStack>
            <Text fontWeight={600} fontSize={16}>
              Users: {usersQuery?.data?.users?.length || 0}
            </Text>
            <Text fontWeight={600} fontSize={16}>
              Locations: {locationsQuery?.data?.locations?.length || 0}
            </Text>
          </VStack>
        </HStack>
        {usersQuery?.data?.users?.map((user: any) => (
          <Pressable
            key={user.id}
            onPress={() => navigation?.navigate(ScreensNames.UserDetails, user)}
          >
            <CardContainer>
              <Text fontWeight={600} fontSize={18}>
                {user.name}
              </Text>
              <Text>Dummy description description</Text>
              <HStack justifyContent={'flex-end'} space={2}>
                <Button
                  mr={2}
                  onPress={(event) => handleEdit(event, user.name, user.email)}
                  backgroundColor={'yellow.600'}
                >
                  Edit
                </Button>
                <Button
                  onPress={(event) => handleDelete(event, user.email)}
                  backgroundColor='red.700'
                >
                  Delete
                </Button>
              </HStack>
            </CardContainer>
          </Pressable>
        ))}
      </VStack>
    </PageContainer>
  )
}

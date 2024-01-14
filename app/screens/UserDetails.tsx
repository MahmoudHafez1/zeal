import React, { useCallback, useEffect, useState } from 'react'
import { IStackNavigationProps } from '../types/StackScreenProps'
import { Button, DeleteIcon, HStack, Text, VStack } from 'native-base'
import { PageContainer } from '../components/PageContainer'
import { ActionAlert } from '../components/ActionAlert'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ScreensNames } from '../navigation/screenNames'
import { apiDeleteUserLocation, apiGetUserLocations } from '../api/location'
import { CardContainer } from '../components/CardContainer'
import { useFocusEffect } from '@react-navigation/native'
import { IUserParams } from '../types/User'

interface ILocationResponse {
  id: number
  lat: string
  lng: string
  userId: number
}

export const UserDetails: React.FC<IStackNavigationProps> = ({
  navigation,
  route,
}) => {
  const user = (route?.params as IUserParams) || null

  const [alert, setAlert] = useState<{ message: string; type: string }>({
    message: '',
    type: '',
  })
  const [showAlert, setShowAlert] = useState(false)
  const [locations, setLocations] = useState<ILocationResponse[]>()

  const queryClient = useQueryClient()

  const getUserLocationsQuery = useQuery('user-locations', () =>
    apiGetUserLocations(user.email)
  )

  const deleteLocationQuery = useMutation((locationId: number) =>
    apiDeleteUserLocation(locationId)
  )

  useFocusEffect(
    useCallback(() => {
      getUserLocationsQuery.refetch()
    }, [])
  )

  useEffect(() => {
    return () => {
      queryClient.resetQueries('user-locations')
    }
  }, [])

  useEffect(() => {
    if (getUserLocationsQuery.data) {
      setLocations(getUserLocationsQuery.data?.locations)
    }
  }, [getUserLocationsQuery.data])

  useEffect(() => {
    if (deleteLocationQuery.isSuccess) getUserLocationsQuery.refetch()
  }, [deleteLocationQuery.isSuccess])

  return (
    <PageContainer
      isLoading={getUserLocationsQuery.isLoading}
      refresh={getUserLocationsQuery.refetch}
    >
      <ActionAlert
        type={alert.type}
        isShown={showAlert}
        setIsShown={setShowAlert}
        message={alert.message}
      />
      <VStack space={'20px'} alignItems={'center'}>
        <CardContainer>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </CardContainer>
        <HStack
          width='100%'
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text fontSize={16} fontWeight={600}>
            Locations
          </Text>
          <Button
            onPress={() =>
              navigation?.navigate(ScreensNames.AddLocation, {
                user,
              })
            }
            variant={'link'}
          >
            Add +
          </Button>
        </HStack>
        {locations && (
          <VStack width='100%' space={'16px'}>
            {locations.map((item: ILocationResponse, index) => (
              <CardContainer key={index}>
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                >
                  <VStack space={2}>
                    <Text>Location Name</Text>
                    <Text>
                      {item.lat} / {item.lng}
                    </Text>
                  </VStack>
                  <DeleteIcon
                    onPress={() => deleteLocationQuery.mutate(item.id)}
                    size={6}
                  />
                </HStack>
              </CardContainer>
            ))}
          </VStack>
        )}
      </VStack>
    </PageContainer>
  )
}

import React, { useEffect, useState } from 'react'
import { IStackNavigationProps } from '../types/StackScreenProps'
import { Button, DeleteIcon, HStack, Text, VStack } from 'native-base'
import { PageContainer } from '../components/PageContainer'
import { ActionAlert } from '../components/ActionAlert'
import { TextField } from '../components/FormFields/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useYupValidationResolver } from '../hooks/useYupResolver'
import * as Yup from 'yup'
import { ScreensNames } from '../navigation/screenNames'
import { apiAddUser, apiEditUser } from '../api/user'
import { apiGetUserLocations } from '../api/location'
import { CardContainer } from '../components/CardContainer'
import { IUserBody, IUserParams } from '../types/User'
import { ILocation } from '../types/Location'

const schema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
})

export const AddEditUser: React.FC<IStackNavigationProps> = ({
  navigation,
  route,
}) => {
  const user = (route?.params as IUserParams) || null

  const [alert, setAlert] = useState<{ message: string; type: string }>({
    message: '',
    type: '',
  })
  const [showAlert, setShowAlert] = useState(false)
  const [locations, setLocations] = useState<ILocation[]>()

  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: useYupValidationResolver(schema),
  })

  const addUserQuery = useMutation((body: IUserBody) => apiAddUser(body))
  const editUserQuery = useMutation((body: IUserBody) =>
    apiEditUser(user?.email, body)
  )

  const getUserLocationsQuery = useQuery(
    'user-locations',
    () => apiGetUserLocations(user.email),
    { enabled: false }
  )

  useEffect(() => {
    return () => {
      queryClient.resetQueries('user-locations')
    }
  }, [])

  useEffect(() => {
    if (user) {
      getUserLocationsQuery.refetch()
    }
  }, [user])

  useEffect(() => {
    if (getUserLocationsQuery.data) {
      setLocations(getUserLocationsQuery.data?.locations)
    }
  }, [getUserLocationsQuery.data])

  const onSubmit: SubmitHandler<any> = (data) => {
    const body: IUserBody = {
      name: data.name,
      email: data.email,
    }
    if (locations && !user) {
      body.locations = locations
    }
    if (user) editUserQuery.mutate(body)
    else addUserQuery.mutate(body)
  }

  useEffect(() => {
    const success = addUserQuery.isSuccess || editUserQuery.isSuccess
    if (success) {
      setAlert({
        message: user ? 'Updated successfully' : 'Added successfully',
        type: 'success',
      })
      setShowAlert(true)
      setTimeout(() => {
        navigation?.pop()
      }, 3000)
    }
  }, [addUserQuery.isSuccess || editUserQuery.isSuccess, user])

  useEffect(() => {
    const errMsg = (addUserQuery.error as any)?.response?.data
    if (addUserQuery.error) {
      setAlert({ message: errMsg || 'Failed', type: 'error' })
      setShowAlert(true)
    }
  }, [addUserQuery.error])

  const handleAddLocation = (location: ILocation) => {
    setLocations((old) => (old ? [...old, location] : [location]))
  }

  const handleRemoveLocation = (index: number) => {
    setLocations((old) => old?.filter((item, i) => i !== index))
  }

  return (
    <PageContainer isLoading={getUserLocationsQuery.isLoading}>
      <ActionAlert
        type={alert.type}
        isShown={showAlert}
        setIsShown={setShowAlert}
        message={alert.message}
      />
      <VStack space={'20px'} alignItems={'center'}>
        <TextField
          name='name'
          placeholder={'Name'}
          label={'Name'}
          control={control}
          errorMessage={errors?.name?.message as string}
          setValue={setValue}
          defaultValue={user?.name || ''}
          required
        />
        <TextField
          name='email'
          placeholder={'Email'}
          label={'Email'}
          control={control}
          errorMessage={errors?.email?.message as string}
          setValue={setValue}
          defaultValue={user?.email || ''}
          required
        />
        <HStack
          width='100%'
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text fontSize={16} fontWeight={600}>
            Locations
          </Text>
          {!user && (
            <Button
              onPress={() =>
                navigation?.navigate(ScreensNames.AddLocation, {
                  handleAddLocation,
                })
              }
              variant='link'
            >
              Add +
            </Button>
          )}
        </HStack>
        {locations && (
          <VStack width='100%' space={'16px'}>
            {locations.map((item: ILocation, index) => (
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
                  {!user && (
                    <DeleteIcon
                      onPress={() => handleRemoveLocation(index)}
                      size={6}
                    />
                  )}
                </HStack>
              </CardContainer>
            ))}
          </VStack>
        )}
        <Button
          width={'100%'}
          onPress={handleSubmit(onSubmit)}
          isLoading={addUserQuery.isLoading || editUserQuery.isLoading}
        >
          Submit
        </Button>
      </VStack>
    </PageContainer>
  )
}

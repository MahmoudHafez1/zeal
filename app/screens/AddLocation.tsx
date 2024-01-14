import { Button, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useYupValidationResolver } from '../hooks/useYupResolver'
import * as Yup from 'yup'
import { TextField } from '../components/FormFields/TextField'
import { PageContainer } from '../components/PageContainer'
import { IStackNavigationProps } from '../types/StackScreenProps'
import { useMutation } from 'react-query'
import { apiAddLocation } from '../api/location'
import { ActionAlert } from '../components/ActionAlert'
import { ILocation } from '../types/Location'

const schema = Yup.object().shape({
  lat: Yup.number()
    .typeError('Please enter a valid number')
    .required('Required'),
  lng: Yup.number()
    .typeError('Please enter a valid number')
    .required('Required'),
})

export const AddLocation: React.FC<IStackNavigationProps> = ({
  navigation,
  route,
}) => {
  const user = (route?.params as any)?.user
  const handleAdd = (route?.params as any)?.handleAddLocation

  const [alert, setAlert] = useState<{ message: string; type: string }>({
    message: '',
    type: '',
  })
  const [showAlert, setShowAlert] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: useYupValidationResolver(schema),
  })

  const { mutate, isSuccess, error, isLoading } = useMutation(
    (body: ILocation) => apiAddLocation(user.email, body)
  )

  const onSubmit: SubmitHandler<ILocation> = (data) => {
    const body = {
      lat: data.lat,
      lng: data.lng,
    }
    if (user) {
      mutate(body)
    } else if (handleAdd) {
      handleAdd(body)
      navigation?.pop()
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setAlert({
        message: 'Added successfully',
        type: 'success',
      })
      setShowAlert(true)
    }
  }, [isSuccess])

  useEffect(() => {
    const errMsg = (error as any)?.response?.data
    if (error) {
      setAlert({ message: errMsg || 'Failed', type: 'error' })
      setShowAlert(true)
    }
  }, [error])

  return (
    <PageContainer>
      <ActionAlert
        type={alert.type}
        isShown={showAlert}
        setIsShown={setShowAlert}
        message={alert.message}
      />
      <VStack space={'20px'} alignItems={'center'}>
        <TextField
          name='lat'
          placeholder={'Lat'}
          label={'Lat'}
          control={control}
          errorMessage={errors?.lat?.message as string}
          required
        />
        <TextField
          name='lng'
          placeholder={'Lng'}
          label={'Lng'}
          control={control}
          errorMessage={errors?.lng?.message as string}
          required
        />

        <Button
          width={'100%'}
          mt={4}
          //@ts-ignore
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </VStack>
    </PageContainer>
  )
}

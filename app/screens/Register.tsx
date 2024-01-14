import React, { useEffect, useState } from 'react'
import { IStackNavigationProps } from '../types/StackScreenProps'
import { Button, Pressable, Text, VStack } from 'native-base'
import { PageContainer } from '../components/PageContainer'
import { ActionAlert } from '../components/ActionAlert'
import { TextField } from '../components/FormFields/TextField'
import { PasswordField } from '../components/FormFields/PasswordField'
import { IRegisterBody, apiRegister } from '../api/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useYupValidationResolver } from '../hooks/useYupResolver'
import * as Yup from 'yup'

const schema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

export const Register: React.FC<IStackNavigationProps> = ({ navigation }) => {
  const [alert, setAlert] = useState<{ message: string; type: string }>({
    message: '',
    type: '',
  })
  const [showAlert, setShowAlert] = useState(false)

  const { data, isLoading, error, mutate } = useMutation(
    (body: IRegisterBody) => apiRegister(body)
  )

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

  const onSubmit: SubmitHandler<IRegisterBody> = (data) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    }
    mutate(body)
  }

  useEffect(() => {
    if (data) {
      setAlert({
        message: 'Registered successfully, redirecting to login...',
        type: 'success',
      })
      setShowAlert(true)
      setTimeout(() => {
        navigation?.pop()
      }, 3000)
    }
  }, [data])

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
      <VStack alignItems='center' space={'20px'} pt={'30px'}>
        <Text fontSize={18} fontWeight={600}>
          Welcome
        </Text>
        <Text alignSelf={'flex-start'} fontSize={18} fontWeight={600}>
          Register
        </Text>
        <TextField
          name='name'
          placeholder={'Name'}
          label={'Name'}
          control={control}
          errorMessage={errors?.name?.message as string}
          required
        />
        <TextField
          name='email'
          placeholder={'Email'}
          label={'Email'}
          control={control}
          errorMessage={errors?.email?.message as string}
          required
        />
        <PasswordField
          name='password'
          label={'Password'}
          placeholder={'Password'}
          control={control}
          errorMessage={errors?.password?.message as string}
          required
        />

        <Button
          //@ts-ignore
          onPress={handleSubmit(onSubmit)}
          width='100%'
          mt='20px'
          isLoading={isLoading}
        >
          Submit
        </Button>
        <Pressable onPress={() => navigation?.pop()}>
          <Text>Already have account? Login</Text>
        </Pressable>
      </VStack>
    </PageContainer>
  )
}

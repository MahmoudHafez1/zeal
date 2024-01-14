import React, { useEffect, useState } from 'react'
import { IStackNavigationProps } from '../types/StackScreenProps'
import { Button, Pressable, Text, VStack } from 'native-base'
import { PageContainer } from '../components/PageContainer'
import { ActionAlert } from '../components/ActionAlert'
import { TextField } from '../components/FormFields/TextField'
import { PasswordField } from '../components/FormFields/PasswordField'
import { ILoginBody, apiLogin } from '../api/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useYupValidationResolver } from '../hooks/useYupResolver'
import * as Yup from 'yup'
import { ScreensNames } from '../navigation/screenNames'
import { useAuth } from '../hooks/useAuth'

const schema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required'),
})

export const Login: React.FC<IStackNavigationProps> = ({ navigation }) => {
  const { login: localLogin } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const {
    data,
    isLoading,
    error,
    mutate: handleLogin,
  } = useMutation((body: ILoginBody) => apiLogin(body))

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: useYupValidationResolver(schema),
  })

  const onSubmit: SubmitHandler<ILoginBody> = (data) => {
    const body = {
      email: data.email,
      password: data.password,
    }
    handleLogin(body)
  }

  useEffect(() => {
    if (data) {
      localLogin(data).then(() => {
        navigation?.navigate(ScreensNames.Users)
      })
    }
  }, [data])

  useEffect(() => {
    const errMsg = (error as any)?.response?.data?.error
    if (error) {
      setErrorMessage(errMsg || 'Failed to login')
      setShowError(true)
    }
  }, [error])
  return (
    <PageContainer>
      <ActionAlert
        type='error'
        isShown={showError}
        setIsShown={setShowError}
        message={errorMessage}
      />
      <VStack alignItems='center' space={'20px'} pt={'30px'}>
        <Text fontSize={18} fontWeight={600}>
          Welcome Back
        </Text>
        <Text alignSelf={'flex-start'} fontSize={18} fontWeight={600}>
          Login
        </Text>
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
        <Pressable onPress={() => navigation?.navigate(ScreensNames.Register)}>
          <Text>Register</Text>
        </Pressable>
      </VStack>
    </PageContainer>
  )
}

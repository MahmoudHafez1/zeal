import { Alert, Slide, Text } from 'native-base'
import React, { useEffect } from 'react'

interface IActionAlert {
  type: string
  message: string
  isShown: boolean
  setIsShown: (state: boolean) => void
  timeout?: number
}

export const ActionAlert: React.FC<IActionAlert> = ({
  type,
  message,
  isShown,
  setIsShown,
  timeout = 3000,
}) => {
  useEffect(() => {
    if (isShown === true)
      setTimeout(() => {
        setIsShown(false)
      }, timeout)
  }, [isShown])
  return (
    <Slide in={isShown} placement="top">
      <Alert
        justifyContent="center"
        status={type === 'success' ? 'success' : 'error'}
        safeAreaTop={8}
      >
        <Alert.Icon />
        <Text
          color={type === 'success' ? 'success.600' : 'error.600'}
          fontWeight="medium"
        >
          {message}
        </Text>
      </Alert>
    </Slide>
  )
}

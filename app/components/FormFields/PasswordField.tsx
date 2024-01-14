import { MaterialIcons } from '@expo/vector-icons'
import {
  FormControl,
  Icon,
  Input,
  Pressable,
  WarningOutlineIcon,
} from 'native-base'
import { useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'

interface PasswordFieldProps {
  name: string
  label: string
  placeholder: string
  control: Control
  errorMessage?: string
  defaultValue?: string
  required?: boolean
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  placeholder,
  control,
  errorMessage,
  defaultValue = '',
  required = false,
}) => {
  const [show, setShow] = useState(false)

  return (
    <FormControl isRequired={required} isInvalid={!!errorMessage}>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type={show ? 'text' : 'password'}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            size='lg'
            fontSize='13px'
            pt='10px'
            backgroundColor={'white'}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={MaterialIcons}
                  name={show ? 'visibility' : 'visibility-off'}
                  size={5}
                  ml='2'
                  color='muted.400'
                />
              </Pressable>
            }
          />
        )}
        name={name as string}
        defaultValue={defaultValue}
      />

      <FormControl.ErrorMessage
        textAlign='right'
        leftIcon={<WarningOutlineIcon size='xs' />}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}

import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import { Control, Controller } from 'react-hook-form'
import { useEffect } from 'react'

interface TextFieldProps {
  name: string
  type?: 'text' | 'number' | undefined
  label: string
  placeholder?: string
  control: Control
  errorMessage?: string
  defaultValue?: string
  required?: boolean
  disabled?: boolean
  setValue?: any
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  type,
  label,
  placeholder,
  control,
  errorMessage,
  defaultValue,
  setValue,
  required = false,
  disabled = false,
  ...props
}) => {
  useEffect(() => {
    if ((defaultValue || defaultValue === '') && setValue) {
      setValue(name, defaultValue)
    }
  }, [defaultValue, setValue])

  return (
    <FormControl isRequired={required} isInvalid={!!errorMessage}>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            placeholder={placeholder}
            fontSize='13px'
            onChangeText={onChange}
            type={'text'}
            value={value}
            size='lg'
            keyboardType={type === 'number' ? 'numeric' : 'default'}
            defaultValue={defaultValue || ''}
            isDisabled={disabled}
            backgroundColor={'white'}
            {...props}
          />
        )}
        name={name}
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

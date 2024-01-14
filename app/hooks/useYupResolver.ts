import { useCallback } from 'react'
import * as Yup from 'yup'

type Data = {
  [key: string]: any
}

type ValidationErrors = {
  [key: string]: {
    type: string
    message: string
  }
}

export const useYupValidationResolver = (
  validationSchema: Yup.ObjectSchema<any>
): ((data: Data) => Promise<{ values: Data; errors: ValidationErrors }>) =>
  useCallback(
    async (data: Data): Promise<{ values: Data; errors: ValidationErrors }> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (
              allErrors: ValidationErrors,
              currentError: Yup.ValidationError
            ) => ({
              ...allErrors,
              [currentError.path as string]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )

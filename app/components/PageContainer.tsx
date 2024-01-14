import { KeyboardAvoidingView, ScrollView, View, VStack } from 'native-base'
import React, { ReactNode } from 'react'
import { RefreshControl } from 'react-native'
import { Loading } from './Loading'

interface PageContainerProps {
  children: ReactNode
  isLoading?: boolean
  refresh?: () => void
  noScroll?: boolean
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  isLoading = false,
  refresh,
  noScroll,
}) => {
  if (isLoading) return <Loading />
  return (
    <KeyboardAvoidingView>
      {noScroll ? (
        <View
          p="16px"
          h="100%"
          backgroundColor={'background.400'}
          // @ts-ignore
          refreshControl={
            refresh ? (
              <RefreshControl refreshing={isLoading} onRefresh={refresh} />
            ) : (
              <RefreshControl refreshing={false} onRefresh={() => {}} />
            )
          }
        >
          <VStack mb="30px">{children}</VStack>
        </View>
      ) : (
        <ScrollView
          p="16px"
          h="100%"
          backgroundColor={'background.400'}
          refreshControl={
            refresh ? (
              <RefreshControl refreshing={isLoading} onRefresh={refresh} />
            ) : (
              <RefreshControl refreshing={false} onRefresh={() => {}} />
            )
          }
        >
          <VStack mb="30px">{children}</VStack>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  )
}

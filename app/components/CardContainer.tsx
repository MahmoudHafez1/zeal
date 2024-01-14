import { VStack, View } from 'native-base'
import { StyleSheet, ViewStyle } from 'react-native'

interface ICardContainer {
  style?: ViewStyle
  children: React.ReactNode
}

export const CardContainer: React.FC<ICardContainer> = ({
  style = {},
  children,
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <VStack space={2}>{children}</VStack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 4, height: 4 },
  },
})

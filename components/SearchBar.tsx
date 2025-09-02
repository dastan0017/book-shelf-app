import { icons } from '@/constants/icons'
import { Image, TextInput, View } from 'react-native'

interface Props {
  placeholder: string
  onPress?: () => void
  onChangeText?: (text: string) => void
  value: string
}
export default function SearchBar({ placeholder, onPress, onChangeText, value }: Props) {
  return (
    <View className="flex-row items-center gap-2 bg-dark-100 rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#AB8BFF" />
      <TextInput
        className="flex-1 text-white text-sm"
        placeholder={placeholder}
        placeholderTextColor="#AB8BFF"
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  )
}

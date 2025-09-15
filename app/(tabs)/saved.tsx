import { icons } from '@/constants/icons'
import { Image, Text, View } from 'react-native'

const Saved = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className="size-10" tintColor="white" />
        <Text className="text-gray-500 text-base font-bold">Saved</Text>
      </View>
    </View>
  )
}

export default Saved

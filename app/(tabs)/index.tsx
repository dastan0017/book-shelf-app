import SearchBar from '@/app/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { useRouter } from 'expo-router'
import { Image, ScrollView, View } from 'react-native'

export default function Index() {
  const router = useRouter()

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="min-h-[100%] pb-10"
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <SearchBar placeholder="Search for a book" onPress={() => router.push('/search')} />
      </ScrollView>
    </View>
  )
}

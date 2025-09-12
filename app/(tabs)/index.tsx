import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import TrendingCard from '@/components/TrendingCard'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { getTrendingMovies } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native'

export default function Index() {
  const router = useRouter()

  const {
    data: trendingMovies,
    error: trendingMoviesError,
    loading: trendingMoviesLoading,
  } = useFetch(() => getTrendingMovies())

  const {
    data: movies,
    error: moviesError,
    loading: moviesLoading,
  } = useFetch(() => fetchMovies({ query: '' }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5 border border-red-400"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="min-h-[100%] pb-10"
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError || trendingMoviesError ? (
          <Text>Error: {moviesError?.message || trendingMoviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push('/search')}
              value=""
            />

            {trendingMovies && (
              <View className="mt-5">
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingMovies}
                  renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                  keyExtractor={item => item.movie_id.toString()}
                  className="mt-2 pb-5"
                />
              </View>
            )}

            <Text className="text-lg text-white font-bold mb-3 mt-5">Latest Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={item => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                gap: 10,
                paddingRight: 5,
                paddingBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

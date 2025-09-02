import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

  // Debounce the search query to avoid fetching on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500) // Adjust delay as needed (500ms is a common debounce time)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const {
    data: movies,
    error: moviesError,
    loading: moviesLoading,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: debouncedQuery }))

  // Trigger fetch based on debouncedQuery, not searchQuery
  useEffect(() => {
    const fetchMoviesData = async () => {
      if (debouncedQuery.trim()) {
        await refetch()
      } else {
        reset()
      }
    }
    fetchMoviesData()
  }, [debouncedQuery])

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

      <View className="w-full flex-row justify-center mt-20 mb-5 items-center px-5">
        <SearchBar
          value={searchQuery}
          placeholder="Search for a movie"
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      {moviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
      ) : moviesError ? (
        <Text className="text-red-500 text-center my-5">Error: {moviesError?.message}</Text>
      ) : null}

      {!moviesLoading && !moviesError && debouncedQuery.trim() && movies?.length > 0 && (
        <Text className="text-white font-bold my-5 px-5">
          Search results for <Text className="text-accent font-bold">{debouncedQuery}</Text>
        </Text>
      )}

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={item => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 10,
          marginVertical: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          !moviesLoading && !moviesError && debouncedQuery.trim() && movies?.length === 0 ? (
            <Text className="text-white text-center my-5">No movies found</Text>
          ) : null
        }
      />
    </View>
  )
}

export default Search

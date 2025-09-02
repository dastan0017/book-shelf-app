import { useEffect, useState } from 'react'

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchFunction()
      setData(response)
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An unknown error occurred'))
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [])

  return { data, error, loading: isLoading, refetch: fetchData, reset }
}

export default useFetch

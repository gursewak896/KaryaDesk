import { useState, useEffect } from 'react'

export default function useFetch(fetchFn, deps = []) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const run = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetchFn()
                if (isMounted) setData(response.data)
            } catch (err) {
                if (isMounted) setError(err.message || 'Something went wrong')
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        run()

        return () => {
            isMounted = false
        }
    }, deps)

    return { data, loading, error }
}
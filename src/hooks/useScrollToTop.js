import { useEffect } from 'react'

export default function useScrollToTop(tag) {
  const scrollToTop = () => {
    useEffect(() => {
      window.scrollTo({ top: '0' })
    }, [tag])
  }

  return [scrollToTop]
}

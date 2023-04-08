import { useEffect, useRef, useState } from 'react'

export const useVisible = (
  { onlyFullyVisible } = { onlyFullyVisible: false }
) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const threshold = onlyFullyVisible ? 1 : 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(
          entry.isIntersecting || entry.intersectionRatio > threshold
        )
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, onlyFullyVisible])

  return [ref, isVisible]
}

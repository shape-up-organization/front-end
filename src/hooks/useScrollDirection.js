import { useEffect, useRef, useState } from 'react'

import { useLocation } from 'react-router-dom'

export const useScrollDirection = () => {
  const location = useLocation()

  const [scrollDirection, setScrollDirection] = useState('up')
  const currentScrollRef = useRef(null)
  const prevRef = useRef(null)
  const prevScrollY = useRef(null)

  const getScrollDirection = () => {
    if (!currentScrollRef.current) return
    if (currentScrollRef.current === prevRef.current) return

    prevRef.current = currentScrollRef.current

    const handleScroll = () => {
      const currentScrollY = currentScrollRef.current.scrollTop
      if (prevScrollY.current < currentScrollY) {
        setScrollDirection('down')
      } else if (prevScrollY.current > currentScrollY) {
        setScrollDirection('up')
      }
      prevScrollY.current = currentScrollY
    }

    prevRef?.current?.removeEventListener('scroll', handleScroll)
    currentScrollRef.current.addEventListener('scroll', handleScroll)
  }

  const forceScrollDirection = direction => setScrollDirection(direction)

  useEffect(() => {
    getScrollDirection()

    return () => {
      currentScrollRef?.current?.removeEventListener(
        'scroll',
        getScrollDirection
      )
    }
  }, [currentScrollRef.current, location])

  return [scrollDirection, currentScrollRef, forceScrollDirection]
}

import { useEffect } from 'react'

import { useChat } from '@contexts'

import { Drawer } from '@templates/Drawer'

import { Content } from './components/Content'
import { Header } from './components/Header'

const MessagesDrawer = () => {
  const { loadData, totalNotifications } = useChat()

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Drawer
      HeaderComponent={Header}
      ContentComponent={Content}
      notification={totalNotifications || 0}
      size="thinTall"
    />
  )
}

export { MessagesDrawer }

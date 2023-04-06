import P from 'prop-types'

import { Drawer } from '@templates/Drawer'

import { Content } from './components/Content'
import { Header } from './components/Header'

const ChatDrawer = ({ chatData }) => (
  <Drawer
    headerProps={{ chatData }}
    HeaderComponent={Header}
    ContentComponent={Content}
    notification={chatData?.unreadMessages || 0}
    size="small"
  />
)

ChatDrawer.propTypes = {
  chatData: P.object.isRequired,
}

export { ChatDrawer }

import { useEffect } from 'react'

import P from 'prop-types'

import { Stack } from '@mui/material'

import { Content } from './components/Content'

// const stompClient = null
const Chat = () => {
  // const [privateChats, setPrivateChats] = useState(new Map())
  // const [publicChats, setPublicChats] = useState([])
  // const [tab, setTab] = useState('CHATROOM')
  // const [userData, setUserData] = useState({
  //   username: '',
  //   receivername: '',
  //   connected: false,
  //   message: '',
  // })
  useEffect(() => {
    // console.log(userData)
  }, [])

  // const connect = () => {
  //   const Sock = new Socky('http://localhost:7000/ws')
  //   stompClient = over(Sock)
  //   stompClient.connect({}, onConnected, onError)
  // }

  // const onConnected = () => {
  //   setUserData({ ...userData, connected: true })
  //   stompClient.subscribe('/chatroom/public', onMessageReceived)
  //   stompClient.subscribe(
  //     `/user/${userData.username}/private`,
  //     onPrivateMessage
  //   )
  //   userJoin()
  // }

  // const userJoin = () => {
  //   const chatMessage = {
  //     senderName: userData.username,
  //     status: 'JOIN',
  //   }
  //   stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
  // }

  // const onMessageReceived = payload => {
  //   const payloadData = JSON.parse(payload.body)
  //   switch (payloadData.status) {
  //     case 'JOIN':
  //       if (!privateChats.get(payloadData.senderName)) {
  //         privateChats.set(payloadData.senderName, [])
  //         setPrivateChats(new Map(privateChats))
  //       }
  //       break
  //     case 'MESSAGE':
  //       publicChats.push(payloadData)
  //       setPublicChats([...publicChats])
  //       break
  //     default:
  //       break
  //   }
  // }

  // const onPrivateMessage = payload => {
  //   console.log(payload)
  //   const payloadData = JSON.parse(payload.body)
  //   if (privateChats.get(payloadData.senderName)) {
  //     privateChats.get(payloadData.senderName).push(payloadData)
  //     setPrivateChats(new Map(privateChats))
  //   } else {
  //     const list = []
  //     list.push(payloadData)
  //     privateChats.set(payloadData.senderName, list)
  //     setPrivateChats(new Map(privateChats))
  //   }
  // }

  // const onError = err => {
  //   console.log(err)
  // }

  // const handleMessage = event => {
  //   const { value } = event.target
  //   setUserData({ ...userData, message: value })
  // }

  // const sendValue = () => {
  //   if (stompClient) {
  //     const chatMessage = {
  //       senderName: userData.username,
  //       message: userData.message,
  //       status: 'MESSAGE',
  //     }
  //     console.log(chatMessage)
  //     stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
  //     setUserData({ ...userData, message: '' })
  //   }
  // }

  // const sendPrivateValue = () => {
  //   if (stompClient) {
  //     const chatMessage = {
  //       senderName: userData.username,
  //       receiverName: tab,
  //       message: userData.message,
  //       status: 'MESSAGE',
  //     }

  //     if (userData.username !== tab) {
  //       privateChats.get(tab).push(chatMessage)
  //       setPrivateChats(new Map(privateChats))
  //     }
  //     stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
  //     setUserData({ ...userData, message: '' })
  //   }
  // }

  // const handleUsername = event => {
  //   const { value } = event.target
  //   setUserData({ ...userData, username: value })
  // }

  // const registerUser = () => {
  //   connect()
  // }

  return (
    <Stack justifyContent="space-between" height="100%">
      <Content />
    </Stack>
  )
}

Chat.propTypes = {
  chatData: P.shape({
    name: P.string.isRequired,
    unreadMessages: P.number,
  }).isRequired,
}

export { Chat }

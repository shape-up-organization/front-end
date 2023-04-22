import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Grid } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { CardPost } from '@molecules/CardPost'

import { useChat } from '@contexts'
import postsGetMock from '@mocks/posts/get'

import { CardCreatePost } from '@molecules/CardCreatePost'
import { UserCard } from './components/UserCard'

const UserPage = () => {
  const [searchParams] = useSearchParams()
  const { chatsData, getUserData } = useChat()

  const [user, setUser] = useState(null)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [posts, setPosts] = useState([])

  const getData = async () => {
    const paramUsername = searchParams.get('username')
    const [{ data, status }, postsData] = await Promise.all([
      getUserData(paramUsername),
      postsGetMock.data.filter(post => post.username === paramUsername),
    ])
    setUser(data)
    setIsCurrentUser(status === 'current')
    setPosts(postsData)
  }

  useEffect(() => {
    if (!chatsData.deprecated) {
      getData()
    }
  }, [chatsData.deprecated, searchParams])

  return (
    user && (
      <AnimatedWrapper>
        <UserCard isCurrentUser={isCurrentUser} user={user} />
        <Grid container justifyContent="center" rowGap={4}>
          {isCurrentUser && (
            <Grid
              item
              xs={12}
              lg={9}
              xl={6}
              display="center"
              justifyContent="center"
            >
              <CardCreatePost />
            </Grid>
          )}
          {posts?.map(post => (
            <Grid
              item
              xs={12}
              lg={10}
              key={post.id}
              display="center"
              justifyContent="center"
            >
              <CardPost
                commentsAmount={post.commentsAmount}
                date={post.date}
                likes={post.likes}
                photos={post.photos}
                textContent={post.textContent}
                user={user}
              />
            </Grid>
          ))}
        </Grid>
      </AnimatedWrapper>
    )
  )
}

export { UserPage }

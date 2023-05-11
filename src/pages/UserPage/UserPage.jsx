import { useEffect, useState } from 'react'

import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { Grid, Stack } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { CardCreatePost } from '@molecules/CardCreatePost'
import { CardPost } from '@molecules/CardPost'

import apiPosts from '@api/services/posts'
import { useChat } from '@contexts'

import { UserCard } from './components/UserCard'

const UserPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { chatsData, getUserData } = useChat()

  const [user, setUser] = useState(null)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [posts, setPosts] = useState([])

  const getData = async () => {
    const paramUsername = searchParams.get('username')
    const [userPageData, postsData] = await Promise.all([
      getUserData(paramUsername),
      apiPosts.getPostsByUsername(paramUsername),
    ])

    if (userPageData.status === 404) {
      enqueueSnackbar(t('pages.search.snackbar.userNotFound'), {
        variant: 'error',
      })
      return
    }

    if (userPageData.status !== 200) {
      enqueueSnackbar(t('pages.search.snackbar.genericError'), {
        variant: 'error',
      })
      return
    }

    setUser(userPageData.data)
    setIsCurrentUser(userPageData.relation === 'current')
    setPosts(postsData.data || [])
  }

  useEffect(() => {
    if (!chatsData.deprecated) {
      getData()
    }
  }, [chatsData.deprecated, searchParams])

  return (
    <AnimatedWrapper>
      <Stack rowGap={4}>
        {user && (
          <>
            <UserCard
              handleReload={getData}
              isCurrentUser={isCurrentUser}
              user={user}
            />
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
                    commentsAmount={post.countComments}
                    date={post.createdAt}
                    id={post.id}
                    likes={post.countLike}
                    liked={post.liked}
                    photos={post.photoUrls}
                    textContent={post.description}
                    user={user}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Stack>
    </AnimatedWrapper>
  )
}

export { UserPage }

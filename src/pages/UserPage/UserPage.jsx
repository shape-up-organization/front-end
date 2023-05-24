import { useEffect, useState } from 'react'

import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { CircularProgress, Grid, Grow, Stack, Typography } from '@mui/material'

import { Photo } from '@atoms/Photo'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { CardCreatePost } from '@molecules/CardCreatePost'
import { CardPost } from '@molecules/CardPost'

import apiPosts from '@api/services/posts'
import notFoundGeneric from '@assets/images/not-found-generic.png'
import { useChat } from '@contexts'

import { UserCard } from './components/UserCard'

const UserPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { chatsData, getUserData } = useChat()

  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [user, setUser] = useState(null)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [posts, setPosts] = useState([])

  const getData = async () => {
    setIsLoadingPosts(true)
    const paramUsername = searchParams.get('username')
    const [userPageData, postsData] = await Promise.all([
      getUserData(paramUsername),
      apiPosts.getPostsByUsername(paramUsername),
    ])
    setIsLoadingPosts(false)

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
            <Grid container justifyContent="center" rowGap={2}>
              {isCurrentUser && (
                <Grid
                  item
                  xs={12}
                  lg={9}
                  xl={6}
                  display="center"
                  justifyContent="center"
                >
                  <CardCreatePost refreshFeed={getData} />
                </Grid>
              )}
              {/* eslint-disable-next-line no-nested-ternary */}
              {isLoadingPosts ? (
                <Stack alignItems="center" width="100%">
                  <CircularProgress />
                </Stack>
              ) : posts.length ? (
                posts?.map(post => (
                  <Grid
                    item
                    xs={12}
                    md={8}
                    lg={7}
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
                      refetch={getData}
                    />
                  </Grid>
                ))
              ) : (
                <Grid xs={12}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    textAlign="center"
                  >
                    <Grow in timeout={1000} unmountOnExit>
                      <Typography
                        color="primary"
                        fontWeight="900"
                        textTransform="uppercase"
                        variant="h6"
                        px={4}
                      >
                        {t('pages.feed.others.noPosts')}
                      </Typography>
                    </Grow>
                    <Stack
                      alignItems="center"
                      maxWidth={312}
                      px={4}
                      width="100%"
                    >
                      <Photo
                        alt={t('pages.feed.others.noPosts')}
                        animationSpeed={1000}
                        src={notFoundGeneric}
                        fit="contain"
                        shift="top"
                      />
                    </Stack>
                  </Stack>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Stack>
    </AnimatedWrapper>
  )
}

export { UserPage }

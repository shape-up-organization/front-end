import { useEffect, useLayoutEffect, useState } from 'react'

import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import {
  CircularProgress,
  Collapse,
  Grid,
  Grow,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

import { Photo } from '@atoms/Photo'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { CardCreatePost } from '@molecules/CardCreatePost'
import { CardPost } from '@molecules/CardPost'

import apiPosts from '@api/services/posts'
import notFoundGeneric from '@assets/images/not-found-generic.png'
import { useChat } from '@contexts'

import { useVisible } from '@hooks'
import { UserCard } from './components/UserCard'

const UserPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { chatsData, getUserData } = useChat()
  const [bottomRef, isBottomVisible] = useVisible()

  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [user, setUser] = useState(null)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [posts, setPosts] = useState([])
  const [searchQueryParams, setSearchParams] = useState({
    page: 0,
    size: 4,
  })

  const getData = async advancing => {
    setIsLoadingPosts(true)
    const queryParams = {
      page: advancing ? searchQueryParams.page + 1 : 0,
      size: searchQueryParams.size,
    }
    if (advancing)
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

    const paramUsername = searchParams.get('username')
    const [userPageData, postsData] = await Promise.all([
      getUserData(paramUsername),
      apiPosts.getPostsByUsername(paramUsername, queryParams),
    ])

    setTimeout(() => {
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

      if (!advancing) {
        setUser(userPageData.data)
        setIsCurrentUser(userPageData.relation === 'current')
      }

      setSearchParams(
        advancing ? queryParams : { page: 0, size: searchQueryParams.size }
      )
      setPosts([...(advancing ? posts : []), ...(postsData.data || [])])
    }, 1000)
  }

  useEffect(() => {
    if (!chatsData.deprecated) {
      getData()
    }
  }, [chatsData.deprecated, searchParams])

  useLayoutEffect(() => {
    if (isBottomVisible && !isLoadingPosts) {
      getData(true)
    }
  }, [isBottomVisible])

  return (
    <AnimatedWrapper>
      <Stack rowGap={4}>
        {user && (
          <>
            <UserCard
              handleReload={getData}
              isCurrentUser={isCurrentUser}
              user={user}
              refetch={getData}
            />
            <Grid container justifyContent="center" rowGap={1}>
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
              <Grid container item xs={12} md={8} lg={7}>
                <TransitionGroup style={{ width: '100%', marginBottom: 56 }}>
                  {posts?.map(post => (
                    <Collapse key={post.id} sx={{ mt: 6 }}>
                      <Grid
                        item
                        xs={12}
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
                    </Collapse>
                  ))}
                </TransitionGroup>
                {/* eslint-disable-next-line no-nested-ternary */}
                {isLoadingPosts ? (
                  <Collapse in sx={{ width: '100%' }}>
                    <Stack alignItems="center" mb={8} width="100%">
                      <CircularProgress />
                    </Stack>
                  </Collapse>
                ) : posts.length ? (
                  <Collapse in sx={{ width: '100%' }}>
                    <Stack alignItems="center" mb={8} width="100%">
                      <IconButton onClick={() => getData(true)}>
                        <ExpandMoreRoundedIcon
                          color="primary"
                          fontSize="large"
                        />
                      </IconButton>
                    </Stack>
                  </Collapse>
                ) : (
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
                )}
                <Stack
                  component="span"
                  minHeight="1px"
                  mt={-20}
                  ref={bottomRef}
                  width="100%"
                />
              </Grid>
            </Grid>
          </>
        )}
      </Stack>
    </AnimatedWrapper>
  )
}

export { UserPage }

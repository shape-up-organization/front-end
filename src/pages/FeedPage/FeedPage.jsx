import { useEffect, useLayoutEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { TransitionGroup } from 'react-transition-group'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import {
  Box,
  CircularProgress,
  Collapse,
  Grid,
  Grow,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Photo } from '@atoms/Photo'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { CardCreatePost } from '@molecules/CardCreatePost'
import { CardPost } from '@molecules/CardPost'
import { CardProfile } from '@molecules/CardProfile'
import { CardRank } from '@molecules/CardRank'

import apiPosts from '@api/services/posts'
import notFoundGeneric from '@assets/images/not-found-generic.png'
import { useChat } from '@contexts'
import { useVisible } from '@hooks'

const FeedPage = () => {
  const { t } = useTranslation()
  const { chatsData } = useChat()
  const lessThanExtraLarge = useMediaQuery(theme =>
    theme.breakpoints.down('xl')
  )
  const [bottomRef, isBottomVisible] = useVisible()

  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [posts, setPosts] = useState([])
  const [searchParams, setSearchParams] = useState({
    page: 0,
    size: 4,
  })

  const getData = async advancing => {
    setIsLoadingPosts(true)
    const queryParams = {
      page: advancing ? searchParams.page + 1 : 0,
      size: searchParams.size,
    }
    if (advancing)
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    const response = await apiPosts.getPosts(queryParams)

    setTimeout(() => {
      setIsLoadingPosts(false)
      if (response.status === 204) setPosts([])

      setSearchParams(
        advancing ? queryParams : { page: 0, size: searchParams.size }
      )
      setPosts([...(advancing ? posts : []), ...(response.data || [])])
    }, 1000)
  }

  useEffect(() => {
    if (!chatsData.deprecated) {
      getData()
    }
  }, [chatsData.deprecated])

  useLayoutEffect(() => {
    if (isBottomVisible && !isLoadingPosts) {
      getData(true)
    }
  }, [isBottomVisible])

  return (
    <AnimatedWrapper>
      <Grid
        container
        columnSpacing={1}
        justifyContent="center"
        height="100%"
        overflow="hidden"
      >
        {!lessThanExtraLarge && (
          <Grid item xs={0} lg={4} xl={3}>
            <CardProfile />
          </Grid>
        )}
        <Grid item xs={12} md={8} lg={7} xl={6} height="100%">
          <Stack height="100%" overflow="auto" width="100%">
            <Stack px={2} width="100%">
              <CardCreatePost refreshFeed={getData} />
            </Stack>
            <Stack height="100%" px={2} rowGap={8} width="100%">
              <TransitionGroup>
                {posts?.map(post => (
                  <Collapse key={post.id} sx={{ mt: 6 }}>
                    <Box
                      display="flex"
                      height="fit-content"
                      justifyContent="center"
                      width="100%"
                    >
                      <CardPost
                        commentsAmount={post.countComments}
                        date={post.createdAt}
                        id={post.id}
                        likes={post.countLike}
                        liked={post.liked}
                        photos={post.photoUrls}
                        textContent={post.description}
                        username={post.username}
                        refetch={getData}
                      />
                    </Box>
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
                      <ExpandMoreRoundedIcon color="primary" fontSize="large" />
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
                  <Stack alignItems="center" maxWidth={312} px={4} width="100%">
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
              />
            </Stack>
          </Stack>
        </Grid>
        {!lessThanExtraLarge && (
          <Grid item xs={0} lg={4} xl={3}>
            <CardRank />
          </Grid>
        )}
      </Grid>
    </AnimatedWrapper>
  )
}

export { FeedPage }

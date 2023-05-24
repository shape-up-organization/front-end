import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import {
  Box,
  CircularProgress,
  Grid,
  Grow,
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

const FeedPage = () => {
  const { t } = useTranslation()
  const { chatsData } = useChat()
  const lessThanExtraLarge = useMediaQuery(theme =>
    theme.breakpoints.down('xl')
  )

  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [posts, setPosts] = useState([])

  const getData = async () => {
    const response = await apiPosts.getPosts()
    setIsLoadingPosts(false)

    if (response.status === 204) setPosts([])

    setPosts(response.data || [])
  }

  useEffect(() => {
    if (!chatsData.deprecated) {
      getData()
    }
  }, [chatsData.deprecated])

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
          <Stack height="100%" overflow="auto" rowGap={4} width="100%">
            <Stack px={2} width="100%">
              <CardCreatePost refreshFeed={getData} />
            </Stack>
            <Stack height="100%" px={2} rowGap={8} width="100%">
              {/* eslint-disable-next-line no-nested-ternary */}
              {isLoadingPosts ? (
                <Stack alignItems="center" width="100%">
                  <CircularProgress />
                </Stack>
              ) : posts.length ? (
                posts?.map(post => (
                  <Box
                    key={post.id}
                    height="fit-content"
                    display="flex"
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
                      user={chatsData.friends.find(
                        friend => friend.username === post.username
                      )}
                      username={post.username}
                      refetch={getData}
                    />
                  </Box>
                ))
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

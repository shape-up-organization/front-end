import { useEffect, useState } from 'react'

import { Box, Grid, Stack, useMediaQuery } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { CardCreatePost } from '@molecules/CardCreatePost'
import { CardPost } from '@molecules/CardPost'
import { CardProfile } from '@molecules/CardProfile'
import { CardRank } from '@molecules/CardRank'

import apiPosts from '@api/services/posts'
import { useChat } from '@contexts'

const FeedPage = () => {
  const { chatsData } = useChat()
  const lessThanExtraLarge = useMediaQuery(theme =>
    theme.breakpoints.down('xl')
  )

  const [posts, setPosts] = useState([])

  const getData = async () => {
    const response = await apiPosts.getPosts()

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
              <CardCreatePost />
            </Stack>
            <Stack height="100%" px={2} rowGap={4} width="100%">
              {posts?.map(post => (
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
              ))}
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

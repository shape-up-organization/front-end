import { useEffect, useState } from 'react'

import { Grid, useMediaQuery } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { CardCreatePost } from '@molecules/CardCreatePost'
import { CardPost } from '@molecules/CardPost'
import { CardProfile } from '@molecules/CardProfile'
import { CardRank } from '@molecules/CardRank'

import { useChat } from '@contexts'
import postsGetMock from '@mocks/posts/get'

const FeedPage = () => {
  const { chatsData } = useChat()
  const lessThanExtraLarge = useMediaQuery(theme =>
    theme.breakpoints.down('xl')
  )

  const [posts, setPosts] = useState([])

  const getData = async () => setPosts(postsGetMock.data)

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
          <Grid container height="100%" overflow="auto" rowGap={4}>
            <Grid item xs={12} px={2}>
              <CardCreatePost />
            </Grid>
            <Grid container item height="100%" px={2} rowGap={4}>
              {posts?.map(post => (
                <Grid
                  item
                  xs={12}
                  key={post.id}
                  display="center"
                  justifyContent="center"
                >
                  <CardPost {...post} />
                </Grid>
              ))}
            </Grid>
          </Grid>
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

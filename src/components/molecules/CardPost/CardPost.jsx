import { useEffect, useState } from 'react'

import P from 'prop-types'

import { Box, Grid, Paper, Typography, useMediaQuery } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { Photo } from '@atoms/Photo'

import { useChat } from '@contexts'
import { charactersToLineBreaks } from '@utils/helpers/strings'

import { Carousel } from '@molecules/Carousel'
import { Footer } from './components/Footer'
import { UserButton } from './components/UserButton'

const CardPost = ({
  commentsAmount,
  date,
  id,
  likes,
  photos,
  textContent,
  liked,
  user,
  username,
  refetch,
}) => {
  const isLessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { getUserData } = useChat()

  const [userData, setUserData] = useState(user)

  const getUser = async () => {
    const { data } = await getUserData(username)
    setUserData(data)
  }

  useEffect(() => {
    if (!user) getUser()
  }, [])

  return (
    <Grid
      container
      component={Paper}
      height="fit-content"
      justifyContent="center"
      rowGap={1}
    >
      <Grid item xs={12}>
        {userData && (
          <UserButton
            date={date}
            selected={{
              ...userData,
              ...userData.friendshipStatus,
              postId: id,
            }}
            refetch={refetch}
          />
        )}
      </Grid>
      {textContent && (
        <Grid item xs={12} px={{ xs: 2, sm: 4 }}>
          <Typography
            color="text.secondary"
            sx={{ userSelect: 'text', wordBreak: 'break-word' }}
            variant="body2"
            whiteSpace="pre-wrap"
          >
            {charactersToLineBreaks(textContent)}
          </Typography>
        </Grid>
      )}
      {photos?.length > 0 && (
        <Grid
          item
          display="flex"
          justifyContent="center"
          padding={{
            xs: 0,
            sm: 2,
            maxHeight: isLessThanSmall ? 320 : 576,
          }}
          width="100%"
        >
          <Box
            boxShadow="none"
            component={Paper}
            height="100%"
            p={2}
            width="100%"
          >
            <Carousel>
              {photos.map(photoUrl => (
                <Photo
                  key={photoUrl}
                  alt={photoUrl}
                  animationSpeed={0}
                  src={photoUrl}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                />
              ))}
            </Carousel>
          </Box>
        </Grid>
      )}
      <Grid item xs={12}>
        <Divider color="disabled" size="small" />
      </Grid>
      <Grid container item pb={1} px={{ xs: 1, sm: 3 }}>
        <Footer
          commentsAmount={commentsAmount}
          likes={likes}
          postData={{
            id,
            photos,
            textContent,
            liked,
          }}
        />
      </Grid>
    </Grid>
  )
}

CardPost.propTypes = {
  commentsAmount: P.number,
  date: P.string.isRequired,
  id: P.string.isRequired,
  likes: P.number,
  liked: P.bool,
  photos: P.arrayOf(P.string.isRequired),
  textContent: P.string,
  user: P.object,
  username: P.string,
  refetch: P.func.isRequired,
}

CardPost.defaultProps = {
  commentsAmount: 0,
  likes: 0,
  liked: false,
  photos: [],
  textContent: '',
  user: null,
  username: '',
}

export { CardPost }

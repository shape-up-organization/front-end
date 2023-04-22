import { useEffect, useState } from 'react'

import P from 'prop-types'

import { Grid, Paper, Typography } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { Photo } from '@atoms/Photo'

import { useChat } from '@contexts'
import { charactersToLineBreaks } from '@utils/helpers/strings'

import { Footer } from './components/Footer'
import { UserButton } from './components/UserButton'

const CardPost = ({
  commentsAmount,
  date,
  likes,
  photos,
  textContent,
  user,
  username,
}) => {
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
      justifyContent="center"
      maxWidth={696}
      pb={1}
      rowGap={1}
    >
      <Grid item xs={12}>
        {userData && <UserButton date={date} selected={userData} />}
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
      {photos?.map(({ alt, src }) => (
        <Grid
          item
          key={alt}
          padding={{ xs: 0, sm: 2 }}
          display="flex"
          justifyContent="center"
        >
          <Photo
            sx={{ maxWidth: '464px', maxHeight: '576px' }}
            src={src}
            alt={alt}
            animationSpeed={0}
          />
        </Grid>
      ))}
      <Grid item xs={0} sm={12}>
        <Divider />
      </Grid>
      <Grid container item px={{ xs: 1, sm: 3 }}>
        <Footer commentsAmount={commentsAmount} likes={likes} />
      </Grid>
    </Grid>
  )
}

CardPost.propTypes = {
  commentsAmount: P.number,
  date: P.string.isRequired,
  likes: P.number,
  photos: P.arrayOf(
    P.shape({
      alt: P.string.isRequired,
      src: P.string.isRequired,
    })
  ),
  textContent: P.string,
  user: P.object,
  username: P.string,
}

CardPost.defaultProps = {
  commentsAmount: 0,
  likes: 0,
  photos: [],
  textContent: '',
  user: null,
  username: '',
}

export { CardPost }

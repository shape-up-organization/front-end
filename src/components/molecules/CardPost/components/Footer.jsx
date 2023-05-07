import { useState } from 'react'

import P from 'prop-types'

import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Button, Fade, Grid, Grow, Stack, Typography } from '@mui/material'
import { CardViewPost } from './CardViewPost'

const Footer = ({ commentsAmount, likes, postData }) => {
  const [liked, setLiked] = useState(false)
  const [openCardPostView, setOpenCardPostView] = useState(false)

  const handleLikePost = () => setLiked(current => !current)

  const handleOpenCardPostView = () => setOpenCardPostView(true)
  const handleCloseCardPostView = () => setOpenCardPostView(false)

  return (
    <>
      <Grid container item px={{ xs: 1, sm: 3 }}>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack
            alignItems="center"
            columnGap={1}
            direction="row"
            justifyContent="center"
            width="100%"
          >
            <Stack alignItems="center" direction="row">
              <Button
                endIcon={
                  liked ? (
                    <Grow in>
                      <FavoriteRoundedIcon color="primary" />
                    </Grow>
                  ) : (
                    <Fade in>
                      <FavoriteBorderRoundedIcon />
                    </Fade>
                  )
                }
                onClick={handleLikePost}
              >
                {likes > 0 && (
                  <Typography
                    display="inline"
                    color="disabled"
                    fontWeight={700}
                    variant="body2"
                  >
                    {likes > 99 ? '99+' : likes}
                  </Typography>
                )}
              </Button>
            </Stack>
            <Stack alignItems="center" direction="row">
              <Button
                onClick={handleOpenCardPostView}
                startIcon={<ChatBubbleOutlineRoundedIcon />}
              >
                {commentsAmount > 0 && (
                  <Typography
                    display="inline"
                    color="disabled"
                    fontWeight={700}
                    variant="body2"
                  >
                    {commentsAmount > 99 ? '99+' : commentsAmount}
                  </Typography>
                )}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <CardViewPost
        handleClose={handleCloseCardPostView}
        open={openCardPostView}
        postData={postData}
      />
    </>
  )
}

Footer.propTypes = {
  commentsAmount: P.number,
  likes: P.number,
  postData: P.object.isRequired,
}

Footer.defaultProps = {
  commentsAmount: 0,
  likes: 0,
}

export { Footer }

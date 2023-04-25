import { useState } from 'react'

import P from 'prop-types'

import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'

const Footer = ({ commentsAmount, likes }) => {
  const [expanded, setExpanded] = useState(false)
  const [commentsAnchorEl, setCommentsAnchorEl] = useState(null)
  const [liked, setLiked] = useState(false)

  const likePost = () => setLiked(current => !current)

  const handleExpandComments = () => {
    setExpanded(!expanded)
  }

  const handleOpenCommentSettings = event => {
    setCommentsAnchorEl(event.currentTarget)
  }
  const handleCloseCommentSettings = () => {
    setCommentsAnchorEl(null)
  }

  return (
    <>
      <Grid container item px={{ xs: 1, sm: 3 }}>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack direction="row" gap={0} alignItems="center">
            <>
              <IconButton onClick={likePost}>
                {liked ? (
                  <FavoriteRoundedIcon color="primary" />
                ) : (
                  <FavoriteBorderRoundedIcon />
                )}
              </IconButton>
              <Typography
                display="inline"
                color="disabled"
                fontWeight={700}
                variant="body2"
                mr={2}
              >
                {likes > 99 ? '99+' : likes}
              </Typography>
            </>
            <>
              <IconButton>
                <ChatBubbleOutlineRoundedIcon />
              </IconButton>
              <Typography
                display="inline"
                color="disabled"
                fontWeight={700}
                variant="body2"
              >
                {commentsAmount > 99 ? '99+' : commentsAmount}
              </Typography>
            </>
          </Stack>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleExpandComments}>
              <ExpandMoreRoundedIcon fontSize="small" />
            </IconButton>
            <Typography display="inline" variant="body2">
              comentários
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CardHeader
            avatar={<Avatar currentUser />}
            action={
              <IconButton onClick={handleOpenCommentSettings}>
                <MoreHorizRoundedIcon />
                <Menu
                  anchorEl={commentsAnchorEl}
                  open={!!commentsAnchorEl}
                  onClose={handleCloseCommentSettings}
                >
                  <MenuItem onClick={handleCloseCommentSettings}>
                    Compartilhar
                  </MenuItem>
                  <MenuItem onClick={handleCloseCommentSettings}>
                    Excluir
                  </MenuItem>
                </Menu>
              </IconButton>
            }
            title="Vitao cantor"
            subheader="Terça 04/2023"
          />
        </CardContent>
      </Collapse>
    </>
  )
}

Footer.propTypes = {
  commentsAmount: P.number,
  likes: P.number,
}

Footer.defaultProps = {
  commentsAmount: 0,
  likes: 0,
}

export { Footer }

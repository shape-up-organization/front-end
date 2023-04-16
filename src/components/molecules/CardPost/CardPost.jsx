import { Avatar } from '@atoms/Avatar'
import styled from '@emotion/styled'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import P from 'prop-types'
import { useState } from 'react'

const CardPost = ({
  name,
  date,
  caption,
  srcImagePost,
  altImagePost,
  qtdLikes,
  qtdComent,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const ExpandMore = styled(props => {
    const { ...other } = props
    return <IconButton {...other} />
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }))
  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            avatar={<Avatar currentUser />}
            action={
              <IconButton aria-label="settings">
                <MoreHorizIcon onClick={handleClick} />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Compartilhar</MenuItem>
                  <MenuItem onClick={handleClose}>Excluir</MenuItem>
                </Menu>
              </IconButton>
            }
            title={name}
            subheader={date}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {caption}
            </Typography>
          </CardContent>
          <Grid item padding={2}>
            <CardMedia
              component="img"
              height="194"
              image={srcImagePost}
              alt={altImagePost}
            />
          </Grid>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteBorderIcon />
              <Typography variant="body2">{qtdLikes}</Typography>
            </IconButton>
            <IconButton aria-label="add comment">
              <ChatBubbleOutlineIcon />
              <Typography variant="body2">{qtdComent}</Typography>
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
            <Typography variant="body2">ver comentarios</Typography>
          </CardActions>
        </Card>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardHeader
              avatar={<Avatar currentUser />}
              action={
                <IconButton aria-label="settings">
                  <MoreHorizIcon onClick={handleClick} />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Compartilhar</MenuItem>
                    <MenuItem onClick={handleClose}>Excluir</MenuItem>
                  </Menu>
                </IconButton>
              }
              title="Vitao cantor"
              subheader="Terça 04/2023"
            />
          </CardContent>
        </Collapse>
      </Grid>
    </Grid>
  )
}
CardPost.propTypes = {
  name: P.string.isRequired,
  date: P.string.isRequired,
  caption: P.string.isRequired,
  srcImagePost: P.string,
  altImagePost: P.string,
  qtdLikes: P.number.isRequired,
  qtdComent: P.number.isRequired,
}
CardPost.defaultProps = {
  srcImagePost: '',
  altImagePost: '',
}
export { CardPost }

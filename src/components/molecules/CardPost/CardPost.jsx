import {
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useState } from 'react'
import { AvatarPhoto } from '@atoms/AvatarPhoto'

const CardPost = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card sx={6}>
      <CardHeader
        avatar={
          <AvatarPhoto
            alt="oi"
            src="https://avesexoticas.org/wp-content/uploads/2017/07/Anas_platyrhynchos_qtl1.jpg"
          />
        }
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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Retiro de yoga no feriadão com o professor @Jeffz
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        image="https://placehold.co/400"
        alt="era uma vez uma foto"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
          <Typography variant="body2">157 curtidas</Typography>
        </IconButton>
        <IconButton aria-label="add comment">
          <ChatBubbleOutlineIcon />
          <Typography variant="body2">13 comentarios</Typography>
        </IconButton>
      </CardActions>
    </Card>
  )
}
export { CardPost }

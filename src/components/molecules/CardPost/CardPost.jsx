import {
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Photo } from '@atoms/Photo'
import ShareIcon from '@mui/icons-material/Share'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const CardPost = () => (
  <Card sx={4}>
    <CardHeader
      avatar={
        <Avatar aria-label="recipe">
          <Photo />
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
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
    <CardContent>
      <Typography>#yoga #retiro</Typography>
    </CardContent>
    <CardMedia
      component="img"
      height="194"
      image="/static/images/cards/paella.jpg"
      alt="era uma vez uma foto"
    />
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton aria-label="add comment">
        <ChatBubbleOutlineIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </CardActions>
  </Card>
)
export { CardPost }

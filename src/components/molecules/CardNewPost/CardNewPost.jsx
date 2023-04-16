import {
  Card,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'

const CardNewPost = () => (
  <Grid container component={Card} xs={12}>
    <Grid container item xs={12} spacing={2} padding={3}>
      <Grid item xs={12}>
        <TextField
          label="Compartilhe seu Progresso"
          multiline
          maxRows={4}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton>
          <InsertPhotoOutlinedIcon />
        </IconButton>
        <Typography variant="body2">Fotos/Video</Typography>
      </Grid>
    </Grid>
  </Grid>
)

export { CardNewPost }

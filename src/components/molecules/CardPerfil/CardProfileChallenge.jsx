import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const CardProfileChallenge = () => (
  <Grid container xs={12}>
    <Grid container item xs={12}>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>Desafios Diarios</Typography>
        <IconButton aria-label="nextPage">
          <NavigateNextIcon />
        </IconButton>
      </Grid>
    </Grid>
    <Grid container item xs={12} justifyContent="center">
      <Grid item xs={10}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Correr por 30 minutos"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Prancha por 2.5 minutos"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Prancha por 2.5 minutos"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Prancha por 2.5 minutos"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Prancha por 2.5 minutos"
          />
        </FormGroup>
      </Grid>
    </Grid>
  </Grid>
)
export { CardProfileChallenge }

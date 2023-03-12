import P from 'prop-types'

import { Photo } from '@components/Photo'

import { Button, Grid, Typography } from '@mui/material'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'

const Banner = ({ handleOpenSignup }) => {
  return (
    <Grid container>
      <Grid container item xs={12} lg={6}>
        <Grid item xs={12}>
          <Typography variant="h3">Seu impulso estético</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid item alignItems="center" display="flex" gap={2} xs={12}>
            <FitnessCenterIcon
              color="primary"
              sx={{ fontSize: theme => theme.spacing(5) }}
            />
            <Typography variant="h6">
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                Compartilhe{' '}
              </Typography>
              seu{' '}
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                progresso{' '}
              </Typography>
              com os amigos
            </Typography>
          </Grid>
          <Grid item alignItems="center" display="flex" gap={2} xs={12}>
            <CalendarMonthIcon
              color="primary"
              sx={{ fontSize: theme => theme.spacing(5) }}
            />
            <Typography variant="h6">
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                Participe{' '}
              </Typography>
              de{' '}
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                eventos{' '}
              </Typography>
              da comunidade
            </Typography>
          </Grid>
          <Grid item alignItems="center" display="flex" gap={2} xs={12}>
            <SportsEsportsOutlinedIcon
              color="primary"
              sx={{ fontSize: theme => theme.spacing(5) }}
            />
            <Typography variant="h6">
              Uma rede social{' '}
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                gameficada
              </Typography>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} pt={2}>
          <Grid item xs={3}>
            <Button fullWidth onClick={handleOpenSignup} variant="contained">
              EVOLUA JÁ
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Photo />
      </Grid>
    </Grid>
  )
}

Banner.propTypes = { handleOpenSignup: P.func.isRequired }

export { Banner }

import P from 'prop-types'

import { Photo } from '@atoms/Photo'

import landingPageImage from '@assets/images/landing-page.png'

import { Button, Grid, Typography } from '@mui/material'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'

import { useStyles } from './Banner.styles'

const Banner = ({ handleOpenSignup }) => {
  const classes = useStyles()

  return (
    <>
      <Grid
        container
        item
        className={classes.container}
        rowSpacing={6}
        xs={12}
        lg={6}
      >
        <Grid
          container
          item
          className={classes.title}
          alignItems="end"
          mt={4}
          xs={12}
        >
          <Grid item width="100%">
            <Typography fontWeight="600" variant="h3">
              Seu impulso estético
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.bullets} rowSpacing={4} xs={12}>
          <Grid item alignItems="center" display="flex" gap={2} xs={12}>
            <FitnessCenterIcon
              color="primary"
              sx={{ fontSize: theme => theme.typography.pxToRem(40) }}
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
              sx={{ fontSize: theme => theme.typography.pxToRem(40) }}
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
              sx={{ fontSize: theme => theme.typography.pxToRem(40) }}
            />
            <Typography variant="h6">
              Uma rede social{' '}
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                gamificada
              </Typography>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.buttonWrapper} xs={12} pt={2}>
          <Grid item xs={6} sm={4} md={3} lg={3} xl={2}>
            <Button fullWidth onClick={handleOpenSignup} variant="contained">
              EVOLUA JÁ
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Photo
          alt="Mulher se exercitando em uma bola de yoga"
          className={classes.image}
          fit="contain"
          shift="left"
          src={landingPageImage}
        />
      </Grid>
    </>
  )
}

Banner.propTypes = { handleOpenSignup: P.func.isRequired }

export { Banner }

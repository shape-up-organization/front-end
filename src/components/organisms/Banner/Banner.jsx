import P from 'prop-types'

import { useTranslation } from 'react-i18next'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import { Button, Grid, Typography } from '@mui/material'

import { Photo } from '@atoms/Photo'

import landingPageImage from '@assets/images/landing-page.png'
import { useStyles } from './Banner.styles'

const Banner = ({ handleOpenSignup }) => {
  const { t } = useTranslation()

  const { classes } = useStyles()

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
              {t('pages.landing.banner.title')}
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
                {t('pages.landing.banner.bullet1.1')}
              </Typography>
              {t('pages.landing.banner.bullet1.2')}
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                {t('pages.landing.banner.bullet1.3')}
              </Typography>
              {t('pages.landing.banner.bullet1.4')}
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
                {t('pages.landing.banner.bullet2.1')}
              </Typography>
              {t('pages.landing.banner.bullet2.2')}
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                {t('pages.landing.banner.bullet2.3')}
              </Typography>
              {t('pages.landing.banner.bullet2.4')}
            </Typography>
          </Grid>
          <Grid item alignItems="center" display="flex" gap={2} xs={12}>
            <SportsEsportsOutlinedIcon
              color="primary"
              sx={{ fontSize: theme => theme.typography.pxToRem(40) }}
            />
            <Typography variant="h6">
              {t('pages.landing.banner.bullet3.1')}
              <Typography
                color="primary"
                component="span"
                display="inline"
                variant="h6"
              >
                {t('pages.landing.banner.bullet3.2')}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.buttonWrapper} xs={12} pt={2}>
          <Grid item xs={6} sm={4} md={3} lg={3} xl={2}>
            <Button fullWidth onClick={handleOpenSignup} variant="contained">
              {t('pages.landing.banner.button')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Photo
          alt={t('pages.landing.alt.landingPageImageAlt')}
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

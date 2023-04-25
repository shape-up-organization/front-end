import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Button, Grid, Typography, useMediaQuery } from '@mui/material'

import { Photo } from '@atoms/Photo'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { LoginModal } from '@molecules/LoginModal'
import { SignupModal } from '@molecules/SignupModal'

import aboutUsImg from '@assets/images/about-us.png'

const AboutTab = () => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const handleOpenLogin = () => setIsLoginOpen(true)
  const handleCloseLogin = () => setIsLoginOpen(false)
  const handleCloseSignup = () => setIsSignupOpen(false)

  const switchModal = () => {
    setIsLoginOpen(prevIsLoginOpen => !prevIsLoginOpen)
    setIsSignupOpen(prevIsSignupOpen => !prevIsSignupOpen)
  }

  return (
    <AnimatedWrapper>
      <Grid container rowGap={2}>
        <Grid container item xs={12} md={4}>
          <Grid container height="fit-content" rowGap={{ xs: 4, md: 8 }}>
            <Grid item xs={12}>
              <Typography
                textAlign={{ xs: 'center', md: 'left' }}
                variant={lessThanMedium ? 'body1' : 'h6'}
              >
                {t('pages.help.aboutUs.texts.1')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                textAlign={{ xs: 'center', md: 'left' }}
                variant={lessThanMedium ? 'body1' : 'h6'}
              >
                {t('pages.help.aboutUs.texts.2')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth onClick={handleOpenLogin} variant="contained">
                {t('pages.help.aboutUs.buttonJoin')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Photo
            alt={t('pages.help.aboutUs.altImage')}
            animationSpeed={0}
            src={aboutUsImg}
            fit="contain"
          />
        </Grid>
      </Grid>
      <LoginModal
        isOpen={isLoginOpen}
        handleClose={handleCloseLogin}
        switchModal={switchModal}
      />
      <SignupModal
        isOpen={isSignupOpen}
        handleClose={handleCloseSignup}
        switchModal={switchModal}
      />
    </AnimatedWrapper>
  )
}

export { AboutTab }

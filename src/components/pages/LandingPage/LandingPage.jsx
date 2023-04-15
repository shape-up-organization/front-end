import { useState } from 'react'

import { Grid, useMediaQuery, useTheme } from '@mui/material'

import { LoginModal } from '@molecules/LoginModal'
import { SignupModal } from '@molecules/SignupModal'
import { Banner } from '@organisms/Banner'
import { Footer } from '@organisms/Footer'
import { Header } from '@organisms/Header'

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const lessThanMedium = useMediaQuery(useTheme().breakpoints.down('md'))

  const switchModal = () => {
    setIsLoginOpen(prevIsLoginOpen => !prevIsLoginOpen)
    setIsSignupOpen(prevIsSignupOpen => !prevIsSignupOpen)
  }

  const handleOpenModals = {
    handleOpenLogin: () => setIsLoginOpen(true),
    handleOpenSignup: () => setIsSignupOpen(true),
  }

  return (
    <>
      <Grid container justifyContent="center" minHeight="100vh">
        <Grid item xs={10}>
          <Header handleOpenModals={handleOpenModals} />
        </Grid>
        <Grid container item xs={10} minHeight="48vh" alignItems="center">
          <Banner handleOpenSignup={handleOpenModals.handleOpenSignup} />
        </Grid>
        {!lessThanMedium && (
          <Grid container item xs={10}>
            <Grid
              item
              alignItems="flex-end"
              display="flex"
              py={4}
              xs={12}
              lg={6}
            >
              <Grid
                container
                item
                alignItems="center"
                justifyContent="space-between"
                xs={12}
                lg={8}
              >
                <Footer showCircles />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <LoginModal
        isOpen={isLoginOpen}
        handleClose={() => setIsLoginOpen(prevIsLoginOpen => !prevIsLoginOpen)}
        switchModal={switchModal}
      />
      <SignupModal
        isOpen={isSignupOpen}
        handleClose={() =>
          setIsSignupOpen(prevIsSignupOpen => !prevIsSignupOpen)
        }
        switchModal={switchModal}
      />
    </>
  )
}

export { LandingPage }

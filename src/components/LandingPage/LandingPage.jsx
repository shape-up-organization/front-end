import { useState } from 'react'

import { Grid } from '@mui/material'

import { LoginModal, SignupModal } from '@components/Modal'
import { Banner } from '../Banner'
import { Footer } from '../Footer'
import { Header } from '../Header'

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

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
        <Grid container item xs={10}>
          <Grid item display="flex" alignItems="flex-end" py={4} xs={12} lg={6}>
            <Grid item xs={12} lg={8}>
              <Footer />
            </Grid>
          </Grid>
        </Grid>
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

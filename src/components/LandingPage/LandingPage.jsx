import { useState } from 'react'

import Grid from '@mui/material/Grid'

import { LoginModal, SignupModal } from '@components/Modal'
import { Banner } from '../Banner'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Photo } from '../Photo'

const LandingPage = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  const switchModal = () => {
    if (loginOpen && !signupOpen) {
      setLoginOpen(false)
      setSignupOpen(true)
    } else if (signupOpen && !loginOpen) {
      setSignupOpen(false)
      setLoginOpen(true)
    }
  }

  return (
    <>
      <Grid container height="100vh" display={'flex'}>
        <Grid container height="10vh">
          <Header openModals={{ setLoginOpen, setSignupOpen }} />
        </Grid>
        <Grid container>
          <Grid
            item
            xs={5.5}
            height={'90vh'}
            display={'flex'}
            direction={'column'}
          >
            <Grid
              item
              xs={11}
              display={'flex'}
              paddingLeft={12}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Banner />
            </Grid>
            <Grid item xs={1} display={'flex'} direction={'column-reverse'}>
              <Footer />
            </Grid>
          </Grid>
          <Grid
            item
            xs={6.5}
            height={'90vh'}
            display={'flex'}
            direction={'column-reverse'}
          >
            <Photo />
          </Grid>
        </Grid>
      </Grid>
      <LoginModal
        open={loginOpen}
        handleClose={() => setLoginOpen(prevLoginOpen => !prevLoginOpen)}
        switchModal={switchModal}
      />
      <SignupModal
        open={signupOpen}
        handleClose={() => setSignupOpen(prevSignupOpen => !prevSignupOpen)}
      />
    </>
  )
}

export { LandingPage }

import { useEffect, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import Close from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Button,
  DialogTitle,
  Drawer,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import dogPic from '@assets/images/dog.png'
import { Photo } from '@atoms/Photo'
import { Footer } from '@organisms/Footer'
import { useStyles } from './Header.styles'

const Header = ({ handleOpenModals }) => {
  const { handleOpenLogin, handleOpenSignup } = handleOpenModals

  const { t } = useTranslation()

  const [showDrawer, setShowDrawer] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const lessThanMedium = useMediaQuery(useTheme().breakpoints.down('md'))
  const { classes } = useStyles()

  useEffect(() => {
    setShowMenu(lessThanMedium)
    if (showDrawer) {
      setShowDrawer(lessThanMedium)
    }
  }, [lessThanMedium])

  const toggleNavMenu = () => {
    setShowDrawer(prevShowDrawer => !prevShowDrawer)
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      paddingTop={4}
    >
      <Grid item xs={4} sm={7} md={8} lg={9}>
        <Typography color="primary" fontWeight="bold" variant="h5">
          ShapeUp
        </Typography>
      </Grid>
      <Grid container item xs={7} sm={5} md={4} lg={3}>
        {showMenu ? (
          <Box display="flex" justifyContent="right" width="100%">
            <IconButton
              size="large"
              aria-controls="menu-header"
              aria-haspopup="true"
              onClick={toggleNavMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            <Grid item xs={6}>
              <Button fullWidth onClick={handleOpenLogin}>
                {t('pages.landing.header.buttonSignIn')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth onClick={handleOpenSignup} variant="contained">
                {t('pages.landing.header.buttonSignUp')}
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawerPaper }}
        open={showDrawer}
        onClose={toggleNavMenu}
      >
        <DialogTitle display="flex" justifyContent="flex-end">
          <IconButton onClick={toggleNavMenu}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Grid container justifyContent="center" height="100%">
          <Grid
            container
            item
            display="flex"
            direction="column"
            justifyContent="space-between"
            xs={10}
          >
            <Grid container item direction="column" rowSpacing={2}>
              <Grid item>
                <Button fullWidth onClick={handleOpenLogin}>
                  {t('pages.landing.header.buttonSignIn')}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  onClick={handleOpenSignup}
                  variant="contained"
                >
                  {t('pages.landing.header.buttonSignUp')}
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Photo
                animationSpeed={0}
                alt={t('pages.landing.alt.menuGreenDog')}
                className={classes.dogPic}
                fit="contain"
                src={dogPic}
              />
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="column"
              mb={2}
              rowSpacing={2}
            >
              <Footer />
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </Grid>
  )
}

Header.propTypes = {
  handleOpenModals: P.objectOf(P.func).isRequired,
}

export { Header }

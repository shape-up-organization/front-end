import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import { useAuth, useChat } from '@contexts'

import { AboutTab } from './tabs/AboutTab'
import { PrivacyPolicyTab } from './tabs/PrivacyPolicyTab'
import { TeamTab } from './tabs/TeamTab'
import { TermsOfUseTab } from './tabs/TermsOfUseTab'

const sectionsTabs = {
  aboutUs: {
    component: () => <AboutTab />,
  },
  team: {
    component: () => <TeamTab />,
  },
  termsOfUse: {
    component: () => <TermsOfUseTab />,
  },
  privacyPolicy: {
    component: () => <PrivacyPolicyTab />,
  },
}

const HelpPage = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { getJwtToken } = useAuth()
  const { updateUserData } = useChat()

  const [sectionTab, setSectionTab] = useState(
    location?.state?.section || 'aboutUs'
  )

  const handleChangeTab = (_, newTab) => setSectionTab(newTab)

  const goToHome = () => {
    if (getJwtToken()) {
      updateUserData({ connected: false })
      navigate('/feed')
      return
    }

    navigate('/')
  }

  return (
    <AnimatedWrapper>
      <Box bgcolor="background.default" minHeight="100vh">
        <Grid
          container
          justifyContent="center"
          px={{ xs: 2, sm: 6, md: 12, lg: 24 }}
          rowGap={4}
        >
          <Grid container item xs={12} alignItems="center" pt={4} rowGap={2}>
            <Grid item xs={12} md={6}>
              <Button onClick={goToHome}>
                <Typography
                  color="primary"
                  fontWeight="bold"
                  textAlign={{ xs: 'center', md: 'left' }}
                  textTransform="none"
                  variant="h5"
                >
                  ShapeUp
                </Typography>
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent={{ xs: 'center', md: 'flex-end' }}
            >
              <Tabs
                allowScrollButtonsMobile
                onChange={handleChangeTab}
                scrollButtons="auto"
                value={sectionTab}
                variant="scrollable"
              >
                {Object.keys(sectionsTabs).map(tab => (
                  <Tab
                    key={tab}
                    icon={sectionsTabs[tab].icon}
                    iconPosition="start"
                    label={t(`pages.help.tabs.${tab}`)}
                    value={tab}
                  />
                ))}
              </Tabs>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="primary"
              fontWeight="bold"
              textAlign={{ xs: 'center', md: 'left' }}
              variant="h4"
            >
              {t(`pages.help.tabs.${sectionTab}`)}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            {sectionsTabs[sectionTab].component()}
          </Grid>
        </Grid>
      </Box>
    </AnimatedWrapper>
  )
}

export { HelpPage }

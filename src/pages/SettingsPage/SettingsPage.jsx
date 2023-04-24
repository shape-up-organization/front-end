import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import BrushRoundedIcon from '@mui/icons-material/BrushRounded'
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import { Grid, Paper, Tab, Tabs, useMediaQuery } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import { AccountTab } from './components/tabs/AccountTab'
import { CustomizationTab } from './components/tabs/CustomizationTab'
import { HelpTab } from './components/tabs/HelpTab'
import { NotificationsTab } from './components/tabs/NotificationsTab'

const settingsTabElements = {
  account: {
    component: () => <AccountTab />,
    icon: <AccountCircleRoundedIcon />,
  },
  customization: {
    component: () => <CustomizationTab />,
    icon: <BrushRoundedIcon />,
  },
  notifications: {
    component: () => <NotificationsTab />,
    icon: <CircleNotificationsRoundedIcon />,
  },
  help: {
    component: () => <HelpTab />,
    icon: <HelpRoundedIcon />,
  },
}

const SettingsPage = () => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [settingsTab, setSettingsTab] = useState('account')

  const handleChangeTab = (_, newTab) => setSettingsTab(newTab)

  return (
    <AnimatedWrapper>
      <Grid
        container
        columnGap={6}
        justifyContent="center"
        height="100%"
        overflow="hidden"
      >
        <Grid item xs={12} md={3} xl={2} zIndex={theme => theme.zIndex.fab}>
          <Tabs
            component={Paper}
            onChange={handleChangeTab}
            orientation={lessThanMedium ? 'horizontal' : 'vertical'}
            scrollButtons="auto"
            allowScrollButtonsMobile
            value={settingsTab}
            variant={lessThanMedium ? 'scrollable' : 'fullWidth'}
            TabIndicatorProps={{
              sx: {
                left: 0,
                width: 4,
              },
            }}
            sx={{
              borderRadius: theme => theme.shape.borderRadius,
              borderBottomLeftRadius: lessThanMedium && 0,
              borderBottomRightRadius: lessThanMedium && 0,
            }}
          >
            {Object.keys(settingsTabElements).map(tab => (
              <Tab
                key={tab}
                icon={settingsTabElements[tab].icon}
                iconPosition="start"
                label={t(`pages.settings.tabs.${tab}`)}
                sx={{
                  justifyContent: lessThanMedium ? 'center' : 'flex-start',
                }}
                value={tab}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          xl={9}
          borderRadius={theme => theme.shape.borderRadius}
          height="100%"
          overflow="auto"
          sx={{
            borderTopLeftRadius: lessThanMedium && 0,
            borderTopRightRadius: lessThanMedium && 0,
          }}
        >
          {settingsTabElements[settingsTab].component()}
        </Grid>
      </Grid>
    </AnimatedWrapper>
  )
}

export { SettingsPage }

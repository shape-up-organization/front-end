import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import BrushRoundedIcon from '@mui/icons-material/BrushRounded'
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import { Grid, Paper, Stack, Tab, Tabs, useMediaQuery } from '@mui/material'

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
    disabled: true,
    icon: <BrushRoundedIcon />,
  },
  notifications: {
    component: () => <NotificationsTab />,
    disabled: true,
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
        columnGap={3}
        flexDirection={lessThanMedium ? 'column' : 'row'}
        flexWrap={lessThanMedium ? 'nowrap' : 'wrap'}
        justifyContent="center"
        overflow="auto"
      >
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          xl={2}
          flexBasis={lessThanMedium ? '0' : '100%'}
          left={0}
          position="sticky"
          top={0}
          zIndex={theme => theme.zIndex.fab}
        >
          <Tabs
            allowScrollButtonsMobile
            component={Paper}
            onChange={handleChangeTab}
            orientation={lessThanMedium ? 'horizontal' : 'vertical'}
            scrollButtons="auto"
            sx={{
              borderRadius: theme => theme.shape.borderRadius,
              borderBottomLeftRadius: lessThanMedium && 0,
              borderBottomRightRadius: lessThanMedium && 0,
            }}
            TabIndicatorProps={{
              sx: {
                left: 0,
                width: 4,
              },
            }}
            value={settingsTab}
            variant={lessThanMedium ? 'scrollable' : 'fullWidth'}
          >
            {Object.keys(settingsTabElements).map(
              tab =>
                !settingsTabElements[tab].disabled && (
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
                )
            )}
          </Tabs>
        </Grid>
        <Grid item xs={12} md={7} lg={8} xl={9} maxHeight="90%">
          <Stack
            borderRadius={theme => theme.shape.borderRadius}
            component={Paper}
            p={{ xs: 2, md: 8 }}
            pt={{ xs: 6 }}
            sx={{
              borderTopLeftRadius: lessThanMedium
                ? 0
                : theme => theme.shape.borderRadius * 4,
              borderTopRightRadius: lessThanMedium
                ? 0
                : theme => theme.shape.borderRadius * 4,
              boxShadow: 'none',
            }}
          >
            {settingsTabElements[settingsTab].component()}
          </Stack>
        </Grid>
      </Grid>
    </AnimatedWrapper>
  )
}

export { SettingsPage }

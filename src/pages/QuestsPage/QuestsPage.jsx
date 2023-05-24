import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded'
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded'
import { Grid, Paper, Stack, Tab, Tabs, useMediaQuery } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import { GridTab } from './components/tabs/GridTab'
import { TodayTab } from './components/tabs/TodayTab'

const settingsTabElements = {
  today: {
    component: () => <TodayTab />,
    icon: <FitnessCenterRoundedIcon />,
  },
  grid: {
    component: () => <GridTab />,
    icon: <CalendarViewMonthRoundedIcon />,
  },
  // achievements: {
  //   component: () => <AchievementsTab />,
  //   icon: <EmojiEventsRoundedIcon />,
  // },
}

const QuestsPage = () => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [settingsTab, setSettingsTab] = useState('today')

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
          md={3}
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
            {Object.keys(settingsTabElements).map(tab => (
              <Tab
                key={tab}
                icon={settingsTabElements[tab].icon}
                iconPosition="start"
                label={t(`pages.quests.tabs.${tab}`)}
                sx={{
                  justifyContent: lessThanMedium ? 'center' : 'flex-start',
                }}
                value={tab}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12} md={8} xl={9} maxHeight="90%">
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

export { QuestsPage }

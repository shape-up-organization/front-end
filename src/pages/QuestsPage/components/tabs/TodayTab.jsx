import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import {
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Divider } from '@atoms/Divider'
import { PackCard } from '@atoms/PackCard'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import apiQuests from '@api/services/quests'
import { WEEK_DAYS } from '@utils/constants/general'

const TodayTab = () => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [isLoadingQuests, setIsLoadingQuests] = useState(true)
  const [quests, setQuests] = useState([])

  const getQuests = async () => {
    setIsLoadingQuests(true)

    const response = await apiQuests.getQuests()
    setIsLoadingQuests(false)

    const grade = {}
    WEEK_DAYS.forEach(weekDay => {
      grade[weekDay] = {
        morning: null,
        afternoon: null,
        night: null,
      }
    })
    response.data.forEach(weekDay => {
      weekDay?.trainings.forEach(quest => {
        grade[weekDay?.dayOfWeek][quest?.period] = {
          ...quest.training,
        }
      })
    })

    const weekDay = WEEK_DAYS[new Date().getDay()]
    setQuests(grade[weekDay])
  }

  useEffect(() => {
    getQuests()
  }, [])

  return (
    <AnimatedWrapper>
      <Typography
        color="primary"
        fontWeight={500}
        textAlign={lessThanMedium ? 'center' : 'left'}
        variant={lessThanMedium ? 'h6' : 'h4'}
      >
        {t('pages.quests.today.title')}
      </Typography>
      {isLoadingQuests ? (
        <CircularProgress size={24} />
      ) : (
        <Stack rowGap={2}>
          {['morning', 'afternoon', 'night'].map(dayTime => (
            <Stack key={dayTime} rowGap={2}>
              <Divider
                color="disabled"
                size="small"
                text={t(`pages.quests.dayTimes.${dayTime}`)}
              />
              <PackCard
                dayOfWeek={WEEK_DAYS[new Date().getDay()]}
                period={dayTime}
                variant="checking"
                refetch={getQuests}
                {...quests[dayTime]}
              />
            </Stack>
          ))}
        </Stack>
      )}
    </AnimatedWrapper>
  )
}

export { TodayTab }

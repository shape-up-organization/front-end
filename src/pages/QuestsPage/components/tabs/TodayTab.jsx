import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Stack, Typography, useMediaQuery } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { PackCard } from '@atoms/PackCard'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import apiQuests from '@api/services/quests'
import getQuestsMock from '@mocks/quests/get'
import { WEEK_DAYS } from '@utils/constants/general'

const TodayTab = () => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  /* eslint-disable */
  const [isLoadingQuests, setIsLoadingQuests] = useState(true)
  const [quests, setQuests] = useState([])
  const handleCheckQuest = async idQuest => {
    setIsLoadingQuests(true)

    const payload = { idQuest }

    const response = await apiQuests.checkQuest(payload)
    setIsLoadingQuests(false)

    if (response.status !== 200) return

    await getQuests()
  }
  /* eslint-enable */

  const getQuests = async () => {
    setIsLoadingQuests(true)

    const response = await apiQuests.getQuests()
    setIsLoadingQuests(false)

    const weekDay = WEEK_DAYS[new Date().getDay()]
    setQuests(getQuestsMock.data[weekDay] || response)
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
      <Stack rowGap={2}>
        {['morning', 'afternoon', 'night'].map(dayTime => (
          <Stack key={dayTime} rowGap={2}>
            <Divider
              color="disabled"
              size="small"
              text={t(`pages.quests.dayTimes.${dayTime}`)}
            />
            <PackCard {...quests[dayTime]} variant="default" />
          </Stack>
        ))}
      </Stack>
    </AnimatedWrapper>
  )
}

export { TodayTab }

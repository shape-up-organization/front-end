import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Stack, Typography, useMediaQuery } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import apiQuests from '@api/services/quests'
import getQuestsMock from '@mocks/quests/get'

const GridTab = () => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  /* eslint-disable */
  const [isLoadingQuests, setIsLoadingQuests] = useState(true)
  const [quests, setQuests] = useState([])
  const handleCreateQuest = async () => {
    setIsLoadingQuests(true)

    const payload = {}

    const response = await apiQuests.createQuest(payload)
    setIsLoadingQuests(false)

    if (response.status !== 201) return

    await getQuests()
  }
  /* eslint-enable */

  const getQuests = async () => {
    setIsLoadingQuests(true)

    const response = await apiQuests.getQuests()
    console.log(response)
    setIsLoadingQuests(false)

    setQuests(getQuestsMock.data || response)
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
        {t('pages.quests.grid.title')}
      </Typography>
      <Stack rowGap={2}>OLA</Stack>
    </AnimatedWrapper>
  )
}

export { GridTab }

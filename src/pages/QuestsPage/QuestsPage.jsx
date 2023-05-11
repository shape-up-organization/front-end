import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Button, CircularProgress, Stack } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import apiQuests from '@api/services/quests'
import getQuestsMock from '@mocks/quests/get'

const QuestsPage = () => {
  const { t } = useTranslation()

  const [isLoadingQuests, setIsLoadingQuests] = useState(true)
  const [quests, setQuests] = useState([])

  const handleCreateQuest = async () => {
    setIsLoadingQuests(true)

    const payload = {}

    const response = await apiQuests.createQuest(payload)
    console.log(response)
    setIsLoadingQuests(false)

    await getQuests()
  }

  const getQuests = async () => {
    setIsLoadingQuests(true)

    const response = await apiQuests.getQuests()
    console.log(response)
    setIsLoadingQuests(false)

    setQuests(getQuestsMock.data)
    console.log(quests)
  }

  useEffect(() => {
    getQuests()
  }, [])

  return (
    <AnimatedWrapper>
      <Stack
        alignItems="center"
        bgcolor="background.default"
        borderRadius={theme => theme.shape.borderRadius}
        height="100%"
        justifyContent="center"
        width="100%"
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoadingQuests ? (
          <CircularProgress />
        ) : (
          <Stack rowGap={2}>
            <Button
              color="primary"
              onClick={handleCreateQuest}
              variant="contained"
            >
              {t('pages.quests.others.createQuest')}
            </Button>
          </Stack>
        )}
      </Stack>
    </AnimatedWrapper>
  )
}

export { QuestsPage }

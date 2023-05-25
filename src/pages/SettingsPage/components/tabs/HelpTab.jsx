import { useEffect, useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { TransitionGroup } from 'react-transition-group'

import { Collapse, Stack, Typography, useMediaQuery } from '@mui/material'

import { Accordion } from '@atoms/Accordion'
import { SearchField } from '@atoms/SearchField'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import { normalizeString } from '@utils/helpers/strings'

const HelpTab = () => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const topics = useMemo(() =>
    t('pages.settings.accordions', { returnObjects: true })
  )
  const [filteredTopics, setFilteredTopics] = useState(topics)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (!searchValue) setFilteredTopics(topics)

    setFilteredTopics(
      topics.filter(topic => {
        const { message, title } = topic

        return (
          normalizeString(message).includes(normalizeString(searchValue)) ||
          normalizeString(title).includes(normalizeString(searchValue))
        )
      })
    )
  }, [searchValue])

  return (
    <AnimatedWrapper>
      <Typography
        color="primary"
        fontWeight={500}
        textAlign={lessThanMedium ? 'center' : 'left'}
        variant={lessThanMedium ? 'h6' : 'h4'}
      >
        {t('pages.settings.tabs.help')}
      </Typography>
      <Stack rowGap={2}>
        <SearchField
          placeholder={t('pages.settings.others.searchPlaceholder')}
          setValue={setSearchValue}
          value={searchValue}
        />
        <Stack rowGap={2}>
          <TransitionGroup>
            {filteredTopics.map(topic => (
              <Collapse key={topic.title} sx={{ my: 2 }}>
                <Accordion message={topic.message} title={topic.title} />
              </Collapse>
            ))}
          </TransitionGroup>
        </Stack>
      </Stack>
    </AnimatedWrapper>
  )
}

export { HelpTab }

import { useTranslation } from 'react-i18next'

import { Box, Stack } from '@mui/material'

import { Accordion } from '@atoms/Accordion'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { useMemo } from 'react'

const PrivacyPolicyTab = () => {
  const { t } = useTranslation()

  const topics = useMemo(() =>
    t('pages.help.privacyPolicy.accordions', { returnObjects: true })
  )

  return (
    <AnimatedWrapper>
      <Stack
        alignItems="center"
        direction="column"
        justifyContent="center"
        pb={4}
        px={1}
        rowGap={3}
        width="100%"
      >
        {topics.map(({ title, message }, index) => (
          <Box width={{ xs: '100%', md: '80%' }}>
            <Accordion
              key={title}
              title={`${index + 1}. ${title}`}
              message={message}
            />
          </Box>
        ))}
      </Stack>
    </AnimatedWrapper>
  )
}

export { PrivacyPolicyTab }

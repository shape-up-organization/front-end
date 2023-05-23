import { useEffect, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'
import { TransitionGroup } from 'react-transition-group'

import {
  CircularProgress,
  Collapse,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Divider } from '@atoms/Divider'
import { PackCard } from '@atoms/PackCard'
import { SearchField } from '@atoms/SearchField'
import { SimpleModal } from '@templates/Modal'

import apiQuests from '@api/services/quests'

const Content = ({ dayOfWeek, mode, period }) => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [isLoadingPacks, setIsLoadingPacks] = useState(true)
  const [search, setSearch] = useState('')
  const [packs, setPacks] = useState(null)

  const filteredPacks = search
    ? packs?.filter(pack =>
        pack.name.toLowerCase().includes(search.toLowerCase())
      )
    : packs

  const getPacks = async () => {
    setIsLoadingPacks(true)

    const response = await apiQuests.getPacks()
    setIsLoadingPacks(false)

    setPacks(response.data)
  }

  useEffect(() => {
    getPacks()
  }, [])

  return (
    <Stack alignItems="center" p={{ xs: 2, lg: 4 }} rowGap={{ xs: 2, lg: 4 }}>
      <SearchField
        inputProps={{
          sx: {
            alignSelf: 'center',
            width: lessThanMedium ? '100%' : '80%',
          },
        }}
        placeholder={t(
          'components.molecules.packsModal.others.searchFieldPlaceholder'
        )}
        value={search}
        setValue={setSearch}
      />
      <Divider color="disabled" size="small" />
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoadingPacks ? (
        <CircularProgress size={24} />
      ) : filteredPacks.length ? (
        <TransitionGroup style={{ width: '100%' }}>
          {filteredPacks?.map(pack => (
            <Collapse key={pack.id} sx={{ mb: 4 }}>
              <PackCard
                {...pack}
                dayOfWeek={dayOfWeek}
                mode={mode}
                period={period}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      ) : (
        <Typography
          color="primary"
          fontWeight="900"
          textAlign="center"
          textTransform="uppercase"
          variant="h6"
        >
          {t('components.molecules.packsModal.others.packNotFound')}
        </Typography>
      )}
    </Stack>
  )
}

Content.propTypes = {
  dayOfWeek: P.string,
  mode: P.string,
  period: P.string,
}

Content.defaultProps = {
  dayOfWeek: '',
  mode: '',
  period: '',
}

const PacksModal = ({ handleClose, open, mode, dayOfWeek, period }) => {
  const { t } = useTranslation()

  return (
    <SimpleModal
      Component={Content}
      componentArgs={{ dayOfWeek, mode, period }}
      dialogProps={{
        maxWidth: 'md',
      }}
      handleClose={handleClose}
      open={open}
      title={t('components.molecules.packsModal.others.modalTitle')}
    />
  )
}

PacksModal.propTypes = {
  dayOfWeek: P.string,
  handleClose: P.func.isRequired,
  mode: P.string,
  open: P.bool.isRequired,
  period: P.string,
}

PacksModal.defaultProps = {
  dayOfWeek: '',
  mode: '',
  period: '',
}

export { PacksModal }

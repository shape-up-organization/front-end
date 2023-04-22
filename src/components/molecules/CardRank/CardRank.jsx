import { useEffect, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import CloseRounded from '@mui/icons-material/CloseRounded'
import PeopleIcon from '@mui/icons-material/People'
import PublicIcon from '@mui/icons-material/Public'
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
} from '@mui/material'

import rankingGetTopMock from '@mocks/ranking/getTop'

import { List } from './components/List'
import { Top } from './components/Top'

const CardRank = ({ handleCloseCard }) => {
  const { t } = useTranslation()

  const [rankedUsers, setRankedUsers] = useState(null)
  const [rankTab, setRankTab] = useState('friends')

  const handleChangeTab = (_, newTab) => setRankTab(newTab)

  const getRankedUsers = async () => setRankedUsers(rankingGetTopMock.data)

  useEffect(() => {
    getRankedUsers()
  }, [])

  return (
    <Grid container component={Paper}>
      {handleCloseCard && (
        <Grid item xs={12} pl={1} pt={1}>
          <IconButton onClick={handleCloseCard}>
            <CloseRounded />
          </IconButton>
        </Grid>
      )}
      <Grid item xs={12}>
        <Stack width="100%" px={2} py={handleCloseCard ? 0 : 3} rowGap={2}>
          <Tabs onChange={handleChangeTab} value={rankTab} variant="fullWidth">
            <Tab
              icon={<PeopleIcon />}
              iconPosition="top"
              label={t('components.molecules.cardRank.tabs.friends')}
              value="friends"
            />
            <Tab
              icon={<PublicIcon />}
              iconPosition="top"
              label={t('components.molecules.cardRank.tabs.global')}
              value="global"
            />
          </Tabs>
          <Grid container item xs={12}>
            {rankedUsers && (
              <>
                <Grid item xs={12}>
                  <Top rankedTopUsers={rankedUsers?.slice(0, 3)} />
                </Grid>
                <Grid item xs={12} pt={2}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List rankedUsers={rankedUsers?.slice(3)} />
                </Grid>
              </>
            )}
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  )
}

CardRank.propTypes = {
  handleCloseCard: P.func,
}

CardRank.defaultProps = {
  handleCloseCard: null,
}

export { CardRank }

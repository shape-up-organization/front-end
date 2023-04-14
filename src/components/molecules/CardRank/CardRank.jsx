import P from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Card, Grid } from '@mui/material'
import { useState } from 'react'
import { CardRanked } from './CardRanked'
import { CardRankedTop } from './CardRankedTop'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: P.string.isRequired,
  index: P.number.isRequired,
  value: P.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const CardRank = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container component={Card} xs={12} justifyContent="space-around">
      <Grid container item xs={12} padding={2}>
        <Grid item xs={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Global" {...a11yProps(0)} />
            <Tab label="Amigos" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        {/* Aba Global */}
        <Grid container item xs={12} justifyContent="space-around">
          <TabPanel value={value} index={0}>
            <CardRankedTop alt="" name="wlad" numRank={2} src="" xp={4000} />
          </TabPanel>
          <TabPanel value={value} index={0}>
            <CardRankedTop alt="" name="wlad" numRank={1} src="" xp={5000} />
          </TabPanel>
          <TabPanel value={value} index={0}>
            <CardRankedTop alt="" name="wlad" numRank={3} src="" xp={3000} />
          </TabPanel>
        </Grid>

        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <CardRanked alt="" name="wlad" numRank={4} src="" xp={2000} />
          </TabPanel>
          <TabPanel value={value} index={0}>
            <CardRanked alt="" name="wlad" numRank={4} src="" xp={2000} />
          </TabPanel>
          <TabPanel value={value} index={0}>
            <CardRanked alt="" name="wlad" numRank={4} src="" xp={2000} />
          </TabPanel>
        </Grid>
        {/* Aba Amigos */}
        <Grid container item xs={12} justifyContent="space-around">
          <TabPanel value={value} index={1}>
            <CardRankedTop alt="" name="wlad" numRank={2} src="" xp={4000} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CardRankedTop alt="" name="wlad" numRank={1} src="" xp={5000} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CardRankedTop alt="" name="wlad" numRank={3} src="" xp={3000} />
          </TabPanel>
        </Grid>

        <Grid item xs={12}>
          <TabPanel value={value} index={1}>
            <CardRanked alt="" name="wlad" numRank={4} src="" xp={2000} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CardRanked alt="" name="wlad" numRank={4} src="" xp={2000} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CardRanked alt="" name="wlad" numRank={4} src="" xp={2000} />
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  )
}
export { CardRank }

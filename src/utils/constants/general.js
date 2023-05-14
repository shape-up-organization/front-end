import AirRoundedIcon from '@mui/icons-material/AirRounded'
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
import SportsGymnasticsRoundedIcon from '@mui/icons-material/SportsGymnasticsRounded'

const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
Object.freeze(WEEK_DAYS)

const CATEGORIES = {
  AEROBIC: {
    color: 'primary',
    icon: AirRoundedIcon,
    name: 'aerobic',
  },
  ANAEROBIC: {
    color: 'secondary',
    icon: SpeedRoundedIcon,
    name: 'anaerobic',
  },
  FLEXIBILITY: {
    color: 'info',
    icon: SportsGymnasticsRoundedIcon,
    name: 'flexibility',
  },
  STRENGTH: {
    color: 'error',
    icon: FitnessCenterRoundedIcon,
    name: 'strength',
  },
}

export { CATEGORIES, WEEK_DAYS }

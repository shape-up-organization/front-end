import AirRoundedIcon from '@mui/icons-material/AirRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded'
import SportsMmaRoundedIcon from '@mui/icons-material/SportsMmaRounded'

const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
Object.freeze(WEEK_DAYS)

const CATEGORIES = {
  AEROBIC: {
    color: 'primary',
    icon: AirRoundedIcon,
    name: 'aerobic',
  },
  FIGHT: {
    color: 'info',
    icon: SportsMmaRoundedIcon,
    name: 'fight',
  },
  HEALTH: {
    color: 'error',
    icon: FavoriteRoundedIcon,
    name: 'health',
  },
  STRENGTH: {
    color: 'warning',
    icon: FitnessCenterRoundedIcon,
    name: 'strength',
  },
}

const CLASSIFICATIONS = [
  {
    color: '#ffffff',
    colorText: '#000000',
    value: 'PLATINUM',
  },
  {
    color: '#ff0000',
    colorText: '#ffffff',
    value: 'RUBY',
  },
  {
    color: '#00ff00',
    colorText: '#000000',
    value: 'EMERALD',
  },
  {
    color: '#36e6ec',
    colorText: '#000000',
    value: 'DIAMOND',
  },
  {
    color: '#ffee00',
    colorText: '#000000',
    value: 'GOLD',
  },
  {
    color: '#c0c0c0',
    colorText: '#000000',
    value: 'SILVER',
  },
  {
    color: '#cd7f32',
    colorText: '#ffffff',
    value: 'BRONZE',
  },
  {
    color: '#000000',
    colorText: '#ffffff',
    value: 'IRON',
  },
]

export { CATEGORIES, CLASSIFICATIONS, WEEK_DAYS }

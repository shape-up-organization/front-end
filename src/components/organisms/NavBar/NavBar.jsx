import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'

import {
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
  alpha,
} from '@mui/material'
import { useState } from 'react'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 5,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
    },
  },
}))

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const settingsClickOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  const settingsClickClose = () => {
    setAnchorEl(null)
  }
  return (
    <Grid container xs={12} component={Paper}>
      <Grid
        container
        item
        xs={8}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Grid container item xs={5} justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <Typography variant="h4" color="primary">
              ShapeUp
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Toolbar>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <HomeIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <FitnessCenterIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <PeopleAltIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container item xs={4} alignItems="center">
        <Grid
          container
          item
          xs={11}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item xs={1}>
            <IconButton>
              <NotificationsIcon color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <SettingsIcon color="primary" onClick={settingsClickOpen} />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={settingsClickClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={settingsClickClose}>Configurações</MenuItem>
                <MenuItem onClick={settingsClickClose}>Sair</MenuItem>
              </Menu>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { NavBar }

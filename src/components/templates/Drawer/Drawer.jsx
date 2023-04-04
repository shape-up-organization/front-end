import { useState } from 'react'

import P from 'prop-types'

import { Badge, Grid } from '@mui/material'

import { sizes, useStyles } from './Drawer.styles'

const Drawer = ({ DrawerContent, DrawerHeader, notification, size }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { classes } = useStyles({ size })

  return (
    <Badge
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      badgeContent={notification}
      className={classes.badge}
      color="secondary"
      max={99}
      sx={{
        bottom: drawerOpen ? 0 : `-${sizes[size].contentHeight()}vh`,
      }}
    >
      <Grid container className={classes.drawerContainer}>
        <Grid
          item
          xs={12}
          height={`${sizes[size].headerHeight()}vh`}
          minHeight={sizes[size].minHeaderHeight}
        >
          <DrawerHeader drawerOpenStates={[drawerOpen, setDrawerOpen]} />
        </Grid>
        <Grid
          item
          className={classes.content}
          display="flex"
          flexDirection="column"
          height="100%"
          padding={2}
          rowGap={1}
          width="100%"
        >
          <DrawerContent />
        </Grid>
      </Grid>
    </Badge>
  )
}

Drawer.propTypes = {
  DrawerContent: P.elementType.isRequired,
  DrawerHeader: P.elementType.isRequired,
  notification: P.oneOfType([P.number, P.string]),
  size: P.oneOf(['thinTall']),
}

Drawer.defaultProps = {
  notification: 0,
  size: 'thinTall',
}

export { Drawer }

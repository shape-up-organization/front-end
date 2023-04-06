import { useState } from 'react'

import P from 'prop-types'

import { Badge, Box, Grid, Grow } from '@mui/material'

import { sizes, useStyles } from './Drawer.styles'

const Drawer = ({
  contentProps,
  HeaderComponent,
  ContentComponent,
  headerProps,
  notification,
  size,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(true)
  const { classes } = useStyles({ size })

  return (
    <Box>
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
        <Grow in unmountOnExit>
          <Grid container className={classes.drawerContainer}>
            <Grid item xs={12} height={`${sizes[size].headerHeight}vh`}>
              <HeaderComponent
                drawerOpenStates={[drawerOpen, setDrawerOpen]}
                {...headerProps}
              />
            </Grid>

            {!!ContentComponent && <ContentComponent {...contentProps} />}
          </Grid>
        </Grow>
      </Badge>
    </Box>
  )
}

Drawer.propTypes = {
  ContentComponent: P.elementType,
  contentProps: P.object,
  HeaderComponent: P.elementType.isRequired,
  headerProps: P.object,
  notification: P.oneOfType([P.number, P.string]),
  size: P.oneOf(['small', 'thinTall']),
}

Drawer.defaultProps = {
  contentProps: {},
  ContentComponent: null,
  headerProps: {},
  notification: 0,
  size: 'thinTall',
}

export { Drawer }

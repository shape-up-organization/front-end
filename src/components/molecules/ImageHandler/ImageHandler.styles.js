import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    root: {
      [['& .uppy-Container', '& .uppy-Root', '& .uppy-Dashboard'].join(', ')]: {
        height: '100%',
        width: '100%',
      },
      [[
        '& .uppy-Dashboard-AddFiles-title',
        '& .uppy-DashboardTab-name',
        '& .uppy-StatusBar-actions > button',
        '& .uppy-DashboardContent-back',
        '& .uppy-Dashboard-Item-name',
        '& .uppy-Dashboard-Item-statusSize',
        '& .uppy-DashboardContent-title',
        '& .uppy-DashboardContent-title',
        '& .uppy-DashboardContent-back',
        '& .uppy-DashboardContent-addMore',
        '& .uppy-Dashboard-browse',
      ].join(', ')]: {
        fontFamily: `${theme.typography.fontFamily} !important`,
        fontWeight: '500 !important',
      },
      [[
        '& .uppy-DashboardContent-back',
        '& .uppy-DashboardContent-addMore',
      ].join(', ')]: {
        color: `${theme.palette.primary.main} !important`,
      },
      '& .uppy-Dashboard-Item-previewInnerWrap': {
        backgroundColor: `${theme.palette.background.paper} !important`,
      },
      '& .uppy-StatusBar-actions': {
        display: 'flex',
        justifyContent: 'center',
      },
      '& .uppy-StatusBar-actions > button': {
        backgroundColor: `${theme.palette.primary.main} !important`,
        '&:hover': {
          backgroundColor: `${theme.palette.primary.dark} !important`,
        },
      },
    },
  }),
  { name: 'ImageHandler' }
)

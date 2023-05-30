const colors = {
  black: '#303030',
  blue: '#42A5F5',
  red: '#ed1543',
  white: '#F9F9F9',
}

const base = {
  palette: {
    mode: 'light',
    colors,
    error: {
      main: '#ED145B',
    },
    primary: {
      contrastText: '#181818',
      dark: '#25D6B6',
      main: '#23C7A8',
    },
    secondary: {
      main: '#00FCA8',
    },
    success: { main: '#26b89d' },
  },
  typography: {
    fontFamily: ['Ubuntu', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 12,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            borderStyle: 'solid',
            borderWidth: 2,
            minHeight: 24,
          },
        },
      },
    },
  },
}

const light = {
  ...base,
  palette: {
    ...base.palette,
    mode: 'light',
    link: colors.black,
    background: {
      default: '#F1F1F1',
      paper: '#FAFAFA',
      body: '#F1F1F1',
    },
    chat: {
      backgroundHeader: '#F2FFFA',
    },
    disabled: '#808080',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#23C7A8 #F1F1F1',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            ...base.components.MuiCssBaseline.styleOverrides.body[
              '&::-webkit-scrollbar, & *::-webkit-scrollbar'
            ],
            backgroundColor: '#F1F1F1',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            ...base.components.MuiCssBaseline.styleOverrides.body[
              '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb'
            ],
            borderColor: '#F1F1F1',
            backgroundColor: '#23C7A8',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus, &::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active, &::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#25D6B6',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#F1F1F1',
          },
        },
      },
    },
  },
}

const dark = {
  ...base,
  palette: {
    ...base.palette,
    mode: 'dark',
    link: colors.white,
    background: {
      default: '#2B2B2B',
      paper: '#181818',
      body: '#353535',
    },
    chat: {
      backgroundHeader: '#181c18',
    },
    disabled: '#b1b1b1',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#23C7A8 #353535',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            ...base.components.MuiCssBaseline.styleOverrides.body[
              '&::-webkit-scrollbar, & *::-webkit-scrollbar'
            ],
            backgroundColor: '#353535',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            ...base.components.MuiCssBaseline.styleOverrides.body[
              '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb'
            ],
            borderColor: '#353535',
            backgroundColor: '#23C7A8',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus, &::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active, &::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#25D6B6',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#353535',
          },
        },
      },
    },
  },
}

const getDesignTokens = mode => ({
  ...(mode === 'light' ? light : dark),
})

export { getDesignTokens }

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
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: 4,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
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
    },
    chat: {
      backgroundHeader: '#F2FFFA',
    },
    disabled: '#808080',
  },
  components: {
    ...base.components,
    MuiCssBaseline: {
      ...base.components.MuiCssBaseline,
      styleOverrides: {
        ...base.components.MuiCssBaseline.styleOverrides,
        body: {
          ...base.components.MuiCssBaseline.styleOverrides.body,
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            ...base.components.MuiCssBaseline.styleOverrides.body[
              '&::-webkit-scrollbar, & *::-webkit-scrollbar'
            ],
            backgroundColor: '#808080',
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
    },
    chat: {
      backgroundHeader: '#181c18',
    },
    disabled: '#b1b1b1',
  },
  components: {
    ...base.components,
    MuiCssBaseline: {
      ...base.components.MuiCssBaseline,
      styleOverrides: {
        ...base.components.MuiCssBaseline.styleOverrides,
        body: {
          ...base.components.MuiCssBaseline.styleOverrides.body,
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            ...base.components.MuiCssBaseline.styleOverrides.body[
              '&::-webkit-scrollbar, & *::-webkit-scrollbar'
            ],
            backgroundColor: '#b1b1b1',
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

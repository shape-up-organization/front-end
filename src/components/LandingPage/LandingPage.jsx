import { Header } from '../Header'
import { Banner } from '../Banner'
import { Photo } from '../Photo'
import { Footer } from '../Footer'
import Grid from '@mui/material/Grid'

const LandingPage = () => {
  return (
    <Grid container height="100vh" display={'flex'}>
      <Grid container height="10vh">
        <Header />
      </Grid>
      <Grid container>
        <Grid item xs={5.5} height={'90vh'} display={'flex'} direction={'column'}>
          <Grid
            item
            xs={11}
            display={'flex'}
            paddingLeft={12}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Banner />
          </Grid>
          <Grid item xs={1} display={'flex'} direction={'column-reverse'}>
            <Footer />
          </Grid>
        </Grid>
        <Grid item xs={6.5} height={'90vh'} display={'flex'} direction={'column-reverse'}>
          <Photo />
        </Grid>
      </Grid>
    </Grid>
  )
}

export { LandingPage }

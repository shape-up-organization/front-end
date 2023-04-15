import { Card, Grid } from '@mui/material'
import { Divider } from '@atoms/Divider'
import { CardPerfilHeader } from './CardPerfilHeader'
import { CardPerfilExp } from './CardPerfilExp'
import { CardProfileChallenge } from './CardProfileChallenge'

const CardPerfil = () => (
  <Grid container xs={12}>
    <Card>
      <Grid container spacing={2} item xs={12}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <CardPerfilHeader
              alt="Careca de Capa"
              src="https://th.bing.com/th/id/OIP.M48wefvNGsntaP6lHrEEjgHaEo?pid=ImgDet&rs=1"
              nomeUsuario="Wladsch_wlad"
              userUsuario="@wlad"
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <CardPerfilExp currentLevel={10} progress={51} />
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Grid item xs={11}>
            <Divider direction="horizontal" />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <CardProfileChallenge />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  </Grid>
)

export { CardPerfil }

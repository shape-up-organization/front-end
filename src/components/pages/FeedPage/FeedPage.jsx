import { CardNewPost } from '@molecules/CardNewPost'
import { CardPerfil } from '@molecules/CardPerfil'
import { CardPost } from '@molecules/CardPost'
import { CardRank } from '@molecules/CardRank'
import { Grid } from '@mui/material'
import { NavBar } from '@organisms/NavBar'

const FeedPage = () => (
  <Grid container xs={12}>
    <Grid container spacing={6} item xs={12}>
      <Grid container item xs={12}>
        <NavBar />
      </Grid>
      <Grid container item xs={12} justifyContent="space-around">
        <Grid container item xs={3}>
          <Grid item xs={12}>
            <CardPerfil />
          </Grid>
        </Grid>
        <Grid container item xs={4} spacing={3}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <CardNewPost />
            </Grid>
          </Grid>
          <Grid container item spacing={3} xs={12}>
            <Grid item xs={12}>
              <CardPost
                srcUser="https://th.bing.com/th/id/R.2bfaf68117878259273998b3b5303308?rik=PRawHomOPI6TiQ&pid=ImgRaw&r=0"
                altUser="perfil"
                caption="Tartaruga"
                srcImagePost="https://th.bing.com/th/id/R.61106789ff63ca42540b008771a7c7e3?rik=RAe75URYffGguw&riu=http%3a%2f%2fs2.glbimg.com%2fzdZdBeTLdyQyvrqw3lzfMmuYWoY%3d%2fe.glbimg.com%2fog%2fed%2ff%2foriginal%2f2017%2f06%2f27%2fgalapagos_tortoise_5213306875.jpg&ehk=9FzIms1W8h%2fBEYBEm8RzMjgo0kmnnfob6ZL0Pbs1G1w%3d&risl=1&pid=ImgRaw&r=0"
                date="13/04/23"
                name="Lola"
                qtdComent={13}
                qtdLikes={22}
                altImagePost="tartaruga"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={3}>
          <Grid item xs={12}>
            <CardRank />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

export { FeedPage }

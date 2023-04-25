import { Stack, Typography } from '@mui/material'

import { Photo } from '@atoms/Photo'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import andreyImg from '@assets/images/devs/andrey.png'
import eduardaImg from '@assets/images/devs/eduarda.png'
import gabrielImg from '@assets/images/devs/gabriel.png'
import vitorImg from '@assets/images/devs/vitor.png'
import wladimirImg from '@assets/images/devs/wladimir.png'

const devs = [
  {
    name: 'Andrey Benicchio',
    pic: andreyImg,
    roles: ['Back-end'],
  },

  {
    name: 'Wladimir Condori',
    pic: wladimirImg,
    roles: ['Front-end'],
  },
  {
    name: 'Gabriel Silva',
    pic: gabrielImg,
    roles: ['Arquiteto', 'Back-end'],
  },
  {
    name: 'Vitor Mendes',
    pic: vitorImg,
    roles: ['Front-end'],
  },
  {
    name: 'Eduarda Calixto',
    pic: eduardaImg,
    roles: ['Back-end', 'UX/UI'],
  },
]

const TeamTab = () => (
  <AnimatedWrapper>
    <Stack
      columnGap={{ xs: 32 }}
      direction="row"
      flexWrap="wrap-reverse"
      justifyContent="center"
      pb={4}
      rowGap={{ xs: 4, md: 8 }}
      width="100%"
    >
      {devs.map(({ name, pic, roles }) => (
        <Stack alignItems="center" textAlign="center">
          <Photo
            alt={name}
            animationSpeed={0}
            fit="contain"
            src={pic}
            wrapperStyle={{
              borderRadius: '50%',
              minWidth: '120px',
              width: '12vw',
            }}
          />
          <Typography color="primary" fontWeight={700} variant="h5">
            {name}
          </Typography>
          <Typography color="text.primary" fontWeight={700} variant="subtitle1">
            {roles.map((role, index) => {
              if (index > 0) {
                return (
                  <>
                    <Typography color="primary" component="span" variant="h6">
                      {' '}
                      •{' '}
                    </Typography>
                    {role}
                  </>
                )
              }
              return role
            })}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </AnimatedWrapper>
)

export { TeamTab }

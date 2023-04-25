import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import CircleIcon from '@mui/icons-material/Circle'
import { Grid } from '@mui/material'

import { LinkButton } from '@atoms/LinkButton'

const Footer = ({ showCircles }) => {
  const { t } = useTranslation()

  return (
    <>
      <Grid item>
        <LinkButton internal="help">
          {t('pages.landing.footer.linkAbout')}
        </LinkButton>
      </Grid>
      {showCircles && (
        <CircleIcon
          color="primary"
          sx={{ fontSize: theme => theme.typography.pxToRem(16) }}
        />
      )}
      <Grid item>
        <LinkButton
          internal="/help"
          internalOptions={{
            state: {
              section: 'termsOfUse',
            },
          }}
        >
          {t('pages.landing.footer.linkTermsOfUse')}
        </LinkButton>
      </Grid>
      {showCircles && (
        <CircleIcon
          color="primary"
          sx={{ fontSize: theme => theme.typography.pxToRem(16) }}
        />
      )}
      <Grid item>
        <LinkButton
          internal="/help"
          internalOptions={{
            state: {
              section: 'privacyPolicy',
            },
          }}
        >
          {t('pages.landing.footer.linkPrivacy')}
        </LinkButton>
      </Grid>
    </>
  )
}

Footer.propTypes = {
  showCircles: P.bool,
}

Footer.defaultProps = {
  showCircles: false,
}

export { Footer }

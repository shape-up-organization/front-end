import P from 'prop-types'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import {
  AccordionDetails,
  Accordion as AccordionMUI,
  AccordionSummary,
  Paper,
  Typography,
} from '@mui/material'

const Accordion = ({ message, title }) => (
  <AccordionMUI
    sx={{
      bgcolor: 'background.paper',
      borderBottomLeftRadius: theme => theme.shape.borderRadius,
      borderBottomRightRadius: theme => theme.shape.borderRadius,
    }}
    TransitionProps={{ unmountOnExit: true }}
  >
    <AccordionSummary
      component={Paper}
      expandIcon={
        <ExpandMoreRoundedIcon
          fontSize="medium"
          sx={{ color: 'primary.contrastText' }}
        />
      }
      sx={{
        bgcolor: theme => theme.palette.primary.dark,
        borderTopLeftRadius: theme => theme.shape.borderRadius,
        borderTopRightRadius: theme => theme.shape.borderRadius,
        py: 1,
      }}
    >
      <Typography
        color="primary.contrastText"
        fontWeight={700}
        variant="subtitle1"
      >
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails
      sx={{
        bgcolor: 'background.default',
        borderBottomLeftRadius: theme => theme.shape.borderRadius,
        borderBottomRightRadius: theme => theme.shape.borderRadius,
        pt: 2,
        px: 3,
      }}
    >
      <Typography>{message}</Typography>
    </AccordionDetails>
  </AccordionMUI>
)

Accordion.propTypes = {
  message: P.string.isRequired,
  title: P.string.isRequired,
}

export { Accordion }

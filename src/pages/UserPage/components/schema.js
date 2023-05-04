import { z } from 'zod'

import i18n from '@app/i18n'

const string = () =>
  z.string().nonempty(i18n.t('pages.landing.signup.schema.requiredField'))

export const schema = z.object({
  name: string()
    .min(2, {
      message: i18n.t('pages.landing.signup.schema.moreThan1Letter'),
    })
    .regex(/^[a-zA-Z\s]+$/, {
      message: i18n.t('pages.landing.signup.schema.noNumbersOrSpecialChars'),
    }),
  lastName: string()
    .min(2, {
      message: i18n.t('pages.landing.signup.schema.moreThan1Letter'),
    })
    .regex(/^[a-zA-Z\s]+$/, {
      message: i18n.t('pages.landing.signup.schema.noNumbersOrSpecialChars'),
    }),
  username: string()
    .min(2, {
      message: i18n.t('pages.landing.signup.schema.moreThan1Letter'),
    })
    .regex(/^[^@\s]+$/, {
      message: i18n.t('pages.landing.signup.schema.noAtSignOrWhiteSpace'),
    }),
})

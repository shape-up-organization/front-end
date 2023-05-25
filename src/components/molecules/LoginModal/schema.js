import i18n from '@app/i18n'
import { z } from 'zod'

const string = () =>
  z.string().nonempty(i18n.t('pages.landing.login.schema.requiredField'))

export const schema = z.object({
  email: string().email(i18n.t('pages.landing.login.schema.invalidEmail')),
  password: string(),
})

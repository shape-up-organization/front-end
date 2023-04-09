import i18n from '@app/i18n'
import { z } from 'zod'

import { format, parseISO } from 'date-fns'

const string = () =>
  z.string().nonempty(i18n.t('pages.landing.signup.schema.requiredField'))

export const schema = z
  .object({
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
    username: string().min(2, {
      message: i18n.t('pages.landing.signup.schema.moreThan1Letter'),
    }),
    email: string().email(i18n.t('pages.landing.signup.schema.invalidEmail')),
    cellPhone: string()
      .transform(value => value.replace(/[\D][^_]/g, ''))
      .refine(value => !/\D/.test(value), {
        message: i18n.t('pages.landing.signup.schema.invalidNumber'),
      }),
    birth: z
      .date({
        required_error: i18n.t('pages.landing.signup.schema.requiredField'),
        invalid_type_error: i18n.t('pages.landing.signup.schema.invalidDate'),
      })
      .refine(
        value =>
          value <=
          new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        {
          message: i18n.t('pages.landing.signup.schema.olderThan18'),
          path: ['birth'],
        }
      )
      .refine(
        value =>
          value >=
          new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
        {
          message: i18n.t('pages.landing.signup.schema.invalidDate'),
          path: ['birth'],
        }
      )
      .transform(value => format(parseISO(value.toISOString()), 'dd/MM/yyyy')),
    password: string()
      .min(8, { message: i18n.t('pages.landing.signup.schema.atLeast8Chars') })
      .regex(/.*[0-9].*/, {
        message: i18n.t('pages.landing.signup.schema.atLeast1Number'),
      })
      .regex(/.*[A-Z].*/, {
        message: i18n.t('pages.landing.signup.schema.atLeast1UpperCaseLetter'),
      })
      .regex(/.*[a-z].*/, {
        message: i18n.t('pages.landing.signup.schema.atLeast1LowerCaseLetter'),
      })
      .regex(/.*[\W_].*/, {
        message: i18n.t('pages.landing.signup.schema.atLeast1SpecialChar'),
      }),
    confirmPassword: string().min(8, {
      message: i18n.t('pages.landing.signup.schema.moreThan8Chars'),
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: i18n.t('pages.landing.signup.schema.passwordsNotTheSame'),
    path: ['confirmPassword'],
  })

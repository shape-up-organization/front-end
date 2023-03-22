import { z } from 'zod'

import { format, parseISO } from 'date-fns'

const string = () => z.string().nonempty('Campo obrigatório!')

export const schema = z
  .object({
    name: string()
      .min(2, { message: 'Deve ter mais do que uma letra!' })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Não pode ter números ou caracteres especiais!',
      }),
    lastName: string()
      .min(2, { message: 'Deve ter mais do que uma letra!' })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Não pode ter números ou caracteres especiais!',
      }),
    username: string().min(2, { message: 'Deve ter mais do que uma letra!' }),
    email: string().email('Email inválido!'),
    cellPhone: string()
      .transform(value => value.replace(/[\D][^_]/g, ''))
      .refine(value => !/\D/.test(value), {
        message: 'Número inválido!',
      }),
    birth: z
      .date({
        required_error: 'Campo obrigatório!',
        invalid_type_error: 'Data inválida!',
      })
      .refine(
        value =>
          value <=
          new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        { message: 'Deve ter mais de 18 anos!', path: ['birth'] }
      )
      .refine(
        value =>
          value >=
          new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
        { message: 'Data inválida!', path: ['birth'] }
      )
      .transform(value => format(parseISO(value.toISOString()), 'dd/MM/yyyy')),
    password: string()
      .min(8, { message: 'Deve ter pelo menos 8 caracteres!' })
      .regex(/.*[0-9].*/, {
        message: 'Deve conter pelo menos 1 número',
      })
      .regex(/.*[A-Z].*/, {
        message: 'Deve conter pelo menos 1 letra maiúscula',
      })
      .regex(/.*[a-z].*/, {
        message: 'Deve conter pelo menos 1 letra minúscula',
      })
      .regex(/.*[\W_].*/, {
        message: 'Deve conter pelo menos 1 caractere especial',
      }),
    confirmPassword: string().min(8, {
      message: 'Deve ter mais do que 8 letras!',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não são iguais!',
    path: ['confirmPassword'],
  })

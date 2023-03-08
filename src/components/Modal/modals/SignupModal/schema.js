import { z } from 'zod'

import { format, parseISO } from 'date-fns'

const string = () => z.string().nonempty('Campo obrigatório!')

export const schema = z
  .object({
    name: string().min(2, { message: 'Deve ter mais do que uma letra!' }),
    lastName: string().min(2, { message: 'Deve ter mais do que uma letra!' }),
    email: string().email('Email inválido!'),
    cellPhone: string()
      .min(10, { message: 'Número inválido!' })
      .max(13, { message: 'Número inválido!' }),
    birth: z
      .date()
      .transform(value => format(parseISO(value.toISOString()), 'dd/MM/yyyy')),
    password: string().min(8, { message: 'Deve ter pelo menos 8 caracteres!' }),
    confirmPassword: string().min(8, {
      message: 'Deve ter mais do que 8 letras!',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Senhas não são iguais!',
    path: ['confirmPassword'],
  })

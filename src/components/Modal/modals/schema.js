import { z } from 'zod'

const string = () => z.string().nonempty('Campo obrigatório!')

export const schema = z.object({
  name: string().min(2, { message: 'Deve ter mais do que uma letra!' }),
  lastName: string().min(2, { message: 'Deve ter mais do que uma letra!' }),
  email: string().email('Email inválido!'),
  ddd: string().min(2, { message: 'Deve ter mais do que uma letra!' }),
  cellPhone: string().min(4, { message: 'Deve ter mais do que 9 letras!' }),
  birth: string(),
  password: string().min(3, { message: 'Deve ter mais do que 8 letras!' }),
  confirmPassword: string().min(3, {
    message: 'Deve ter mais do que 8 letras!',
  }),
})

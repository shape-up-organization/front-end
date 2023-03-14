import { z } from 'zod'

const string = () => z.string().nonempty('Campo obrigatório!')

export const schema = z.object({
  email: string().email('Email inválido!'),
  password: string(),
})

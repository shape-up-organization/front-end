export default async function handler(req, res) {
  const { body } = req

  const response = await fetch('http://localhost:7000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  res.status(response.status).json(response)
}

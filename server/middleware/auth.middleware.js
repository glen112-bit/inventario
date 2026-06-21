import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req,
  res,
  next
) => {

  const authHeader =
    req.headers.authorization
console.log(
  'AUTH HEADER:',
  req.headers.authorization
)
  if (!authHeader) {

    return res.status(401).json({
      error: 'Token não informado'
    })

  }

  const token =
    authHeader.replace(
      'Bearer ',
      ''
    )

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = decoded

    next()

  } catch(error) {

    return res.status(401).json({
      error: 'Token inválido'
    })

  }

}

import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization

  console.log('AUTH HEADER:', authHeader)

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token não informado'
    })
  }

  const token = authHeader.replace('Bearer ', '')

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    console.log('TOKEN DECODIFICADO:', decoded)

    req.user = decoded

    next()

  } catch (error) {

    console.error(error)

    return res.status(401).json({
      error: 'Token inválido'
    })

  }

}

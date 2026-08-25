import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization

    if (!authHeader) {

      return res.status(401).json({
        error: 'Token não informado'
      })

    }

    const token = authHeader.replace('Bearer ', '')

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    console.log('AUTH USER:', decoded)

    req.user = decoded

    next()

  } catch (error) {

    console.error('AUTH ERROR:', error)

    if (error.name === 'TokenExpiredError') {

      return res.status(401).json({
        error: 'Token expirado'
      })

    }

    return res.status(401).json({
      error: 'Token inválido'
    })

  }

}

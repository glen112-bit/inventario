import jwt from 'jsonwebtoken'

export const authMiddleware = ( req, res, next ) => {
  
  try{
    const authHeader = req.headers.authorization

    if(!authHeader) {
      return res.status(401).json({
        error: 'Token nao Informado'
      })
    }

    const token = authHeader.replace('Bearer ', '')
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()

  } catch(error) {

    if(error.mame === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token Expirado'
      })
    }

    return res.status(401).json({
      error: 'Token Invalido'
    })
    
  }
}

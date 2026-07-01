export const authorize = (...roles) => {

  return (req, res, next) => {
    console.log('USER:', req.user)
    console.log('ROL DEL TOKEN:', req.user.rol)
    console.log('ROLES PERMITIDOS:', roles)
    if (
      !roles.includes(req.user.rol)
    ) {

      return res.status(403).json({
        error: 'Sem permissão'
      })

    }

    next()

  }

}

const profilesService = require('../services/profiles.service')
// en nuestra carpeta de middlewares, en archivo de roles middlewares

const isAdmin = async (request, response, next) => {
  try {
    let { id } = request.user // --> Usamos Passport para hacer esto
    //     Passport también aplicó un middleware!

    let isSuperUser = await profilesService.isAdmin(id)
    // verifica si existe relación de user - rol
    // si no existe, 403 --> Status de error común para permisos
    return next()
  } catch (error) {
    next(error)
  }
}

const isSameUser = async () => {}

const isAdminOrSameUser = async () => {}

module.exports = {
  isAdmin,
}

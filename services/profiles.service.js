const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')

class ProfilesService {
  constructor() {}

  //Return Instance if we do not converted to json (or raw:true)
  async getProfileOr404(id) {
    let profile = await models.Profiles.findByPk(id, { raw: true })
    if (!profile) throw new CustomError('Not found Profile', 404, 'Not Found')
    return profile
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getProfile(id) {
    let profile = await models.Profiles.findByPk(id)
    if (!profile) throw new CustomError('Not found Profile', 404, 'Not Found')
    return profile
  }

  async findProfileByUserID(user_id) {
    let profile = await models.Profiles.findOne(
      { where: { user_id } },
      { raw: true }
    )
    if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')
    return profile
  }

  async isAdmin(user_id) {
    let role = await models.Roles.findOne(
      { where: { name: 'admin' } },
      { raw: true }
    )
    let profile = await models.Profiles.findOne(
      { where: { user_id, role_id: role.id } },
      { raw: true }
    )

    if (!profile) throw new CustomError('Not administ', 403, 'Not allowed')
    return profile
  }
}

module.exports = ProfilesService

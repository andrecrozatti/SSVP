const { getUser } = require('../../../shared/contexts/requestContext');
const connection = require('../../../shared/database/connection');

class AssistedsRepository {
  async createAssisteds(payload) {

    const [createdAssisteds] = await connection.transaction(async trx =>
      trx('assisteds').insert(payload).returning('*')
    );

    return createdAssisteds
  }

  async updateAssisteds(payload) {
    return connection('assisteds')
      .update(payload)
      .where({ id: payload.id })
      .returning('*')
  }

  async deleteAssisteds(idAssisteds) {
    return connection('assisteds').del().where({ id: idAssisteds });
  }

  async getAllAssisteds() {
    return connection('assisteds').where({ conference_id: getUser().conference_id });
  }

  async getOneAssisteds(idAssisteds) {
    return connection('assisteds')
      .where('id', '=', `${idAssisteds}`).andWhere('conference_id', '=', `${getUser().conference_id}`).first();
  }

  async getAssistedsReport(filterType, filterValue) {

    switch (filterType) {
      case 'name':
        return connection('assisteds')
          .where('name', 'ilike', `%${filterValue}%`)
      //.where({ conference_id: getUser().conference_id });
      case 'conference':
        return connection('assisteds')
          .where({ conference_id: filterValue });
      case 'neighborhood':
        return connection('assisteds')
          .where('neighborhood', 'ilike', `%${filterValue}%`)
      default:
        return connection('assisteds').where({ conference_id: getUser().conference_id });
    }

  }
}

module.exports = AssistedsRepository;

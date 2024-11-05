const connection = require('../../../shared/database/connection');

const { getUser, setUser } = require('../../../shared/contexts/requestContext');



class VisitsRepository {

  
  async createVisits(payload) {
   
     const [createdVisits] = await connection.transaction(async trx =>
       trx('visits').insert(payload).returning('*')
    );

    return createdVisits
  }

  async updateVisits(payload) {
    return connection('visits')
      .update(payload)
      .where({ id: payload.id })
      .returning('*')
  }

  async deleteVisits(idVisits) {
    return connection('visits').del().where({ id: idVisits });
  }

  async getAllVisits() {
    return connection('visits')
    .join('assisteds', 'assisteds.id', '=', 'visits.assisted_id')
    .join('conferences', 'conferences.id', '=', 'visits.conference_id')
    .where({ user_id: getUser().id })
    .select('assisteds.name as assisted_name','conferences.name as conference_name', 'visits.*');
  }

  async getOneVisits(idVisits) {
    return connection('visits')
    .where('visits.id', '=', `${idVisits}`).andWhere('visits.user_id', '=', `${getUser().id}`).first();
  }
}

module.exports = VisitsRepository;

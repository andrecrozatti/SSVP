const AppError = require('../../../shared/errors/AppError');

class GetOneVisitsService {
  constructor(visitsRepository) {
    this.visitsRepository = visitsRepository;
  }

  async execute(idVisits) {
    const visit = await this.visitsRepository.getOneVisits(
      idVisits
    );
    if (!visit) throw new AppError('Visita não encontrada !!');
    

    const preparedVisit = {...visit, creation_date: visit.creation_date.toISOString().split('.')[0], visit_date: visit.visit_date?.toISOString().split('.')[0] }
    return preparedVisit;
  }
}
module.exports = GetOneVisitsService;

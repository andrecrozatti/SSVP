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
    
    return visit;
  }
}
module.exports = GetOneVisitsService;

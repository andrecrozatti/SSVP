const AppError = require('../../../shared/errors/AppError');

class UpdateVisitsService {
  constructor(visitsRepository) {
    this.visitsRepository = visitsRepository;
  }

  async execute(payload) {
    const visit = await this.visitsRepository.getOneVisits(payload.id);

    if (!visit) throw new AppError('Visitas not found');

    return this.visitsRepository.updateVisits(payload);
  }
}

module.exports = UpdateVisitsService;

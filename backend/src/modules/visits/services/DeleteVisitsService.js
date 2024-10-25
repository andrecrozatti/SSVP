const AppError = require('../../../shared/errors/AppError');

class DeleteVisitsService {
  constructor(visitsRepository) {
    this.visitsRepository = visitsRepository;
  }

  async execute(idVisits) {
    return this.visitsRepository.deleteVisits(idVisits);
  }
}

module.exports = DeleteVisitsService;

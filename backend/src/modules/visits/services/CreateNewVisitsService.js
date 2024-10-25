class CreateNewVisitsService {
  constructor(visitsRepository) {
    this.visitsRepository = visitsRepository;
  }

  async execute(payload) {
    return this.visitsRepository.createVisits(payload);
  }
}

module.exports = CreateNewVisitsService;

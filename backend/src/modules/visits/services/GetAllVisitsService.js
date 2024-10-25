class GetAllVisitsService {
  constructor(visitsRepository) {
    this.visitsRepository = visitsRepository;
  }

  async execute() {
    return this.visitsRepository.getAllVisits();
  }
}

module.exports = GetAllVisitsService;

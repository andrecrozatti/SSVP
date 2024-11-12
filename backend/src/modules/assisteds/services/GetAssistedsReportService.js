class GetAssistedsReportService {
  constructor(assistedsRepository) {
    this.assistedsRepository = assistedsRepository;
  }

  async execute() {
    return this.assistedsRepository.getAssistedsReport();
  }
}

module.exports = GetAssistedsReportService;

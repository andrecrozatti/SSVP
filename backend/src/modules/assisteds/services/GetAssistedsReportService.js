class GetAssistedsReportService {
  constructor(assistedsRepository) {
    this.assistedsRepository = assistedsRepository;
  }

  async execute(filterType, filterValue) {


    return this.assistedsRepository.getAssistedsReport(filterType, filterValue);
  }
}

module.exports = GetAssistedsReportService;

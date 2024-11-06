class GetAllDependentsService {
  constructor(dependentsRepository) {
    this.dependentsRepository = dependentsRepository;
  }

  async execute(assisted_id) {

    let dependents = await this.dependentsRepository.getAllDependents(assisted_id);
    dependents = dependents.map(x => {return {...x, birth_date: x.birth_date?.toISOString().split('T')[0]}} )
    return dependents
  }
}

module.exports = GetAllDependentsService;

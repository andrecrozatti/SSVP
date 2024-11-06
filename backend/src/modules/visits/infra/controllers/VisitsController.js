const VisitsRepository = require('../../repositories/VisitsRepository');

const CreateNewVisitsService = require('../../services/CreateNewVisitsService');

const DeleteVisitsService = require('../../services/DeleteVisitsService');

const GetOneVisitsService = require('../../services/GetOneVisitsService');

const GetAllVisitsService = require('../../services/GetAllVisitsService');

const UpdateVisitService = require('../../services/UpdateVisitsService');


const visitsRepository = new VisitsRepository();



class VisitsController {

  /**
   * Cria um assistido no banco de dados
  */
  async createVisits(request, response) {
    const {
      assisted_id,
      visit_description,
      creation_date,
      visit_date
    } = request.body; // Os valores que vieram do formulario são atribuidos para as variáveis acima

    //Como vou salvar dados em duas tabelas diferentes(visits e visit_items) é preciso iniciar 2 serviços e 2 repositórios diferentes
    const createVisit = new CreateNewVisitsService(visitsRepository);


    //O trecho abaixo salva o assistido enviado para o backend e retorna para a const assisted, a linha salva no banco de dados já com seu respectivo ID
    const visit = await createVisit.execute({
      conference_id: request.user.conference_id,
      assisted_id,
      visit_description,
      creation_date,
      visit_date,
      user_id : request.user.id
    });

    return response.json(visit[0]);
  }

  async updateVisits(request, response) {
    const { id } = request.params;

    const payload = {
      id,
      user_id : request.user.id,
      conference_id: request.user.conference_id,
      ...request.body,      
    };


    const updateVisit = new UpdateVisitService(visitsRepository);

    const assistedUpdated = await updateVisit.execute(payload);


    return response.json(assistedUpdated);
  }

  async deleteVisits(request, response) {
    const { id } = request.params;

    const deleteVisit = new DeleteVisitsService(visitsRepository);

    await deleteVisit.execute(id);

    return response.json({
      assisted: {
        id,
        deleted: true,
      },
    });
  }

  async getAllVisits(request, response) {
    const getAll = new GetAllVisitsService(visitsRepository);

    const visits = await getAll.execute();

    return response.json(visits);
  }

  async getOneVisits(request, response) {
    const { id } = request.params;

    const getOne = new GetOneVisitsService(visitsRepository);

    const assisted = await getOne.execute(id);

    return response.json(assisted);
  }
}

module.exports = VisitsController;

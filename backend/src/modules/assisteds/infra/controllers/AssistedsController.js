const AssistedsRepository = require('../../repositories/AssistedsRepository');
const DependentsRepository = require('../../../dependents/repositories/DependentsRepository');

const CreateNewAssistedsService = require('../../services/CreateNewAssistedsService');
const CreateNewDenpendentsService = require('../../../dependents/services/CreateNewDependentsService');

const DeleteAssistedsService = require('../../services/DeleteAssistedsService');

const GetOneAssistedsService = require('../../services/GetOneAssistedsService');

const GetAllAssistedsService = require('../../services/GetAllAssistedsService');
const GetAssistedsReportService = require('../../services/GetAssistedsReportService');

const GetAllDependentsService = require('../../../dependents/services/GetAllDependentsService');

const UpdateAssistedService = require('../../services/UpdateAssistedsService');
const UpdateDependentsService = require('../../../dependents/services/UpdateDependentsService');

const assistedsRepository = new AssistedsRepository();
const dependentsRepository = new DependentsRepository();

class AssistedsController {

  /**
   * Cria um assistido no banco de dados
  */
  async createAssisteds(request, response) {
    const {
      name,
      age,
      phone,
      profession,
      address,
      address_number,
      neighborhood,
      zip_code,
      address_complement,
      city,
      state,
      country,
      cpf,
      Case_report,
      family_income,
      explain,
      Spouse,
      maritalStatus = false,
      home = false,
      dependents,
      conference_id,
      status
    } = request.body; // Os valores que vieram do formulario são atribuidos para as variáveis acima

    //Como vou salvar dados em duas tabelas diferentes(assisteds e dependents) é preciso iniciar 2 serviços e 2 repositórios diferentes
    const createAssisted = new CreateNewAssistedsService(assistedsRepository);


    //O trecho abaixo salva o assistido enviado para o backend e retorna para a const assisted, a linha salva no banco de dados já com seu respectivo ID
    const assisted = await createAssisted.execute({
      name,
      age,
      phone,
      profession,
      address,
      address_number,
      neighborhood,
      zip_code,
      address_complement,
      city,
      state,
      country,
      cpf,
      Case_report,
      family_income,
      explain,

      maritalStatus,
      home,
      conference_id: request.user.conference_id,
      status
    });

    if (dependents.length > 0) {
      const createDependents = new CreateNewDenpendentsService(dependentsRepository);

      //Como os dependentes precisam de um Id de assistido para serem salvos, passei o id do assistido recém salvo para a lista de dependentes
      const setDependents = dependents.map((x) => { return { ...x, assisted_id: assisted.id } })

      //E aqui os dependentes são salvos
      await createDependents.execute(setDependents)
    }

    return response.json(assisted[0]);
  }

  async updateAssisteds(request, response) {
    const { id } = request.params;

    const payload = {
      id,
      ...request.body,
    };

    const dependents = payload.dependents

    //trecho para retirar a propriedade de dependentes do objeto de assistidos
    delete payload.dependents

    const updateAssisted = new UpdateAssistedService(assistedsRepository);

    const assistedUpdated = await updateAssisted.execute(payload);


    if (dependents?.length > 0 || dependents) {
      const updateDependents = new UpdateDependentsService(dependentsRepository);

      //Como os dependentes precisam de um Id de assistido para serem salvos, passei o id do assistido recém salvo para a lista de dependentes
      const setDependents = dependents.map((x) => { return { ...x, assisted_id: assistedUpdated[0].id } })

      //E aqui os dependentes são salvos
      await updateDependents.execute(setDependents)
    }


    return response.json(assistedUpdated);
  }

  async deleteAssisteds(request, response) {
    const { id } = request.params;

    const deleteAssisted = new DeleteAssistedsService(assistedsRepository);

    await deleteAssisted.execute(id);

    return response.json({
      assisted: {
        id,
        deleted: true,
      },
    });
  }

  async getAllAssisteds(request, response) {
    const getAll = new GetAllAssistedsService(assistedsRepository);

    const { id } = request.user
    const assisteds = await getAll.execute();
    const getAllDependentsAssisted = new GetAllDependentsService(dependentsRepository)


    const assisteds_dependents = await Promise.all(assisteds.map(async (element, index) => {
      const dependents = await getAllDependentsAssisted.execute(element.id)
      return { ...element, dependents }
    }))


    return response.json(assisteds_dependents);
  }

  async getOneAssisteds(request, response) {
    const { id } = request.params;

    const getOne = new GetOneAssistedsService(assistedsRepository);

    const assisted = await getOne.execute(id);

    const getAllDependentsAssisted = new GetAllDependentsService(dependentsRepository)

    const dependents = await getAllDependentsAssisted.execute(id)
    assisted.dependents = dependents
    return response.json(assisted);
  }


  async getAssistedsReport(request, response) {
    const getAll = new GetAssistedsReportService(assistedsRepository);

    const { filterType, filterValue } = request.query


    const assisteds = await getAll.execute(filterType, filterValue);
    const getAllDependentsAssisted = new GetAllDependentsService(dependentsRepository)


    const assisteds_dependents = await Promise.all(assisteds.map(async (element, index) => {
      const dependents = await getAllDependentsAssisted.execute(element.id)
      return { ...element, dependents }
    }))


    return response.json(assisteds_dependents);
  }

}

module.exports = AssistedsController;

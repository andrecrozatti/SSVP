const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const AssistedsController = require('../controllers/AssistedsController');

const assistedsRoutes = Router();

const assistedsController = new AssistedsController();

assistedsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required('Name is required'),
      age: Joi.number().required('Age is required'),
      address: Joi.string(),
      address_number: Joi.string(),
      neighborhood: Joi.string(),
      zip_code: Joi.string(),
      address_complement: Joi.string().allow("").optional(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      whatsapp: Joi.string(),
      profession: Joi.string().required('profession is required'),
      cpf: Joi.string().required('district is required'),
      Case_report: Joi.string(),
      family_income: Joi.string(),
      explain: Joi.string(),
      Spouse: Joi.string(),
      home: Joi.string(),
      maritalStatus: Joi.string(),
      dependents: Joi.array().empty(),
      conference_id: Joi.number().optional(),
      status: Joi.string().required('Status do assistido é obrigatório'),
      
    },
  }),
  assistedsController.createAssisteds
);

assistedsRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('Id is required'),
    },
  }),
  assistedsController.updateAssisteds
);

assistedsRoutes.get('/', assistedsController.getAllAssisteds);

assistedsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('Id is required'),
    },
  }),
  assistedsController.deleteAssisteds
);

assistedsRoutes.get('/report/', assistedsController.getAssistedsReport);


assistedsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('ID is require'),
    },
  }),
  assistedsController.getOneAssisteds
);


module.exports = assistedsRoutes;

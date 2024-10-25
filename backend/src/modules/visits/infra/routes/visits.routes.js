const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const VisitsController = require('../controllers/VisitsController');

const visitsRoutes = Router();

const visitsController = new VisitsController();

visitsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      conference_id: Joi.number().required('Conferencia é obrigatória'),
      assisted_id: Joi.number().required('Assitido é obrigatório'),
      visit_description: Joi.string().required('A descrição da visita é obrigatória'),
      visit_date: Joi.date().optional(),
      user_id: Joi.number(),
    },
  }),
  visitsController.createVisits
);

visitsRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('Id is required'),
    },
  }),
  visitsController.updateVisits
);

visitsRoutes.get('/', visitsController.getAllVisits);

visitsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('Id is required'),
    },
  }),
  visitsController.deleteVisits
);

visitsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('ID is require'),
    },
  }),
  visitsController.getOneVisits
);

module.exports = visitsRoutes;

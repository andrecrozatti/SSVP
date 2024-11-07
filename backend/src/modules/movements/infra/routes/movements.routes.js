const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const MovementsController = require('../controllers/MovementsController');

const movementsRoutes = Router();

const movementsController = new MovementsController();

movementsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      conference_id: Joi.number().optional(),
      assisted_id: Joi.number().required('Assitido é obrigatório'),
      movement_date: Joi.date().required('A data da movimentação é obrigatória'),
      user_id: Joi.number().optional(),
      movement_items: Joi.array()
    },
  }),
  movementsController.createMovements
);

movementsRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('Id is required'),
    },
  }),
  movementsController.updateMovements
);

movementsRoutes.get('/', movementsController.getAllMovements);

movementsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('Id is required'),
    },
  }),
  movementsController.deleteMovements
);

movementsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('ID is require'),
    },
  }),
  movementsController.getOneMovements
);

module.exports = movementsRoutes;

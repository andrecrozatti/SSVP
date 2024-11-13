const { Router } = require('express');

const usersRoutes = require('../../../modules/users/infra/routes/users.routes');

const sessionsRoutes = require('../../../modules/users/infra/routes/sessions.routes');

const forgotUsersnRoutes = require('../../../modules/users/infra/routes/forgotUsers.routes');

const resetPasswordUsersRoutes = require('../../../modules/users/infra/routes/resetPasswordUsers.routes');

const secretaryRoutes = require('../../../modules/secretary/infra/routes/secretary.routes');

const sessionsSecretaryRoutes = require('../../../modules/secretary/infra/routes/sessionsSecretary.routes');

const forgotSecretaryRoutes = require('../../../modules/secretary/infra/routes/forgotSecretary.routes');

const resetPasswordSecretaryRoutes = require('../../../modules/secretary/infra/routes/resetPasswordSecretary.routes');

const assistedsRoutes = require('../../../modules/assisteds/infra/routes/assisteds.routes');

const conferencesRoutes = require('../../../modules/conferences/infra/routes/conferences.routes');

const dependentsRoutes = require('../../../modules/dependents/infra/routes/dependents.routes');

const transactionsRoutes = require('../../../modules/transactions/infra/routes/transactions.routes');

const positionsRoutes = require('../../../modules/positions/infra/routes/positions.routes');

const movementsRoutes = require('../../../modules/movements/infra/routes/movements.routes');

const helpingHandsRoutes = require('../../../modules/helping_hands/infra/routes/helpingHands.routes');

const visitsRoutes = require('../../../modules/visits/infra/routes/visits.routes');

const ensureAuthenticated = require('../../../shared/middlewares/ensure.autenticated');

const routes = Router();

routes.get('/hello', (req, res) => {
    res.json({ message: 'Olá do backend!' });
});

routes.use('/users', usersRoutes);

routes.use('/login', sessionsRoutes);

routes.use('/forgot_users', forgotUsersnRoutes);

routes.use('/reset_password_users', resetPasswordUsersRoutes);

routes.use('/secretary', secretaryRoutes);

routes.use('/secretary_login', sessionsSecretaryRoutes);

routes.use('/forgot_secretary', forgotSecretaryRoutes);

routes.use('/reset_password_secretary', resetPasswordSecretaryRoutes);

routes.use(ensureAuthenticated);

routes.use('/assisteds', assistedsRoutes);

routes.use('/conferences', conferencesRoutes);

routes.use('/dependents', dependentsRoutes);

routes.use('/transactions', transactionsRoutes);

routes.use('/positions', positionsRoutes);

routes.use('/movements', movementsRoutes);

routes.use('/helping_hands', helpingHandsRoutes);

routes.use('/visits', visitsRoutes);

module.exports = routes;

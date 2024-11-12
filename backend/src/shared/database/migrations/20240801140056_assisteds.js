/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('assisteds', table => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.date('age').nullable();
    table.text('address').nullable;
    table.text('address_number').nullable;
    table.text('neighborhood').nullable;
    table.text('zip_code').nullable;
    table.text('address_complement').nullable;
    table.text('city').nullable;
    table.text('state').nullable;
    table.text('country').nullable;
    table.string('maritalStatus').nullable();
    table.text('profession').nullable();
    table.text('phone').nullable();
    table.text('cpf').notNullable();
    table.text('Case_report');
    table.string('home').nullable();
    table.text('family_income').nullable();
    table.text('explain');
    
    table.integer('conference_id').unsigned().notNullable(); // Coluna para a chave estrangeira
    table
      .foreign('conference_id')
      .references('id')
      .inTable('conferences')
      .onDelete('RESTRICT');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('assisteds');
};

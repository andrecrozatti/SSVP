/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('assisteds', table => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.date('age').notNullable();
    table.text('address').notNullable;
    table.text('address_number').notNullable;
    table.text('neighborhood').notNullable;
    table.text('zip_code').notNullable;
    table.text('address_complement').notNullable;
    table.text('city').notNullable;
    table.text('state').notNullable;
    table.text('country').notNullable;
    table.string('maritalStatus').notNullable();
    table.text('profession').notNullable();
    table.text('whatsapp').notNullable();
    table.text('cpf').notNullable();
    table.text('Case_report');
    table.string('home').notNullable();
    table.text('family_income').notNullable();
    table.text('explain');
    table.text('Spouse');
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

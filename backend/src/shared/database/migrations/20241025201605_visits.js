/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('visits', table => {
        table.increments('id').primary();
        table.integer('conference_id').unsigned();
        table.integer('assisted_id').unsigned();
        table.integer('user_id').unsigned();
        table.text('visit_description').notNullable();
        table.date('creation_date').notNullable().defaultTo(knex.fn.now());
        table.date('visit_date').nullable();
        table.foreign('conference_id').references('id').inTable('conferences');
        table.foreign('assisted_id').references('id').inTable('assisteds');
        table.foreign('user_id').references('id').inTable('users');
        

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('visits');
};


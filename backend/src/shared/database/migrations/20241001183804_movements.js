/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('movements', table => {
        table.increments('id').primary();
        table.integer('conference_id').unsigned();
        table.integer('assisted_id').unsigned();
        table.integer('user_id').unsigned();
        table.datetime('movement_date').notNullable();
        table.foreign('conference_id').references('id').inTable('conferences');
        table.foreign('assisted_id').references('id').inTable('assisteds').onDelete('SET null');
        table.foreign('user_id').references('id').inTable('users');
        

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('movements');
};

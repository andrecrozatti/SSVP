/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('movement_items', table => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.integer('quantity').notNullable();
        table.integer('movement_id').unsigned();
        table.foreign('movement_id').references('id').inTable('movements').onDelete('CASCADE');;

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('movement_items');
};

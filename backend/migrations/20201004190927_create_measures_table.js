exports.up = function (knex, Promise) {
  return knex.schema.createTable('measurements', function (t) {
    t.integer('id').primary();
    t.string('client_id').notNull();
    t.string('recorder_name').notNull();
    t.date('measured_on').notNull();
    t.dateTime('entered_at').notNull();
    t.string('limb').notNull();
    t.string('notes').nullable();

    t.float('a_circ').nullable();
    t.float('b_circ').nullable();
    t.float('b1_circ').nullable();
    t.float('c_circ').nullable();
    t.float('c1_circ').nullable();
    t.float('d_circ').nullable();
    t.float('e_circ').nullable();
    t.float('e1_circ').nullable();
    t.float('f_circ').nullable();
    t.float('g_circ').nullable();
    t.float('y_circ').nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('measurements');
};

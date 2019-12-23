exports.up = function(knex, Promise) {
  return knex.schema.createTable('garments', function(t) {
    t.integer('id').primary();
    t.string('name')
      .unique()
      .notNull();
    t.string('limb').notNull();
    t.string('type').notNull();
    t.string('compression_level').notNull();
    t.string('construction').nullable();
    t.string('brand').notNull();
    t.string('size_label').notNull();
    t.string('lengths').nullable();
    t.string('notes').nullable();

    t.float('a_min').nullable();
    t.float('a_max').nullable();
    t.float('b_min').nullable();
    t.float('b_max').nullable();
    t.float('b1_min').nullable();
    t.float('b1_max').nullable();
    t.float('c_min').nullable();
    t.float('c_max').nullable();
    t.float('c1_min').nullable();
    t.float('c1_max').nullable();
    t.float('d_min').nullable();
    t.float('d_max').nullable();
    t.float('e_min').nullable();
    t.float('e_max').nullable();
    t.float('e1_min').nullable();
    t.float('e1_max').nullable();
    t.float('f_min').nullable();
    t.float('f_max').nullable();
    t.float('g_min').nullable();
    t.float('g_max').nullable();
    t.float('y_min').nullable();
    t.float('y_max').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('garments');
};

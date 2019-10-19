const knex = require('../knex');
const Errable = require('../errors');

const TABLENAME = 'garments';

exports.list = function(pagination, wheres, orders) {
  // Setup query
  let query = knex.from(TABLENAME);
  // Append where clauses
  wheres.forEach((where) => {
    query.where(where.field, where.op, where.value);
  });
  // Separate count query
  let countQuery = query.clone().count();
  // Append pagination details
  query.offset(pagination.offset);
  if (pagination.limit !== 'all') {
    query.limit(pagination.limit);
  }
  // Append ordering details
  orders.forEach((order) => {
    query.orderBy(order.field, order.orientation);
  });

  return Promise.all([countQuery, query.select()])
    .then(([count, result]) => {
      return {
        data: result,
        meta: { ...pagination, total: parseInt(count[0].count, 10) },
      };
    })
    .catch((e) => {
      throw Errable.E(
        `could not fetch garments`,
        Errable.Kinds.external,
        'garmentsModel.paginate',
        e,
      );
    });
};

exports.save = async function(data) {
  return knex
    .table(TABLENAME)
    .insert(data)
    .catch((e) => {
      throw Errable.E(
        'could not save garment',
        Errable.Kinds.external,
        'garmentModel.save',
        e,
      );
    });
};

const knex = require('../knex');
const Errable = require('../errors');

const TABLENAME = 'measurements';

exports.list = function (paging, filters, order) {
  // Setup query
  let query = knex.from(TABLENAME);
  // Append filter where clauses
  filters.forEach((filter) => {
    query.where(filter.field, filter.op, filter.value);
  });
  // Separate count query
  let countQuery = query.clone().count('* as count').first();
  // Append paging details
  query.offset(paging.offset);
  if (paging.limit !== 'all') {
    query.limit(paging.limit);
  }
  // Append ordering details
  if (order.field) {
    query.orderBy(order.field, order.dir);
  }

  return Promise.all([countQuery, query.select()])
    .then(([countRes, result]) => {
      return {
        data: result,
        meta: { ...paging, total: countRes.count },
      };
    })
    .catch((e) => {
      throw Errable.E(
        `could not fetch measurements`,
        Errable.Kinds.external,
        'measurementsModel.paginate',
        e,
      );
    });
};

exports.save = async function (data) {
  return knex
    .table(TABLENAME)
    .insert(data)
    .catch((e) => {
      throw Errable.E(
        'could not save measurement',
        Errable.Kinds.external,
        'measurementsModel.save',
        e,
      );
    });
};

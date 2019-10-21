const knex = require('../knex');
const Errable = require('../errors');

const TABLENAME = 'garments';

exports.list = function(paging, filters, order, fit) {
  // Setup query
  let query = knex.from(TABLENAME);
  // Append filter where clauses
  filters.forEach((filter) => {
    query.where(filter.field, filter.op, filter.value);
  });
  // Append measurement fit where clauses
  if (fit.measurements) {
    const margin = fit.margin || 0;
    query.where((subQ) => {
      fit.measurements.forEach((measurement, index) => {
        const { point, value } = measurement;
        if (index === 0) {
          subQ.where((subsubQ) => {
            subsubQ
              .where(point + 'Min', '<=', value + margin)
              .where(point + 'Max', '>=', value - margin);
          });
        } else {
          subQ.orWhere((subsubQ) => {
            subsubQ
              .where(point + 'Min', '<=', value + margin)
              .where(point + 'Max', '>=', value - margin);
          });
        }
      });
    });
  }
  // Separate count query
  let countQuery = query
    .clone()
    .count('* as count')
    .first();
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

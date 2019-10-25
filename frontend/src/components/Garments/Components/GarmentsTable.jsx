import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import * as OPTS from '../../../common/GARMENT-OPTS';

const tableOpts = {
  pagination: false,
  serverSide: true,
  selectableRowsHeader: false,
  selectableRows: 'none',
  filter: false,
  elevation: 0,
};

const getColumns = () => {
  let cols = [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'limb',
      label: 'Limb',
    },
    {
      name: 'type',
      label: 'Type',
    },
    {
      name: 'compressionLevel',
      label: 'Level',
    },
    {
      name: 'brand',
      label: 'Brand',
    },
    {
      name: 'sizeLabel',
      label: 'Size',
    },
    {
      name: 'lengths',
      label: 'Avail. lengths',
    },
    {
      name: 'notes',
      label: 'Notes',
    },
  ];
  OPTS.MPOINTS.forEach((mpoint) => {
    cols.push({
      name: mpoint + 'Min',
      label: mpoint.toUpperCase(),
      options: {
        display: 'hidden',
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value) {
            return value + ' - ' + tableMeta.rowData[tableMeta.columnIndex + 1];
          }
          return value;
        },
      },
    });
    cols.push({
      name: mpoint + 'Max',
      label: mpoint.toUpperCase(),
      options: {
        display: 'excluded',
      },
    });
  });
  return cols;
};
// { "aMin": 23.4, "aMax": 24.7, "bMin": null, "bMax": null, "b1Min": null, "b1Max": null, "cMin": 32.7, "cMax": 34.3, "c1Min": null, "c1Max": null, "dMin": null, "dMax": null, "eMin": 33.5, "eMax": 44.1, "e1Min": null, "e1Max": null, "fMin": null, "fMax": null, "gMin": null, "gMax": null, "yMin": null, "yMax": null }

const GarmentsTable = (props) => {
  return (
    <MUIDataTable
      data={props.data}
      options={tableOpts}
      columns={getColumns()}
    />
  );
};

GarmentsTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default GarmentsTable;

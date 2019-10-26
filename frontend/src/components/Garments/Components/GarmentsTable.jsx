import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { TableRow, TableCell } from '@material-ui/core';
import * as OPTS from '../../../common/GARMENT-OPTS';

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: 'flex',
  },
  goodFit: {
    backgroundColor: theme.palette.goodFit.main,
    height: '100%',
    width: '100%',
    margin: -theme.spacing(2),
    padding: theme.spacing(2),
  },
  nearFit: {
    backgroundColor: theme.palette.nearFit.main,
    height: '100%',
    width: '100%',
    margin: -theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const getTableOpts = (fitMode, measurements) => {
  return {
    pagination: false,
    serverSide: true,
    selectableRowsHeader: false,
    selectableRows: 'none',
    search: false,
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    elevation: 0,
    expandableRows: true,
    renderExpandableRow: renderExpandableFunc(fitMode, measurements),
  };
};

const renderExpandableFunc = (fitMode, measurements) => {
  //const classes = useStyles();
  return (rowData, rowMeta) => {
    console.log(rowData, rowMeta, fitMode, measurements);
    /*if (fitMode) {
      return (
        <TableRow>
          <TableCell colSpan={rowData.length} className={classes.root}>
            Custom expandable row option. Data: {JSON.stringify(rowData)}
          </TableCell>
        </TableRow>
      );
    }*/
    return (
      <TableRow>
        <TableCell colSpan={rowData.length}>
          Custom expandable row option. Data: {JSON.stringify(rowData)}
        </TableCell>
      </TableRow>
    );
  };
};

const getColumns = (fitMode, measurements, margin, classes) => {
  const noMeasures = Object.keys(measurements).length === 0;
  let cols = [
    {
      name: 'name',
      label: 'Name',
      options: {
        display: fitMode ? 'false' : 'true',
      },
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        display: fitMode ? 'false' : 'true',
      },
    },
    {
      name: 'compressionLevel',
      label: 'Level',
      options: {
        display: fitMode ? 'false' : 'true',
      },
    },
    {
      name: 'brand',
      label: 'Brand',
      options: {
        display: fitMode ? 'false' : 'true',
      },
    },
    {
      name: 'sizeLabel',
      label: 'Size',
      options: {
        display: fitMode ? 'false' : 'true',
      },
    },
    {
      name: 'lengths',
      label: 'Avail. lengths',
      options: {
        display: fitMode ? 'false' : 'true',
      },
    },
    {
      name: 'notes',
      label: 'Notes',
      options: {
        display: fitMode ? 'false' : 'true',
      },
    },
  ];
  OPTS.MPOINTS.forEach((mpoint) => {
    cols.push({
      name: mpoint + 'Min',
      label: mpoint.toUpperCase(),
      options: {
        display: 'excluded',
      },
    });
    cols.push({
      name: mpoint + 'Max',
      label: mpoint.toUpperCase(),
      options: {
        display: 'excluded',
      },
    });
    cols.push({
      name: mpoint,
      label: mpoint.toUpperCase(),
      options: {
        display:
          fitMode && (measurements[mpoint] || noMeasures) ? 'true' : 'false',
        customBodyRender: (value, tableMeta, updateValue) => {
          const min = tableMeta.rowData[tableMeta.columnIndex - 2];
          const max = tableMeta.rowData[tableMeta.columnIndex - 1];
          let cellClass = null;
          if (!noMeasures) {
            const fitState = doesFit(min, max, measurements[mpoint], margin);
            if (fitState === 'Y') {
              cellClass = classes.goodFit;
            } else if (fitState === 'M') {
              cellClass = classes.nearFit;
            }
          }
          if (min && max) {
            return <div className={cellClass}>{min + ' - ' + max}</div>;
          }
          return value;
        },
      },
    });
  });
  return cols;
};

const doesFit = (min, max, measure, margin) => {
  if (measure >= min && measure <= max) {
    return 'Y';
  } else if (measure >= min - margin && measure <= max + margin) {
    return 'M';
  } else {
    return 'N';
  }
};

const GarmentsTable = (props) => {
  const classes = useStyles();
  const { data, fitMode, measurements, margin } = props;
  return (
    <MUIDataTable
      data={data}
      options={getTableOpts(fitMode, measurements)}
      columns={getColumns(fitMode, measurements, margin, classes)}
    />
  );
};

GarmentsTable.propTypes = {
  data: PropTypes.array.isRequired,
  fitMode: PropTypes.bool,
  measurements: PropTypes.object,
  margin: PropTypes.number,
};

GarmentsTable.defaultProps = {
  fitMode: false,
  measurements: {},
  margin: 0,
};

export default GarmentsTable;

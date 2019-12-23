import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
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
  goodFitExpanded: {
    backgroundColor: theme.palette.goodFit.main,
  },
  nearFitExpanded: {
    backgroundColor: theme.palette.nearFit.main,
  },
}));

const getTableOpts = (fitMode, derivedFields) => {
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
    renderExpandableRow: renderExpandableFunc(fitMode, derivedFields),
  };
};

const renderExpandableFunc = (fitMode, derivedFields) => {
  return (rowData, rowMeta) => {
    const derivedSetKey = fitMode ? 'expandedDetails' : 'expandedFits';
    return (
      <TableRow>
        <TableCell colSpan={1} />
        <TableCell colSpan={rowData.length}>
          {derivedFields[derivedSetKey][rowMeta.dataIndex]}
        </TableCell>
      </TableRow>
    );
  };
};

const getColumns = (fitMode, measures, classes) => {
  const noMeasures = Object.keys(measures).length === 0;
  let cols = [
    {
      name: 'name',
      label: 'Name',
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
      label: 'Length(s)',
      options: {
        display: fitMode ? 'false' : 'true',
      },
    },
    {
      name: 'construction',
      label: 'Construction',
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
      name: mpoint + 'Fit',
      label: mpoint.toUpperCase(),
      options: {
        display: 'excluded',
      },
    });
    cols.push({
      name: mpoint,
      label: mpoint.toUpperCase(),
      options: {
        display: fitMode && (measures[mpoint] || noMeasures) ? 'true' : 'false',
        customBodyRender: (value, tableMeta, updateValue) => {
          const min = tableMeta.rowData[tableMeta.columnIndex - 3];
          const max = tableMeta.rowData[tableMeta.columnIndex - 2];
          if (min && max) {
            const fitState = tableMeta.rowData[tableMeta.columnIndex - 1];
            let cellClass = null;
            if (fitState === 'Y') {
              cellClass = classes.goodFit;
            } else if (fitState === 'M') {
              cellClass = classes.nearFit;
            }
            return <div className={cellClass}>{min + ' - ' + max}</div>;
          }
          return value;
        },
      },
    });
  });
  return cols;
};

const buildExpandedDetails = (row, classes) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Level</TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Size</TableCell>
          <TableCell>Length(s)</TableCell>
          <TableCell>Construction</TableCell>
          <TableCell>Notes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{row.type}</TableCell>
          <TableCell>{row.compressionLevel}</TableCell>
          <TableCell>{row.brand}</TableCell>
          <TableCell>{row.sizeLabel}</TableCell>
          <TableCell>{row.lengths}</TableCell>
          <TableCell>{row.construction}</TableCell>
          <TableCell>{row.notes}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const buildExpandedFits = (row, measures, classes) => {
  const mPoints = OPTS.MPOINTS.filter(
    (mpoint) => row[mpoint + 'Min'] && row[mpoint + 'Max'],
  );
  return (
    <Table>
      <TableHead>
        <TableRow>
          {mPoints.map((mpoint, i) => (
            <TableCell key={i}>{mpoint.toUpperCase()}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {mPoints.map((mpoint, i) => {
            const min = row[mpoint + 'Min'];
            const max = row[mpoint + 'Max'];
            const fitState = row[mpoint + 'Fit'];
            if (min && max) {
              let cellClass = null;
              if (fitState === 'Y') {
                cellClass = classes.goodFitExpanded;
              } else if (fitState === 'M') {
                cellClass = classes.nearFitExpanded;
              }
              return (
                <TableCell key={i} className={cellClass}>
                  {min + ' - ' + max}
                </TableCell>
              );
            }
            return <TableCell key={i} />;
          })}
        </TableRow>
      </TableBody>
    </Table>
  );
};

const buildDerivedFields = (setDerived, data, measures, classes) => {
  let expandedDetails = [];
  let expandedFits = [];
  data.forEach((row) => {
    expandedDetails.push(buildExpandedDetails(row, classes));
    expandedFits.push(buildExpandedFits(row, measures, classes));
  });
  setDerived({
    expandedDetails: expandedDetails,
    expandedFits: expandedFits,
  });
};

const GarmentsTable = (props) => {
  const classes = useStyles();
  const [derivedFields, setDerived] = useState({});
  const { data, fitMode, measures } = props;

  useEffect(() => {
    buildDerivedFields(setDerived, data, measures, classes);
  }, [data, measures, classes]);

  return (
    <MUIDataTable
      data={data}
      options={getTableOpts(fitMode, derivedFields)}
      columns={getColumns(fitMode, measures, classes)}
    />
  );
};

GarmentsTable.propTypes = {
  data: PropTypes.array.isRequired,
  fitMode: PropTypes.bool,
  measures: PropTypes.object,
  onClick: PropTypes.func,
};

GarmentsTable.defaultProps = {
  fitMode: false,
  measures: {},
};

export default GarmentsTable;

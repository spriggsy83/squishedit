import React from 'react';
import {
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ErrorMessage } from 'formik';
import * as OPTS from './OPTS';

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: 'flex',
  },
  third: {
    width: '33%',
  },
  padLeft: {
    paddingLeft: theme.spacing(1),
  },
  padRight: {
    paddingRight: theme.spacing(1),
  },
  table: {
    width: '33%',
  },
}));

export default function(props) {
  const formik = props.form;
  const classes = useStyles();
  return (
    <>
      <TextField
        variant="outlined"
        label="Garment name"
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        required
        fullWidth
        margin="normal"
        className={classes.third}
      />
      <ErrorMessage
        name="name"
        component={Typography}
        color="error"
        gutterBottom
      />
      <div className={classes.flexRow}>
        <TextField
          variant="outlined"
          label="Limb"
          name="limb"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.limb}
          required
          margin="normal"
          fullWidth
          select
          className={classes.padRight}
        >
          {OPTS.LIMBS.map((opt, index) => {
            return (
              <MenuItem key={'limb' + index} value={opt}>
                {opt}
              </MenuItem>
            );
          })}
        </TextField>
        <ErrorMessage
          name="limb"
          component={Typography}
          color="error"
          gutterBottom
        />
        <TextField
          variant="outlined"
          label="Type"
          name="garmentType"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.garmentType}
          required
          margin="normal"
          fullWidth
          select
        >
          {OPTS.TYPES.map((opt, index) => {
            return (
              <MenuItem key={'gtype' + index} value={opt}>
                {opt}
              </MenuItem>
            );
          })}
        </TextField>
        <ErrorMessage
          name="garmentType"
          component={Typography}
          color="error"
          gutterBottom
        />
        <TextField
          variant="outlined"
          label="Compression Level"
          name="compressionLevel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.compressionLevel}
          required
          margin="normal"
          fullWidth
          select
          className={classes.padLeft}
        >
          {OPTS.COMPRESSCLASS.map((opt, index) => {
            return (
              <MenuItem key={'cclass' + index} value={opt}>
                {opt}
              </MenuItem>
            );
          })}
        </TextField>
        <ErrorMessage
          name="compressionLevel"
          component={Typography}
          color="error"
          gutterBottom
        />
      </div>
      <div className={classes.flexRow}>
        <TextField
          variant="outlined"
          label="Brand"
          name="brand"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.brand}
          required
          fullWidth
          margin="normal"
          className={classes.padRight}
        />
        <ErrorMessage
          name="brand"
          component={Typography}
          color="error"
          gutterBottom
        />
        <TextField
          variant="outlined"
          label="Size label"
          name="sizeLabel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.sizeLabel}
          required
          fullWidth
          margin="normal"
        />
        <ErrorMessage
          name="sizeLabel"
          component={Typography}
          color="error"
          gutterBottom
        />
        <TextField
          variant="outlined"
          label="Available lengths"
          name="lengths"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lengths}
          fullWidth
          margin="normal"
          className={classes.padLeft}
        />
        <ErrorMessage
          name="lengths"
          component={Typography}
          color="error"
          gutterBottom
        />
      </div>
      <TextField
        variant="outlined"
        label="Notes"
        name="notes"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.notes}
        fullWidth
        margin="normal"
      />
      <ErrorMessage
        name="notes"
        component={Typography}
        color="error"
        gutterBottom
      />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Measurement point</TableCell>
            <TableCell>Min (cm)</TableCell>
            <TableCell>Max (cm)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OPTS.MPOINTS.map((mpoint, index) => {
            const minName = mpoint + 'Min';
            const maxName = mpoint + 'Max';
            return (
              <TableRow key={'mp' + index}>
                <TableCell>{mpoint.toUpperCase()}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    name={minName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[minName]}
                    fullWidth
                    margin="none"
                  />
                  <ErrorMessage
                    name={minName}
                    component={Typography}
                    color="error"
                    gutterBottom
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    name={maxName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[maxName]}
                    fullWidth
                    margin="none"
                  />
                  <ErrorMessage
                    name={maxName}
                    component={Typography}
                    color="error"
                    gutterBottom
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

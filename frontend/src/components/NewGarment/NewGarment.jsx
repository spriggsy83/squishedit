import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';

import FormFields from './FormFields';
import { DEFAULTS } from '../../common/GARMENT-OPTS';
import Schema from './schema';
import { garments as api } from '../../api';

const TopPadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CreateForm = (props) => {
  const [errorMsg, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const submit = (values, actions) => {
    let cleanedData = {};
    for (let [key, value] of Object.entries(values)) {
      const cleanedVal = value.trim();
      if (cleanedVal.length) {
        cleanedData[key] = cleanedVal;
      }
    }
    api
      .create(cleanedData)
      .then(() => {
        setSuccessMsg('Added ' + cleanedData.name);
        actions.setSubmitting(false);
      })
      .catch((e) => {
        setError(e.message);
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      <Formik
        initialValues={props.initialValues || DEFAULTS}
        validationSchema={Schema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={submit}
      >
        {(thisForm) => (
          <React.Fragment>
            <FormFields form={thisForm} />
            {props.onCancelButton && (
              <TopPadButton
                variant="outlined"
                color="secondary"
                onClick={props.onCancelButton}
              >
                Cancel
              </TopPadButton>
            )}
            <TopPadButton
              onClick={() => thisForm.submitForm()}
              disabled={thisForm.isSubmitting}
              color="secondary"
              variant="contained"
            >
              Save
            </TopPadButton>
            {thisForm.isSubmitting && <LinearProgress color="secondary" />}
          </React.Fragment>
        )}
      </Formik>
      {successMsg && !props.onCreate && (
        <Typography variant="h6">{successMsg}</Typography>
      )}
      {errorMsg && !props.onApiError && (
        <Typography variant="h6" color="error">
          {errorMsg}
        </Typography>
      )}
    </>
  );
};

CreateForm.propTypes = {
  initialValues: PropTypes.object,
  // Function called on submit success, takes new object as arg
  onCreate: PropTypes.func,
  // Function accepting and handling error message
  onApiError: PropTypes.func,
  // If present, provides a Cancel button, calling this function
  onCancelButton: PropTypes.func,
  // For Update/Edit, this id is sent to updateById function
  editId: PropTypes.any,
};

export default CreateForm;

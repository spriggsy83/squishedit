import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';

import FormFields from './FormFields';
import DEFAULTS from './DEFAULTS';
import Schema from './schema';

const TopPadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

class CreateForm extends React.Component {
  state = {
    error: null,
    successMsg: null,
  };

  submit = (values, actions) => {
    console.log(values);
    /*const data = this.props.cleanInputs
      ? this.props.cleanInputs(values)
      : values;

    this.doPost(data, actions);*/
  };

  render() {
    const { error, successMsg } = this.state;

    return (
      <>
        <Formik
          initialValues={this.props.initialValues || DEFAULTS}
          validationSchema={Schema}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={this.submit}
        >
          {(thisForm) => (
            <React.Fragment>
              <FormFields form={thisForm} />
              {this.props.onCancelButton && (
                <TopPadButton
                  variant="outlined"
                  color="secondary"
                  onClick={this.props.onCancelButton}
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
        {successMsg && !this.props.onCreate && (
          <Typography variant="h6">{successMsg}</Typography>
        )}
        {error && !this.props.onApiError && (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        )}
      </>
    );
  }
}

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

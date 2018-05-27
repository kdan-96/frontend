import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input, Form } from 'semantic-ui-react';
import { withFormik } from 'formik';
import styled from 'styled-components';

const serviceTypes = ['Place', 'Activity', 'Food'];
const serviceTypeDropdownOptions = serviceTypes.map(text => ({ value: text.toLowerCase(), text }));
const hours = Array.from({ length: 24 }, (v, k) => k);
const hoursDropdownOptions = hours.map(h => ({ value: h, text: h.toString().padStart(2, '0') + ':00' }));
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ErrorMsg = styled.div`
  color: red;
`;

class NewServiceForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    tagOptions: [],
  };

  onTagAddition = (e, { value }) => {
    this.setState(prevState => ({
      tagOptions: [{ text: value, value }, ...prevState.tagOptions],
    }));
  };

  onDropDownChange = (e, { name, value }) => {
    const { setFieldValue, setFieldTouched } = this.props;
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
  };

  onAvailableDaysChange = (e, { label, checked }) => {
    const { values, setFieldValue, setFieldTouched } = this.props;
    const availableDays = values.availableDays;
    if (checked) {
      // checked
      availableDays.add(label);
    } else {
      // unchecked
      availableDays.delete(label);
    }
    setFieldValue('availableDays', availableDays);
    setFieldTouched('availableDays', true, false);
  };

  render() {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = this.props;
    const defaultProps = {
      onChange: handleChange,
      onBlur: handleBlur,
    };
    return (
      <Form onSubmit={handleSubmit}>
        {/* Service Type */}
        <Form.Field required>
          <label>Service type</label>
          <Dropdown
            name="serviceType"
            placeholder="Service Type"
            selection
            options={serviceTypeDropdownOptions}
            onChange={this.onDropDownChange}
            error={!!(touched.serviceType && errors.serviceType)}
          />
          {touched.serviceType && errors.serviceType && <ErrorMsg>{errors.serviceType}</ErrorMsg>}
        </Form.Field>

        {/* Name */}
        <Form.Field required>
          <label>Service name</label>
          <Form.Input
            name="name"
            placeholder="Service name"
            error={!!(touched.name && errors.name)}
            {...defaultProps}
          />
          {touched.name && errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </Form.Field>

        {/* Description */}
        <Form.Field required>
          <label>Service description</label>
          <Form.TextArea
            name="description"
            placeholder="Tell us more..."
            error={!!(touched.description && errors.description)}
            {...defaultProps}
          />
          {touched.description && errors.description && <ErrorMsg>{errors.description}</ErrorMsg>}
        </Form.Field>

        {/* Price */}
        <Form.Field required>
          <label>Price Per Day/Night</label>
          <Form.Input name="price" error={!!(touched.price && errors.price)} {...defaultProps} />
          {touched.price && errors.price && <ErrorMsg>{errors.price}</ErrorMsg>}
        </Form.Field>

        {/* Accept Ethereum */}
        <Form.Field>
          <label>Accept Ethereum</label>
          <Form.Checkbox id="acceptEthereum" name="acceptEthereum" {...defaultProps} />
        </Form.Field>

        {/* Available Days */}
        <Form.Group grouped>
          <label>Available Days</label>
          {weekDays.map(weekDay => (
            <Form.Checkbox
              id={weekDay}
              label={weekDay}
              key={weekDay}
              name={weekDay}
              checked={values.availableDays.has(weekDay)}
              onChange={this.onAvailableDaysChange}
            />
          ))}
          {touched.availableDays && errors.availableDays && <ErrorMsg>{errors.availableDays}</ErrorMsg>}
        </Form.Group>

        {/* Lat/Lng */}
        <Form.Group widths="equal">
          <Form.Field required>
            <label>Latitude</label>
            <Form.Input name="latitude" error={!!(touched.latitude && errors.latitude)} {...defaultProps} />
            {touched.latitude && errors.latitude && <ErrorMsg>{errors.latitude}</ErrorMsg>}
          </Form.Field>
          <Form.Field required>
            <label>Longitude</label>
            <Form.Input name="longitude" error={!!(touched.longitude && errors.longitude)} {...defaultProps} />
            {touched.longitude && errors.longitude && <ErrorMsg>{errors.longitude}</ErrorMsg>}
          </Form.Field>
        </Form.Group>

        {/* Timings */}
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Dropdown
              name="openingTime"
              label="Opening time"
              placeholder="Select opening time"
              selection
              required
              options={hoursDropdownOptions}
              onChange={this.onDropDownChange}
              error={!!(touched.openingTime && errors.openingTime)}
            />
            {touched.openingTime && errors.openingTime && <ErrorMsg>{errors.openingTime}</ErrorMsg>}
          </Form.Field>
          <Form.Field>
            <Form.Dropdown
              name="closingTime"
              label="Closing time"
              placeholder="Select closing time"
              selection
              required
              options={hoursDropdownOptions}
              onChange={this.onDropDownChange}
              error={!!(touched.closingTime && errors.closingTime)}
            />
            {touched.closingTime && errors.closingTime && <ErrorMsg>{errors.closingTime}</ErrorMsg>}
          </Form.Field>
        </Form.Group>

        {/* Tags */}
        <Form.Field>
          <label>Tags</label>
          <Dropdown
            name="tags"
            options={this.state.tagOptions}
            placeholder="Add tags"
            search
            selection
            fluid
            multiple
            allowAdditions
            value={values.tags}
            onAddItem={this.onTagAddition}
            onChange={this.onDropDownChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Service Picture</label>
          <Input type="file" name="picture" />
        </Form.Field>

        <Form.Button disabled={isSubmitting}>Submit</Form.Button>
      </Form>
    );
  }
}

function validate(values) {
  const requiredFields = [
    'serviceType',
    'name',
    'description',
    'price',
    'availableDays',
    'latitude',
    'longitude',
    'openingTime',
    'closingTime',
  ];
  const errors = checkRequiredFields(values, requiredFields);
  const numericFields = ['price', 'latitude', 'longitude'];
  for (const field of numericFields) {
    if (!errors[field] && isNaN(values[field])) {
      errors[field] = 'Invalid number';
    }
  }
  const hourFields = ['openingTime', 'closingTime'];
  for (const field of hourFields) {
    if (!errors[field] && (values[field] < 0 || values[field] > 23)) {
      errors[field] = 'Invalid hour';
    }
  }

  return errors;
}

function checkRequiredFields(values, requiredFields) {
  return requiredFields.reduce((errors, fieldName) => {
    const fieldValue = values[fieldName];
    if (fieldValue == null || fieldValue.length === 0 || fieldValue.size === 0) errors[fieldName] = 'Required';
    return errors;
  }, {});
}

export default withFormik({
  mapPropsToValues: () => ({
    serviceType: null,
    name: null,
    description: null,
    price: null,
    availableDays: new Set(),
    openingTime: null,
    closingTime: null,
    latitude: null,
    longitude: null,
    tags: [],
  }),
  validate,
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
})(NewServiceForm);

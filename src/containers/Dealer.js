import React, { useState } from "react";
import { useFormFields } from "../libs/hooksLib";
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function AddDealer() {
    const [fields, handleFieldChange] = useFormFields({
        name: "",
        email: "",
        phone: "",
        dealershipname: "",
        address: "",
        postalcode: "",
        province: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");

    async function handleSubmit(event) {

    }

    function validateForm() {
      return content.length > 0;
    }

    function renderForm() {
      return (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Manager Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={fields.text}
              onChange={handleFieldChange}
            />
            </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="number" bsSize="large">
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              type="text"
              value={fields.number}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Address</ControlLabel>
            <FormControl
              type="password"
              onChange={handleFieldChange}
              value={fields.confirmPassword}
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Postal Code</ControlLabel>
            <FormControl
              type="password"
              onChange={handleFieldChange}
              value={fields.confirmPassword}
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Province</ControlLabel>
            <FormControl
              type="password"
              onChange={handleFieldChange}
              value={fields.confirmPassword}
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Add
          </LoaderButton>
        </form>
      );
    }

    return (
        <div className="AddDealer">
           {renderForm()}
        </div>
      );
};






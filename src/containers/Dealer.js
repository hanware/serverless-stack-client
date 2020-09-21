import React, { useRef, useState } from "react";
import { useFormFields } from "../libs/hooksLib";
import {FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewNote.css";
import { s3Upload } from "../libs/awsLibs"

export default function AddDealer() {
    const [fields, handleFieldChange] = useFormFields({
        name: "",
        email: "",
        phone: "",
        dealershipname: "",
        address: "",
        city: "",
        postalcode: "",
        province: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");
    const file = useRef(null);

    async function handleSubmit(event) {
      event.preventDefault();

      if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
        // alert(
        //   `Please pick a file smaller than ${
        //   config.MAX_ATTACHMENT_SIZE / 1000000
        //   } MB.`
        // );
        return;
      }

      setIsLoading(true);

      try {
        const attachment = file.current ? await s3Upload(file.current) : null;

        // await createNote({ content, attachment });
        // history.push("/");
      } catch (e) {
        onError(e);
        setIsLoading(false);
      }
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
          <FormGroup controlId="dealershipname" bsSize="large">
            <ControlLabel>Dealership Name</ControlLabel>
            <FormControl
              type="text"
              onChange={handleFieldChange}
              value={fields.text}
            />
            </FormGroup>
          <FormGroup controlId="address" bsSize="large">
            <ControlLabel>Address</ControlLabel>
            <FormControl
              type="text"
              onChange={handleFieldChange}
              value={fields.text}
            />
            </FormGroup>
          <FormGroup controlId="city" bsSize="large">
            <ControlLabel>City</ControlLabel>
            <FormControl
              type="text"
              onChange={handleFieldChange}
              value={fields.text}
            />
          </FormGroup>
          <FormGroup controlId="province" bsSize="large">
            <ControlLabel>Province</ControlLabel>
            <FormControl
              type="text"
              onChange={handleFieldChange}
              value={fields.text}
            />
          </FormGroup>
          <FormGroup controlId="postalcode" bsSize="large">
            <ControlLabel>Postal Code</ControlLabel>
            <FormControl
              type="text"
              onChange={handleFieldChange}
              value={fields.text}
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






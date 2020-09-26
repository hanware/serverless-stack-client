import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import "./AddDealership.css";
import { API } from "aws-amplify";

export default function AddDealership() {
  const [fields, handleFieldChange] = useFormFields({
    dealershipname: "",
    email: "",
    phone: "",
    dealershipname: "",
    address: "",
    city: "",
    postalcode: "",
    province: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // const file = useRef(null);
  const history = useHistory();
  //const { isAuthenticated } = useAppContext();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     return;
  //   }

  //   // try {
  //   //   const dealer = await loadDealerships();
  //   //   setDealerships(dealerships);
  //   // } catch (e) {
  //   //   onError(e);
  //   // }
  // }, [isAuthenticated]);

  function validateForm() {
    const containsContent = (currentValue) => currentValue.length > 0;
    return Object.values(fields).every(containsContent);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert(
    //     `Please pick a file smaller than ${
    //     config.MAX_ATTACHMENT_SIZE / 1000000
    //     } MB.`
    //   );
    //   return;
    // }

    setIsLoading(true);

    try {
      //const attachment = file.current ? await s3Upload(file.current) : null;
      const dealershipname = fields.dealershipname;
      const address = fields.address;
      await createDealer({ dealershipname, address });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createDealer(dealer) {
    return API.post("dealerships", "/dealerships", {
      body: dealer,
    });
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="dealershipname" bsSize="large">
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
        <FormGroup controlId="phone" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            type="text"
            value={fields.phone}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="dealershipname" bsSize="large">
          <ControlLabel>Dealership Name</ControlLabel>
          <FormControl
            type="text"
            onChange={handleFieldChange}
            value={fields.dealershipname}
          />
        </FormGroup>
        <FormGroup controlId="address" bsSize="large">
          <ControlLabel>Address</ControlLabel>
          <FormControl
            type="text"
            onChange={handleFieldChange}
            value={fields.address}
          />
        </FormGroup>
        <FormGroup controlId="city" bsSize="large">
          <ControlLabel>City</ControlLabel>
          <FormControl
            type="text"
            onChange={handleFieldChange}
            value={fields.city}
          />
        </FormGroup>
        <FormGroup controlId="province" bsSize="large">
          <ControlLabel>Province</ControlLabel>
          <FormControl
            type="text"
            onChange={handleFieldChange}
            value={fields.province}
          />
        </FormGroup>
        <FormGroup controlId="postalcode" bsSize="large">
          <ControlLabel>Postal Code</ControlLabel>
          <FormControl
            type="text"
            onChange={handleFieldChange}
            value={fields.postalcode}
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

  return <div className="AddDealership">{renderForm()}</div>;
}

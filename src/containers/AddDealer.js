import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import "./AddDealership.css";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";

export default function AddDealer() {
  const [fields, handleFieldChange] = useFormFields({
    dealerfirstname: "",
    dealersecondname: "",
    email: "",
    phone: "",
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

//   function renderDealerList(dealer) {
//     return (
//         <div className="notes">
//           <PageHeader>Dealers</PageHeader>
//           <ListGroup>
//             {!isLoading && renderDealerList(dealer)}
//           </ListGroup>
//         </div>
//       );
//   }

  function deleteDealership() {
    return API.del("dealerships", `/dealerships/${id}`);
  }

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
      const dealerfirstname = fields.dealerfirstname;
      const dealerlastname = fields.dealerlastname
      await createDealer({ dealerfirstname, dealerlastname });
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
        <FormGroup controlId="dealerfirstname" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={fields.text}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="dealersecondname" bsSize="large">
          <ControlLabel>Second Name</ControlLabel>
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

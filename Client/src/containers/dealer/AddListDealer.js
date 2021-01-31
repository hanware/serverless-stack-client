import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFormFields } from "../../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../../libs/errorLib";
import "./AddDealer.css";
import { API } from "aws-amplify";
import { useAppContext } from "../../libs/contextLib";

export default function AddListDealer() {
  const [fields, handleFieldChange] = useFormFields({
    dealerfirstname: "",
    dealersecondname: "",
    email: "",
    phone: "",
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { dealers,setDealers} = useState([]);
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        // const dealers = await loadDealers();
        // console.log(dealers)
        // setDealers(dealers);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

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

  // function deleteDealer() {
  //   return API.del("appreciation", `/dealer/${id}/${dealerid}`);
  // }

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
      const dealerlastname = fields.dealerlastname;
      const email = fields.email;
      const phone = fields.phone;
      await createDealer({ dealerfirstname, dealerlastname, email, phone });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createDealer(dealer) {
    return API.post("appreciation", `/dealer/${id}`, {
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
        <FormGroup controlId="dealerlastname" bsSize="large">
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
          // disabled={!validateForm()}
        >
          Add
        </LoaderButton>
      </form>
    );
  }

  function renderDealer() {
    return (
      <div className="notes">
        <ListGroup>{!isLoading && renderDealerList(dealers)}</ListGroup>
      </div>
    );
  }

  function renderDealerList(dealers) {
    return [{}].concat(dealers).map(
      (dealer, i) => (
        //i !== 0 ? (
        <LinkContainer key={dealer.dealerId} to={`/dealer/${dealer.dealerId}`}>
          <ListGroupItem header={dealer.dealerId}>
            {"Created: " + new Date(dealer.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      )
      //) : (
      //   <LinkContainer key="dealership" to="/dealership">
      //     <ListGroupItem>
      //       <h4>
      //         <b>{"\uFF0B"}</b> Add a Dealership
      //     </h4>
      //     </ListGroupItem>
      //   </LinkContainer>
    );
    //)
  }

  return <div className="AddDealership">{renderForm()}</div>;
}

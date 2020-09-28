import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./ViewDealer.css";
import { LinkContainer } from "react-router-bootstrap";

export default function ViewDealer() {
  const { id } = useParams();
  const history = useHistory();
  //const [dealership, setDealership] = useState(null);
  //const [dealershipname, setDealershipname] = useState("");
  const [dealer, setDealer] = useState(null)
  const [dealerfirstname, setDealerfirstname] = useState("");
  const [dealerlastname, setDealerlastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  //const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  //const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    function loadDealer() {
      return API.get("appreciation", `/dealer/`);
    }

    async function onLoad() {
      try {
        const dealer = await loadDealer();
        const { dealerfirstname, dealerlastname, email, phone } = dealer;

        setDealerfirstname(dealerfirstname);
        setDealerlastname(dealerlastname);
        setEmail(email);
        setPhone(phone);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return dealerfirstname.length > 0 && dealerlastname.lenght > 0 && email.length > 0 && phone.length > 0;
  }

  function saveDealer(dealer) {
    return API.put("appreciation", `/dealer/`, {
      body: dealer,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {

      await saveDealer({
        dealerfirstname,
        dealerlastname,
        email,
        phone,
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function handleFileChange(event) {

}

  function deleteDealer() {
    return API.del("appreciation", `/dealer/`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteDealer();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Dealer">
      {dealer && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="dealerfirstname">
            <FormControl
              value={dealerfirstname}
              componentClass="textarea"
              onChange={(e) => setDealerfirstname(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="dealerlastname">
            <FormControl
              value={dealerlastname}
              componentClass="textarea"
              onChange={(e) => setDealerlastname(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="email">
            <FormControl
              value={email}
              componentClass="textarea"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="phone">
            <FormControl
              value={phone}
              componentClass="textarea"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
          <LinkContainer key="dealer" to="/dealer/${id}">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Add a Dealer
            </h4>
            </ListGroupItem>
          </LinkContainer>
          </FormGroup>
          {/* {note.attachment && (
                        <FormGroup>
                            <ControlLabel>Attachment</ControlLabel>
                            <FormControl.Static>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={note.attachmentURL}
                                >
                                    {formatFilename(note.attachment)}
                                </a>
                            </FormControl.Static>
                        </FormGroup> */}
          {/* )} */}
          {/* <FormGroup controlId="file">
                        {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
                        <FormControl onChange={handleFileChange} type="file" />
                    </FormGroup> */}
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            //disabled={!validateForm()}
            onChange={handleFileChange}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}





//${id}
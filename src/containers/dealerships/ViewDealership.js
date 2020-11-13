import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "./ViewDealership.css";
import { s3Upload } from "../../libs/awsLibs";
import { LinkContainer } from "react-router-bootstrap";

export default function ViewDealership() {
  const { id, dealerid } = useParams();
  const history = useHistory();
  const [dealership, setDealership] = useState(null);
  const [dealershipname, setDealershipname] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const [ dealers, setDealers ] = useState([]);

  useEffect(() => {
    function loadDealership() {
      return API.get("appreciation", `/dealerships/${id}`);
    }

    async function onLoad() {
      try {
        const dealership = await loadDealership();
        const { dealershipname, address, createdAt } = dealership;

        setDealership(dealership);
        setDealershipname(dealershipname);
        setAddress(address);
        setCreatedAt(createdAt);

        const dealers = await loadDealers();
        setDealers(dealers);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return dealershipname.length > 0 && address.lenght > 0;
  }

  function loadDealers() {
    return API.get("appreciation", `/dealers/${id}`);
  }

  function saveDealership(dealerships) {
    return API.put("appreciation", `/dealerships/${id}`, {
      body: dealerships,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await saveDealership({
        dealershipname,
        address,
      });

      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteDealership() {
    return API.del("appreciation", `/dealerships/${id}`);
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
      await deleteDealership();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Dealership">
      {dealership && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="dealershipname">
            <FormControl
              value={dealershipname}
              componentClass="textarea"
              onChange={(e) => setDealershipname(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="address">
            <FormControl
              value={address}
              componentClass="textarea"
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="createdAt">
            <FormControl
              placeholder={new Date(createdAt).toLocaleDateString()}
              type="text"
              onChange={(e) => {}}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <LinkContainer key="dealer" to={`/dealer/${id}`}>
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Add a Dealer
                </h4>
              </ListGroupItem>
            </LinkContainer>
          </FormGroup>
          <FormGroup>
            {dealers && dealers.map((dealer, i) => (
              <LinkContainer
                key={dealer.dealerId}
                to={`/dealer/${id}/${dealer.dealerId}`}
              >
                <ListGroupItem header={dealer.dealerfirstname + " " + dealer.dealerlastname}>
                  {"Created: " + new Date(dealer.createdAt).toLocaleString()}
                </ListGroupItem>
              </LinkContainer>
            ))}
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            // onChange={handleFileChange}
          >
            Save
          </LoaderButton>
        </form>
      )}
    </div>
  );
}

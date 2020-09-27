import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import "../Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default function ListDealerships() {
  const [dealerships, setDealerships] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const dealerships = await loadDealerships();
        setDealerships(dealerships);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadDealerships() {
    return API.get("appreciation", "/dealerships");
  }

  function renderDealershipsList(dealerships) {
    return [{}].concat(dealerships).map((dealership, i) =>
      i !== 0 ? (
        <LinkContainer key={dealership.dealershipId} to={`/dealership/${dealership.dealershipId}`}>
          <ListGroupItem header={dealership.dealershipname}>
            {"Created: " + new Date(dealership.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
          <LinkContainer key="dealership" to="/dealership">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Add a Dealership
            </h4>
            </ListGroupItem>
          </LinkContainer>
        )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Appreciation</h1>
        <p>Dealerships</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
          <Link to="/dealership" className="btn btn-success btn-lg">
            Dealer
          </Link>
        </div>
      </div>
    );
  }

  function renderDealerships() {
    return (
      <div className="notes">
        <PageHeader>Dealerships</PageHeader>
        <ListGroup>
          {!isLoading && renderDealershipsList(dealerships)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderDealerships() : renderLander()}
    </div>
  );
}

//.trim().split("\n")[0]
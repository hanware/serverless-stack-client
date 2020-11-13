import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import "../Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function ListDealer() {
  const { id } = useParams(); 
  const [dealer, setDealer] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const dealer = await loadDealer();
        setDealer(dealer);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadDealer() {
    return API.get("appreciation", `/listdealer/${id}`);
  }

  function renderDealerList(dealers) {
    return [{}].concat(dealers).map((dealer, i) =>
      //i !== 0 ? (
        <LinkContainer key={dealer.dealerId} to={`/dealer/${dealer.dealerId}`}>
          <ListGroupItem header={dealer.dealerId}>
            {"Created: " + new Date(dealer.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      //) : (
        //   <LinkContainer key="dealership" to="/dealership">
        //     <ListGroupItem>
        //       <h4>
        //         <b>{"\uFF0B"}</b> Add a Dealership
        //     </h4>
        //     </ListGroupItem>
        //   </LinkContainer>
        )
    //)
  };

//   function renderLander() {
//     return (
//       <div className="lander">
//         <h1>Appreciation</h1>
//         <p>Dealerships</p>
//         <div>
//           <Link to="/login" className="btn btn-info btn-lg">
//             Login
//           </Link>
//           <Link to="/signup" className="btn btn-success btn-lg">
//             Signup
//           </Link>
//           <Link to="/dealership" className="btn btn-success btn-lg">
//             Dealer
//           </Link>
//         </div>
//       </div>
//     );
//   }

  function renderDealer() {
    return (
      <div className="notes">
        <ListGroup>
          {!isLoading && renderDealerList(dealer)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderDealer() : renderLander()}
    </div>
  );
}

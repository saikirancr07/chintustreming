
import React from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom";

const withRouter = (WrappedComponent) => {
  const Chintu=(props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return (
      <WrappedComponent
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  };
  return Chintu
};

export default withRouter;
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Alert = ({ alerts }) => {
  return (
    <Fragment>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
              {console.log("Hello")}
            </div>
          );
        })}
    </Fragment>
  );
};

alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
// from whatever we want from reducer
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

// connect(state want to map, object with any action we want to use)
export default connect(mapStateToProps)(Alert);

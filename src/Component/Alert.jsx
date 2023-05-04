import React from "react";

const Alert = ({ showAlert, message, alertType,
     okButtonAction }) => {
  
if (!showAlert) {
    return null;
  }

  const handleOkButtonClick = () => {
    if (okButtonAction) {
      okButtonAction();
    }
  };

//   const handleCancelButtonClick = () => {
//     if (cancelButtonAction) {
//       cancelButtonAction();
//     }
//   };

  return (
    <div className={`alert alert-${alertType}`}>
      <h4>{message}</h4>
      <div>
        {okButtonAction && <button className="small-button-green" onClick={handleOkButtonClick}>OK</button>}
        {/* {cancelButtonAction && <button className="blockButton" onClick={handleCancelButtonClick}>CCancel</button>} */}
      </div>
    </div>
  );
};

export default Alert;

// showAlert: A boolean value to control the visibility of the alert box.
// message: The message to be displayed in the alert box.
// alertType: The type of the alert (e.g., "success", "error", etc.). This is used to apply appropriate styling to the alert box.
// okButtonAction: An optional function to be executed when the "OK" button is clicked.
// cancelButtonAction: An optional function to be executed when the "Cancel" button is clicked.
// handleClose: A function to close the alert box.
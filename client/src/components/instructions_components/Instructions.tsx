import { useState } from "react";
import { Alert } from "react-bootstrap";

const Instructions = () => {
  const [display, setDisplay] = useState(false);
  return (
    <div>
      {display ? (
        <Alert
          className={"instructions-alert"}
          onClose={() => setDisplay((cur) => false)}
          dismissible
        >
          <p>
            If you approve of the answer currently selected, click "next", or
            update the answer and hit "next."
          </p>
          <p>Click "back" to go to the previous question.</p>
          <p>
            When you've finished the section, you can move on to a different
            question set.
          </p>
          <p>Feel free to jump around!</p>
          <p>
            Click "Dashboard" on the navigation bar to return to the main
            dashboard.
          </p>
        </Alert>
      ) : (
        <div
          className={"instructions-button"}
          onClick={() => {
            setDisplay((cur) => true);
          }}
        >
          <strong>i</strong>
        </div>
      )}
    </div>
  );
};

export default Instructions;

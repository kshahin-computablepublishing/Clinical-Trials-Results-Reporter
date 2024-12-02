import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import {
    Button,
  } from 'semantic-ui-react';
import './App.css';
import './Table.css';
import ServerSaveState from './ServerSaveState';
import ConvertStateToEBMonFHIR from './ConvertStateToEBMonFHIR';
import { useToasts } from 'react-toast-notifications';

  const NavigationButtons = ( { formState, updatePageNumber, resetFormStateWithWarning, saveStateToTXT, saveFHIR } ) => {

    const { addToast } = useToasts();

    const saveToServer = async () => {
      const response = await ServerSaveState(formState);

      if (response === "error") {
        addToast("ERROR, could not save to server", { appearance: 'error' });
        console.log(response);
        console.log("-----------error--------");
      } else {
        console.log(response);
        console.log("HERE")
        addToast('Saved to Server', { appearance: 'success' });
      }
    }

    return (
        <span>
        <Switch>
          <Route path={"/ctrr/2"} exact>
            <Button className="formButton previousPageButton" content="Previous Page" disabled />
          </Route>
          <Route path={"/ctrr/3"} exact>
            <Link to={`/ctrr/2`} onClick={updatePageNumber}>
              <Button className="formButton previousPageButton" content="Previous Page" compact />
            </Link>
          </Route>
          <Route path={"/ctrr/4"} exact>
            <Link to={`/ctrr/3`} onClick={updatePageNumber}>
              <Button className="formButton previousPageButton" content="Previous Page" compact />
            </Link>
          </Route>
          <Route path={"/ctrr/5"} exact>
            <Link to={`/ctrr/4`} onClick={updatePageNumber}>
              <Button className="formButton previousPageButton" content="Previous Page" compact />
            </Link>
          </Route>
          <Route>
            <Link to={`/ctrr/${formState.currentPage-1}`} onClick={updatePageNumber}>
              <Button className="formButton previousPageButton" content="Previous Page" compact />
            </Link>
          </Route>
        </Switch>
        <span style={{paddingLeft: "10px"}}></span>
        <Switch>
          <Route path={"/ctrr/5"} exact>
            <Button className="formButton continueButton" content="Next Page"  compact disabled />
          </Route>
          <Route path={"/ctrr/4"} exact>
            <Link to={`/ctrr/5`} onClick={updatePageNumber}>
              <Button className="formButton continueButton" content="Next Page" compact />
            </Link>
          </Route>
          <Route path={"/ctrr/3"} exact>
            <Link to={`/ctrr/4`} onClick={updatePageNumber}>
              <Button className="formButton continueButton" content="Next Page" compact />
            </Link>
          </Route>
          <Route path={"/ctrr/2"} exact>
            <Link to={`/ctrr/3`} onClick={updatePageNumber}>
              <Button className="formButton continueButton" content="Next Page" compact />
            </Link>
          </Route>
          <Route>
            <Link to={`/ctrr/${formState.currentPage+1}`} onClick={updatePageNumber}>
              <Button className="formButton continueButton" content="Next Page" compact />
            </Link>
          </Route>
        </Switch>
        <span style={{paddingLeft: "20px"}}></span>
        <Button className="formButton resetButton" content="Restart Form" negative compact onClick={() => { resetFormStateWithWarning() } } />
        <span style={{paddingLeft: "10px"}}></span>
        <Button className="formButton saveProgressButton" content="Save Progress" positive compact onClick={() => { saveStateToTXT() } } />
        <span style={{paddingLeft: "10px"}}></span>
        <Button className="formButton" content="Save to Server" compact onClick={saveToServer} />
        <span style={{paddingLeft: "10px"}}></span>
        <Button className="formButton convertButton" content="Convert to FHIR" compact onClick={() => { saveFHIR(ConvertStateToEBMonFHIR(formState)) } } />
        </span>
    );
  };

  export default NavigationButtons;
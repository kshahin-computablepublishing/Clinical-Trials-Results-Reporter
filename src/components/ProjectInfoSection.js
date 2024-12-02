import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import {
    Button,
    Segment,
    Dropdown,
  } from 'semantic-ui-react';
import {
      TextField
  } from '@material-ui/core';
import './App.css';
import './Table.css';
import ServerLoadState from './ServerLoadState';

const ProjectInfoSection = ( { formState, loadState, loadSampleState, startProject, nameProject, loadStateFromFile, selectServerState, updatePageNumber } ) => {

  const changeSelectedServerState = (e, {value}) => {
    selectServerState(value);
  };
 
  return (
    <div>
    <br />
    <Segment>
      <p>This tool provides user-friendly support to enter results (statistical summary of baseline measures and outcome measures) from clinical trials, and convert the results to computable form in FHIR Evidence Resources.</p>
    </Segment>
    <br />
    <Segment className={`containerSegment`} raised>
      <h1>Start</h1>
      <div className="inputLine middleAlign leftAlign">
      {/*<Button className="formButton loadFromJSONFileButton" content="Load from JSON file" onClick={loadStateFromFile} /> */}
      <label><b>Load previously saved file:</b>&nbsp;</label><input type="file" accept=".txt, .json, .text" label="" onChange={(e) => { loadStateFromFile(e) } } />
      {formState.statesOnServer ? 
        <>
          <label className="rangeToLabel">or&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <Dropdown
            className="loadFromServerDropDown"
            placeholder='Load from Server'
            options={formState.statesOnServer}
            value={formState.selectedServerState}
            onChange={changeSelectedServerState}
            fluid
            selection
          />&nbsp;&nbsp;&nbsp;
          <Button className="formButton continueButton" content="Go" positive compact onClick={() => { ServerLoadState(formState, loadState); } } disabled={formState.selectedServerState === "" ? true : false}/>
        </> :  <></> }
      </div>
      <br />
      <Button className="formButton" content="Load Sample Data" compact onClick={() => { loadSampleState(); } } />
      <div className="inputLine middleAlign leftAlign"><TextField className="inputField projectNameInput" label="Enter project name" onChange={(e) => { nameProject(e.target.value); } } size="small" variant='outlined' type="text"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/ctrr/2">
        <Button className="formButton continueButton" content="Continue" positive compact onClick={() => { startProject(); updatePageNumber(); } } />
      </Link>
      </div>
      <br />
      {/*
      <Link to="/ctrr/2">
        <Button className="formButton continueButton" content="Continue without saving" negative compact onClick={() => { nameProject(""); startProject(); }} />
      </Link>
      */}
    </Segment>
    <br />
    <Segment>
      <p><b>NIH/NLM Support:</b>  This tool (Clinical Trial Results Reporter) was stimulated and partially supported by the Lister Hill National Center for Biomedical Communications, a division of the U.S. National Library of Medicine (NLM), National Institutes of Health, Department of Health and Human Services; NLM is not responsible for the product and does not endorse or recommend this or any other product.</p>
    </Segment>
    </div>
  );
};

  export default ProjectInfoSection;
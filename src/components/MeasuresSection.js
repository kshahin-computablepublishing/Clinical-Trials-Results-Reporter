import React from 'react';
import {
    Button,
  } from 'semantic-ui-react';
import './App.css';
import './Table.css';
import MeasuresTable from './MeasuresTable';


  const MeasuresSection = ( { measureType, formState, updateDetails, updateTrialArmsState, addMeasureRow, updateMeasureOutcome, addUnitOfMeasure, addUnitOfTimeMeasure } ) => {

    /*
    let previousPageNumber = 2;
    let nextPageNumber = 4;
    if (measureType === "outcomeMeasures"){
      previousPageNumber = 3;
      nextPageNumber = 5;
    }
    */

    return (
        <div>
            <MeasuresTable measureType={measureType} formState={formState} allUnitsDisplay={formState.allUnitsDisplay} updateDetails={updateDetails} updateTrialArmsState={updateTrialArmsState} updateMeasureOutcome={updateMeasureOutcome} addUnitOfMeasure={addUnitOfMeasure} addUnitOfTimeMeasure={addUnitOfTimeMeasure} />
            <Button.Group floated="right"><Button primary className="formButton addRowButton" onClick={() => addMeasureRow(measureType)}>+ Add Row</Button></Button.Group>
            <br /><br /><br /><br />
        </div>
    );
  };

  
  export default MeasuresSection;
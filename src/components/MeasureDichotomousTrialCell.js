import React from 'react';
import {
    Table,
  } from 'semantic-ui-react';
import './App.css';
import './Table.css';
import MeasureDichotomousTrialInputCell from './MeasureDichotomousTrialInputCell';
import MeasureDichotomousTrialCalculatedCell from './MeasureDichotomousTrialCalculatedCell';


  const MeasureDichotomousTrialCell = ({measureType, measuresIndex, trialArmsIndex, updateTrialArmsState, trialArm}) => {


    return (
        <Table.Cell className="measureDichotomousTrialCell dichotomousTrialCell trialCell">
          <table className="compoundCellTable">
            <tbody className="compundCellBody">
              <tr className="compundCellRow inputCellRow"><MeasureDichotomousTrialInputCell measureType={measureType} trialArm={trialArm} trialArmsIndex={trialArmsIndex} measuresIndex={measuresIndex} updateTrialArmsState={updateTrialArmsState} /></tr>
              <tr className="compundCellRow calculatedCellRow"><MeasureDichotomousTrialCalculatedCell measureType={measureType} trialArm={trialArm} /></tr>
            </tbody>
          </table>
        </Table.Cell>
    );
  };

  export default MeasureDichotomousTrialCell;
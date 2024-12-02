import React from 'react';
import {
    Table,
  } from 'semantic-ui-react';
import './App.css';
import './Table.css';
import MeasureContinuousTrialInputCell from './MeasureContinuousTrialInputCell';

  const MeasureContinuousTrialCell = ({measureType, measuresIndex, trialArmsIndex, updateTrialArmsState, trialArm, outcome}) => {

    return (
        <Table.Cell className="measureContinuousTrialCell  continuousTrialCell trialCell">
          <table className="compoundCellTable">
            <tbody className="compundCellBody">
              <tr className="compundCellRow inputCellRow"><MeasureContinuousTrialInputCell measureType={measureType} trialArm={trialArm} trialArmsIndex={trialArmsIndex} measuresIndex={measuresIndex} updateTrialArmsState={updateTrialArmsState} outcome={outcome} /></tr>
            </tbody>
          </table>
        </Table.Cell>
    );
  };

  export default MeasureContinuousTrialCell;
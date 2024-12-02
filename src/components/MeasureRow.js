import React from 'react';
import {
    Table,
  } from 'semantic-ui-react';
import './App.css';
import './Table.css';
import MeasureOutcomeCell from './MeasureOutcomeCell';
import MeasureDichotomousTrialCell from './MeasureDichotomousTrialCell';
import MeasureContinuousTrialCell from './MeasureContinuousTrialCell';
import BaselineMeasureTotalCell from './BaselineMeasureTotalCell';
import OutcomeMeasureTotalCell from './OutcomeMeasureTotalCell';

    const MeasureRow = ({measureType, measuresIndex, measure, allUnitsDisplay, updateTrialArmsState, updateMeasureOutcome, unitOfMeasures, addUnitOfMeasure, unitOfTimeMeasures, addUnitOfTimeMeasure} ) => {

        const measureDichotomousTrialCells = measure.trialArms.map((trialArm) => {
            return <MeasureDichotomousTrialCell key={trialArm.id} measureType={measureType} measuresIndex={measuresIndex} trialArmsIndex={trialArm.id} trialArm={trialArm} updateTrialArmsState={updateTrialArmsState} />
        });

        const measureContinuousTrialCells = measure.trialArms.map((trialArm) => {
            return <MeasureContinuousTrialCell key={trialArm.id} measureType={measureType} measuresIndex={measuresIndex} trialArmsIndex={trialArm.id} trialArm={trialArm} updateTrialArmsState={updateTrialArmsState} outcome={measure.outcome} />
        });

        return (
            <Table.Row className="resultsTableRow">
                <MeasureOutcomeCell measureType={measureType} outcome={measure.outcome} measuresIndex={measuresIndex} allUnitsDisplay={allUnitsDisplay} updateMeasureOutcome={updateMeasureOutcome} unitOfMeasures={unitOfMeasures} addUnitOfMeasure={addUnitOfMeasure} unitOfTimeMeasures={unitOfTimeMeasures} addUnitOfTimeMeasure={addUnitOfTimeMeasure} />
                {measure.outcome.dichotomous ? measureDichotomousTrialCells : measureContinuousTrialCells}
                { measureType === "baselineMeasures" ?
                    <BaselineMeasureTotalCell measureType={"baselineMeasures"} outcome={measure.outcome} measure={measure} measuresIndex={measuresIndex} updateMeasureOutcome={updateMeasureOutcome} />
                :
                    <OutcomeMeasureTotalCell measureType={"outcomeMeasures"} outcome={measure.outcome} measure={measure} measuresIndex={measuresIndex} updateMeasureOutcome={updateMeasureOutcome} />
                }
            </Table.Row>
        );
    }

  export default MeasureRow;
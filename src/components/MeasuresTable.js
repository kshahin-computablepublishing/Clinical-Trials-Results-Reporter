import React from 'react';
import {
    Button,
    Table,
  } from 'semantic-ui-react';
import {
      TextField
  } from '@material-ui/core';
import './App.css';
import './Table.css';
import MeasureRow from './MeasureRow';

    const MeasuresTable = ( { measureType, formState, allUnitsDisplay, updateDetails, updateTrialArmsState, updateMeasureOutcome, addUnitOfMeasure, addUnitOfTimeMeasure }) => {

        const unitOfMeasures = formState.unitOfMeasures;
        const unitOfTimeMeasures = formState.unitOfTimeMeasures;
        const exposures = formState.exposures;
        let measures;
        let readableMeasureType;
        let subjects;
        let subjectsDefault;
        
        if (measureType === "baselineMeasures") {
            readableMeasureType = "Baseline Measures";
            subjects = "baselineMeasureSubjects";
            subjectsDefault = "baselineMeasureSubjectsDefault";
            measures = formState.baselineMeasures;
        } else if (measureType === "outcomeMeasures") {
            readableMeasureType = "Outcome Measures";
            subjects = "outcomeMeasureSubjects";
            subjectsDefault = "outcomeMeasureSubjectsDefault";
            measures = formState.outcomeMeasures;
        }

        const setAsDefaultDenominator = (exposure, defaultClicked) => {
            if (defaultClicked) {
                updateDetails("exposures", exposure.id, subjectsDefault, true);
            } else {
                updateDetails("exposures", exposure.id, subjectsDefault, false);
            }
            if (exposure[subjectsDefault] || defaultClicked) {
                measures.forEach(function (measure) {
                    if (measure.trialArms.find(x => x.id === exposure.id).denominator === "") {
                        updateTrialArmsState(exposure[subjects], "denominator", exposure.id, measure.id, measureType);
                    }
                });
            }
        }


        const trialArmHeaders = exposures.map((exposure) => {
            let defaultSetButton = "";
            if (exposure[subjectsDefault]) {
                defaultSetButton = "defaultSetButton";
            }
            return <Table.HeaderCell key={exposure.id} title={exposure.description}>
                <h3>{exposure.name}</h3>
                <br />
                <TextField className="denominator exposureDenominator headerInput inputField" type='number' label='Number of Subjects' size="small" variant='outlined' value={exposure[subjects]} onChange={(e) => { setAsDefaultDenominator(exposure, false); updateDetails("exposures", exposure.id, subjects, e.target.value); } } />
                &nbsp;&nbsp;&nbsp;
                <Button className={`formButton headerButton ${defaultSetButton}`} content="Set As Default" compact onClick={ (e) => { setAsDefaultDenominator(exposure, true); } } />
            </Table.HeaderCell>
        });

        const measureRows = measures.map((measure) => {
            return <MeasureRow measureType={measureType} key={measure.id} measuresIndex={measure.id} measure={measure} allUnitsDisplay={allUnitsDisplay} updateTrialArmsState={updateTrialArmsState} updateMeasureOutcome={updateMeasureOutcome} unitOfMeasures={unitOfMeasures} addUnitOfMeasure={addUnitOfMeasure} unitOfTimeMeasures={unitOfTimeMeasures} addUnitOfTimeMeasure={addUnitOfTimeMeasure} />
        });

        return (
            <Table celled className="resultsTable measuresTable">
                <Table.Header><Table.Row>
                    {/* <Table.HeaderCell className="nothingCell"/> */}
                    <Table.HeaderCell><h2>{readableMeasureType}</h2></Table.HeaderCell>
                    {trialArmHeaders}
                    <Table.HeaderCell>
                        {measureType === "baselineMeasures" ?
                            <span>Total</span> :
                            <span>{exposures[1].name} vs. {exposures[0].name}</span>
                        }
                    </Table.HeaderCell>
                </Table.Row></Table.Header>
                <Table.Body>
                    { measureRows }
                </Table.Body>
            </Table>
        );
    };


  export default MeasuresTable;
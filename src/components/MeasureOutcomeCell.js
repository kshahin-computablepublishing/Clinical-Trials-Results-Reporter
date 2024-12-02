import React from 'react';
import {
    Button,
    Dropdown,
    Table,
  } from 'semantic-ui-react';
import {
      TextField
  } from '@material-ui/core';
import './App.css';
import './Table.css';

  const MeasureOutcomeCell = ( {measureType, outcome, measuresIndex, allUnitsDisplay, updateMeasureOutcome, unitOfMeasures, addUnitOfMeasure, unitOfTimeMeasures, addUnitOfTimeMeasure} ) => {
        const dichotomous = outcome.dichotomous;
        const mean = outcome.mean;
        const attribute = outcome.attribute;
        const selectedDichotomous = dichotomous ? "selectedRadioButton" : "";
        const selectedContinuous = dichotomous ? "" : "selectedRadioButton";
        const selectedMean = mean ? "selectedRadioButton" : "";
        const selectedMedian = mean ? "" : "selectedRadioButton";
        const selectedSD = attribute === "sd" ? "selectedRadioButton" : "";
        const selectedRange = attribute === "range" ? "selectedRadioButton" : "";
        const selectedIQR = attribute === "iqr" ? "selectedRadioButton" : "";
        const selectedCI = attribute === "ci" ? "selectedRadioButton" : "";

        let outcomeNameLabel;
        let outcomeDescriptionLabel;

        if (measureType === "baselineMeasures" ) {
          outcomeNameLabel = "Baseline Measure Name";
          outcomeDescriptionLabel = "Baseline Measure Description";
        } else {
          outcomeNameLabel = "Outcome Name";
          outcomeDescriptionLabel = "Outcome Description";
        }
        
        const updateOutcome = (value, fieldName) => {
          updateMeasureOutcome(value, fieldName, measuresIndex, measureType);
        };

        const addUnit = (e, {value}) => {
          addUnitOfMeasure(value);
        };

        const changeUnit = (e, {value}) => {
          updateOutcome(value, "unitOfMeasure");
        };

        const addTimeUnit = (e, {value}) => {
          addUnitOfTimeMeasure(value);
        };

        const changeTimeOfUnit = (e, {value}) => {
          updateOutcome(value, "timeOfUnit");
        };

        return (
          <Table.Cell className="rowHeader measureOutcomeCell">
            <TextField className="outcomeName inputField" type='text' label={outcomeNameLabel} size="small" variant='outlined' value={outcome.name || ''} onChange={(e) => { updateOutcome(e.target.value, "name") } } />
            {measureType === "baselineMeasures" ? <></> : 
                <span>
                  <br /><br />
                  <span title="Time of Measurement From Start of Study">Time from Start of Study&nbsp;&nbsp;</span>
                  <TextField className="timeOfMeasurement inputField" type="number" label='' size="small" variant='outlined' value={outcome.timeOfMeasurement || ''} onChange={(e) => { updateOutcome(e.target.value, "timeOfMeasurement")  } } />
                  &nbsp;&nbsp;
                  <Dropdown
                    className='unitOfTimeMeasurementsDropdown'
                    inline
                    options={unitOfTimeMeasures}
                    placeholder='Units'
                    text={allUnitsDisplay[outcome.timeOfUnit] || 'Units'}
                    search
                    clearable
                    selection
                    allowAdditions
                    selectOnNavigation={false}
                    selectOnBlur={false}
                    additionLabel='Add Unit: '
                    value={outcome.timeOfUnit}
                    onAddItem={addTimeUnit}
                    onChange={changeTimeOfUnit}
                  />
                </span>
            }
            <br /><br />
            { /* <Button.Group color='blue' widths='3' buttons={['Dichotomous', 'Continuous']} /> */}
            <Button.Group widths='3' compact>
              <Button className={`radioToggleButton dichContRadio ${selectedDichotomous}`} onClick={(e) => { updateOutcome(true, "dichotomous") } }>Dichotomous</Button>
              <Button className={`radioToggleButton dichContRadio ${selectedContinuous}`} onClick={(e) => { updateOutcome(false, "dichotomous") } }>Continuous</Button>
            </Button.Group>
              { !dichotomous ?
              <div className={`continuousFields`}>
                <br />
                <Button.Group compact>
                  <Button className={`radioToggleButton meanRadio averageRadio ${selectedMean}`} onClick={(e) => { updateOutcome(true, "mean") } }>Mean</Button>
                  <Button className={`radioToggleButton medianRadio averageRadio ${selectedMedian}`} onClick={(e) => { updateOutcome(false, "mean") } }>Median</Button>
                </Button.Group>
                <br /><br />
                <Button.Group compact>
                  <Button className={`radioToggleButton attributeRadio ${selectedSD}`} onClick={(e) => { updateOutcome("sd", "attribute") } }>SD</Button>
                  <Button className={`radioToggleButton attributeRadio ${selectedRange}`} onClick={(e) => { updateOutcome("range", "attribute") } }>Range</Button>
                  <Button className={`radioToggleButton attributeRadio ${selectedIQR}`} onClick={(e) => { updateOutcome("iqr", "attribute") } }>IQR</Button>
                  <Button className={`radioToggleButton attributeRadio ${selectedCI}`} onClick={(e) => { updateOutcome("ci", "attribute") } }>95% CI</Button>
                </Button.Group>
                <br /><br />
                <span>
                  Unit of Measure&nbsp;&nbsp;&nbsp;
                  <Dropdown
                    inline
                    options={unitOfMeasures}
                    placeholder='Choose Unit of Measure'
                    text={allUnitsDisplay[outcome.unitOfMeasure] || 'Choose Unit of Measure'}
                    search
                    selection
                    allowAdditions
                    selectOnNavigation={false}
                    selectOnBlur={false}
                    clearable
                    additionLabel='Add Unit: '
                    value={outcome.unitOfMeasure}
                    onAddItem={addUnit}
                    onChange={changeUnit}
                  />
                </span>
              </div>
              : <br />
              }
              <br />
              <TextField className="outcomeDescription inputField" type='text' label={outcomeDescriptionLabel} size="small" variant='outlined' value={outcome.description || ''} onChange={(e) => { updateOutcome(e.target.value, "description") } } />
          </Table.Cell>
        );

  }

  export default MeasureOutcomeCell;
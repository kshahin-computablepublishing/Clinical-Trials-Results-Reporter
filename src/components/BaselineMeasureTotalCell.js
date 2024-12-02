import React from 'react';
import {
    Table,
  } from 'semantic-ui-react';
import {
    TextField
  } from '@material-ui/core';
import './App.css';
import './Table.css';

  const BaselineMeasureTotalCell = ( {measureType, outcome, measure, measuresIndex, updateMeasureOutcome} ) => {

      const updateOutcome = (value, fieldName) => {
        updateMeasureOutcome(value, fieldName, measuresIndex, measureType);
      };

      const totalValues = {
        numerator: { total: 0, missingValue: false, enoughValues: false },
        denominator: { total: 0, missingValue: false, enoughValues: false }
      };

      const averageValues = {
        mean: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
        median: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
        sd: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
        rangeLow: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
        rangeHigh: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
        iqrLow: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
        iqrHigh: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
        ciLow: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
        ciHigh: { average: 0, averageNumerator: 0, missingValue: false, enoughValues: false },
      };

      const lowHighValues = {
        rangeLow: { lowest: null, highest: null, missingValue: false, enoughValues: false },
        rangeHigh: { lowest: null, highest: null, missingValue: false, enoughValues: false },
        iqrLow: { lowest: null, highest: null, missingValue: false, enoughValues: false },
        iqrHigh: { lowest: null, highest: null, missingValue: false, enoughValues: false },
        ciLow: { lowest: null, highest: null, missingValue: false, enoughValues: false },
        ciHigh: { lowest: null, highest: null, missingValue: false, enoughValues: false },
      };

      //For loop would be appropriate to add up all the values, it will check if the field is there and if it is then add it to the total, if blank then that's zero and if blank set missingValue to true
      const trialArms = measure.trialArms;
      for (let i = 0; i < trialArms.length; i++) {
        for (let key in totalValues) {
          let value = trialArms[i][key];
          if (value === "") {
            value = 0;
            totalValues[key].missingValue = true;
          } else {
            totalValues[key].enoughValues = true;
          }
          totalValues[key].total += parseFloat(value);
        }
      }

      let calcualtedSDTotalAverage = "";
      let sdNumerator = 0;
      let sdDenominator = 0;
      

      if (totalValues.denominator.enoughValues && totalValues.denominator.total !== 0) {
        for (let key in averageValues) {
          for (let i = 0; i < trialArms.length; i++) {
            let value = trialArms[i][key];
            let denominator = trialArms[i].denominator.trim();
            if (denominator === "" || denominator === "0") {
              averageValues[key].missingValue = true;
              averageValues[key].enoughValues = false;
            }
            if(value === "") {
              value = 0;
              averageValues[key].missingValue = true;
              averageValues[key].enoughValues = false;
            }
            averageValues[key].averageNumerator += parseFloat(trialArms[i][key])*parseInt(denominator);
            if (key === "sd") {
              sdNumerator += (parseInt(denominator) - 1)*Math.pow(parseFloat(trialArms[i][key]), 2);
              sdDenominator += parseInt(denominator);
            }
          }
          averageValues[key].average = averageValues[key].averageNumerator / totalValues.denominator.total;
        }
        if(outcome.attribute === "sd") {
          calcualtedSDTotalAverage = Math.sqrt(sdNumerator/(sdDenominator-trialArms.length));
        }
      }

      for (let key in lowHighValues) {
        for (let i = 0; i < trialArms.length; i++) {
          let value = trialArms[i][key];
          if(value === "") {
            lowHighValues[key].missingValue = true;
            lowHighValues[key].enoughValues = false;
          } else {
            value = parseFloat(value);
            if (lowHighValues[key].lowest === null || value < lowHighValues[key].lowest) {
              lowHighValues[key].lowest = value;
            }
            if (lowHighValues[key].highest === null || value > lowHighValues[key].highest) {
              lowHighValues[key].highest = value;
            }
          }
        }
      }

      

      let calculatedStatus = 'calculatedCellMissingInput';
      if ( (outcome.dichotomous && totalValues.numerator.enoughValues) || (totalValues.denominator.enoughValues) ) {
        calculatedStatus = 'calculatedTotalCell';
      }

      return (
        <Table.Cell className={`baselineMeasureTotalCell measureTotalCell totalCell ${calculatedStatus}`}>
          {outcome.dichotomous && totalValues.numerator.enoughValues ? <span><br /><b>Subjects with Finding:</b> {totalValues.numerator.total} </span> : <></>}
          {totalValues.denominator.enoughValues ? <span><br /><b>Subjects Measured:</b> {totalValues.denominator.total} </span> : <></>}
          {outcome.dichotomous && totalValues.numerator.enoughValues && !totalValues.denominator.missingValue ? <span><br /><b>Percentage:</b> {(100*totalValues.numerator.total/totalValues.denominator.total).toFixed(1)+"%"} </span> : <></>}
          {!outcome.dichotomous && outcome.mean && !averageValues.mean.missingValue && totalValues.denominator.enoughValues ? <span><br /><b>Mean:</b> {averageValues.mean.average.toFixed(1)} {outcome.unitOfMeasure}</span> : <></>}
          {/* {!outcome.dichotomous && !outcome.mean && !averageValues.median.missingValue && totalValues.denominator.enoughValues ? <span><br /><b>Median:</b> {averageValues.median.average.toFixed(1)} {outcome.unitOfMeasure} </span> : <></>} */}
          {!outcome.dichotomous && !outcome.mean ? <div className="inputLine totalInputLine"><br /><label className="rangeToLabel">Median:&nbsp;&nbsp;</label>&nbsp;
          <TextField className="totalInputBox inputField medianInput" type='number' label='Median' size="small" variant='outlined' value={outcome.median || ''} onChange={(e) => { updateOutcome(e.target.value, "median") } } /> </div>
            : <></>
          }
          {!outcome.dichotomous && outcome.attribute === "sd" && totalValues.denominator.enoughValues && !averageValues.sd.missingValue ? <span><br /><b>SD:</b> {calcualtedSDTotalAverage.toFixed(1)} </span> : <></>}
          {!outcome.dichotomous && outcome.attribute === "range" && lowHighValues.rangeLow.lowest !== null && lowHighValues.rangeHigh.highest !== null ? <span><br /><b>Range:</b> {lowHighValues.rangeLow.lowest.toFixed(1)} to {lowHighValues.rangeHigh.highest.toFixed(1)} </span> : <></>}
          {!outcome.dichotomous && outcome.attribute === "iqr" ? <div className="inputLine totalInputLine"><br /><label className="rangeToLabel">IQR:&nbsp;&nbsp;</label>&nbsp;
            <TextField className="totalInputBox inputField iqrLowInput" type='number' label='IQR Low' size="small" variant='outlined' value={outcome.iqrLow || ''} onChange={(e) => { updateOutcome(e.target.value, "iqrLow") } } />
            <label className="rangeToLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
            <TextField className="totalInputBox inputField iqrHighInput" type='number' label='IQR High' size="small" variant='outlined' value={outcome.iqrHigh || ''} onChange={ (e) => { updateOutcome(e.target.value, "iqrHigh") } } /> </div>
            : <></>
          }
          {!outcome.dichotomous && outcome.attribute === "ci" ? <div className="inputLine totalInputLine"><br /><label className="rangeToLabel">95%&nbsp;CI:&nbsp;&nbsp;</label>&nbsp;
            <TextField className="totalInputBox inputField ciLowInput" type='number' label='95% CI Low' size="small" variant='outlined' value={outcome.ciLow || ''} onChange={(e) => { updateOutcome(e.target.value, "ciLow") } } />
            <label className="rangeToLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
            <TextField className="totalInputBox inputField ciHighInput" type='number' label='95% CI High' size="small" variant='outlined' value={outcome.ciHigh || ''} onChange={ (e) => { updateOutcome(e.target.value, "ciHigh") } } /> </div>
            : <></>
          }
          {/*
          {!outcome.dichotomous && outcome.attribute === "ci" && lowHighValues.ciLow.lowest !== null && lowHighValues.ciHigh.highest !== null ? <span><br /><b>CI:</b> {lowHighValues.ciLow.lowest.toFixed(1)} to {lowHighValues.ciHigh.highest.toFixed(1)} </span> : <></>}
            {totalValues.numerator.enoughValues && totalValues.denominator.enoughValues ? <span><br />{totalValues.numerator.total}<b>&nbsp;/&nbsp;</b>{totalValues.denominator.total}<br/>{(100*totalValues.numerator.total/totalValues.denominator.total).toFixed(1)+"%"}</span> : <></>}
          */}
        </Table.Cell>
      );

  }

  export default BaselineMeasureTotalCell;
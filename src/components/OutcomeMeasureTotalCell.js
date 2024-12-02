import React from 'react';
import {
    Table,
  } from 'semantic-ui-react';
import './App.css';
import './Table.css';

  const OutcomeMeasureTotalCell = ( {measureType, outcome, measure, measuresIndex, updateMeasureOutcome} ) => {

    /*
      const updateOutcome = (value, fieldName) => {
        updateMeasureOutcome(value, fieldName, measuresIndex, measureType);
      };
      */

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

      const riskDifference = () => {
        let allValuesPresent = true;
        let enoughValuesPresent = true;
        let numerators = [];
        let denominators = [];
        let proportions = [];
        for (let i = 0; i < trialArms.length; i++) {
          const numerator = parseFloat(trialArms[i].numerator);
          const denominator = parseFloat(trialArms[i].denominator);
          if (denominator < 30 || numerator === 0) {
            allValuesPresent = false;
          }
          if (isNaN(denominator) || isNaN(numerator)) {
            enoughValuesPresent = false;
            break;
          }
          numerators.push(numerator);
          denominators.push(denominator);
          proportions.push(numerator/denominator);
        }
        let riskDifference;
        if (enoughValuesPresent) {
          riskDifference = (((numerators[1]/denominators[1]) - (numerators[0]/denominators[0]))*100);
        } else {
          return false;
        }
        let riskDifferenceCIText = "";
        if (allValuesPresent) {
          let riskDifferenceCI = (1.96*Math.sqrt(((proportions[0]*(1 - proportions[0]))/denominators[0])+((proportions[1]*(1 - proportions[1]))/denominators[1])))*100;
          let riskDifferenceCILow = riskDifference - riskDifferenceCI;
          let riskDifferenceCIHigh = riskDifference + riskDifferenceCI;

          if (riskDifferenceCILow < -100) {
            riskDifferenceCILow = -100;
          }
          if (riskDifferenceCIHigh > 100) {
            riskDifferenceCIHigh = 100;
          }

          riskDifferenceCIText = "(95% CI " + riskDifferenceCILow.toFixed(1) + "% to " + riskDifferenceCIHigh.toFixed(1) + "%)";
        }
        return riskDifference.toFixed(1) + "% " + riskDifferenceCIText;
      };

      const meanDifference = () => {
        if (trialArms[0].mean !== "" && trialArms[1].mean !== "") {
          return (trialArms[1].mean - trialArms[0].mean).toFixed(1);
        } else {
          return false;
        }
      }

      const medianDifference = () => {
        if (trialArms[0].median !== "" && trialArms[1].median !== "") {
          return (trialArms[1].median - trialArms[0].median).toFixed(1);
        } else {
          return false;
        }
      }

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

      if (totalValues.denominator.enoughValues && totalValues.denominator.total !== 0) {
        for (let key in averageValues) {
          for (let i = 0; i < trialArms.length; i++) {
            let value = trialArms[i][key];
            let denominator = trialArms[i].denominator;
            if (denominator === "" || denominator === 0) {
              averageValues[key].missingValue = true;
              averageValues[key].enoughValues = false;
            }
            if(value === "") {
              value = 0;
              averageValues[key].missingValue = true;
              averageValues[key].enoughValues = false;
            }
            averageValues[key].averageNumerator += parseFloat(trialArms[i][key])*denominator;
          }
          averageValues[key].average = averageValues[key].averageNumerator / totalValues.denominator.total;
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
      let riskDifferenceText;
      let meanDifferenceText = false;
      let medianDifferenceText = false;
      if (outcome.dichotomous) {
        riskDifferenceText = riskDifference();
      } else if (outcome.mean) {
        const meanDifferenceOutput = meanDifference();
        if (meanDifferenceOutput) {
          meanDifferenceText = meanDifferenceOutput + " " + outcome.unitOfMeasure;
        }
      } else {
        const medianDifferenceOutput = medianDifference();
        if (medianDifferenceOutput) {
          medianDifferenceText = medianDifferenceOutput + " " + outcome.unitOfMeasure;
        }
      }
      
      let calculatedStatus = 'calculatedCellMissingInput';
      if ( (outcome.dichotomous && riskDifferenceText) || (!outcome.dichotomous && ( (outcome.mean && meanDifferenceText) || (!outcome.mean && medianDifferenceText) ) ) ) {
        calculatedStatus = 'calculatedTotalCell';
      }

      return (
        <Table.Cell className={`outcomeMeasureTotalCell measureTotalCell totalCell ${calculatedStatus}`}>
          { outcome.dichotomous ?
              riskDifferenceText ?
                <span><b>Risk Difference: </b> {riskDifferenceText}</span>
                :
                  <></>
          :
            outcome.mean ?
              meanDifferenceText ?
                <span><b>Mean Difference: </b> {meanDifferenceText}</span>
              :
                <></>
            :
              medianDifferenceText ?
                <span><b>Median Difference: </b> {medianDifferenceText}</span>
              :
                <></>
          }
          {/*
          {outcome.dichotomous && totalValues.numerator.enoughValues ? <span><br /><b>Subjects with Finding:</b> {totalValues.numerator.total} </span> : <></>}
          {totalValues.denominator.enoughValues ? <span><br /><b>Subjects Measured:</b> {totalValues.denominator.total} </span> : <></>}
          {outcome.dichotomous && totalValues.numerator.enoughValues && totalValues.denominator.enoughValues ? <span><br /><b>Percentage:</b> {(100*totalValues.numerator.total/totalValues.denominator.total).toFixed(1)+"%"} </span> : <></>}
          {!outcome.dichotomous && outcome.mean && !averageValues.mean.missingValue && totalValues.denominator.enoughValues ? <span><br /><b>Mean:</b> {averageValues.mean.average.toFixed(1)} {outcome.unitOfMeasure}</span> : <></>}
          {!outcome.dichotomous && !outcome.mean && !averageValues.median.missingValue && totalValues.denominator.enoughValues ? <span><br /><b>Median:</b> {averageValues.median.average.toFixed(1)} {outcome.unitOfMeasure} </span> : <></>}
          {!outcome.dichotomous && outcome.attribute === "sd" && totalValues.denominator.enoughValues && !averageValues.sd.missingValue ? <span><br /><b>SD:</b> {averageValues.sd.average.toFixed(1)} </span> : <></>}
          {!outcome.dichotomous && outcome.attribute === "range" && lowHighValues.rangeLow.lowest !== null && lowHighValues.rangeHigh.highest !== null ? <span><br /><b>Range:</b> {lowHighValues.rangeLow.lowest.toFixed(1)} to {lowHighValues.rangeHigh.highest.toFixed(1)} </span> : <></>}
          {!outcome.dichotomous && outcome.attribute === "iqr" ? <div className="inputLine"><br /><label className="rangeToLabel">IQR:&nbsp;&nbsp;</label>&nbsp;
            <TextField className="totalInputBox inputField iqrLowInput" type='number' label='IQR Low' size="small" variant='outlined' value={outcome.iqrLow || ''} onChange={(e) => { updateOutcome(e.target.value, "iqrLow") } } />
            <label className="rangeToLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
            <TextField className="totalInputBox inputField iqrHighInput" type='number' label='IQR High' size="small" variant='outlined' value={outcome.iqrHigh || ''} onChange={ (e) => { updateOutcome(e.target.value, "iqrHigh") } } /> </div> : <></>
          }
          {!outcome.dichotomous && outcome.attribute === "ci" ? <div className="inputLine"><br /><label className="rangeToLabel">95%&nbsp;CI:&nbsp;&nbsp;</label>&nbsp;
            <TextField className="totalInputBox inputField ciLowInput" type='number' label='95% CI Low' size="small" variant='outlined' value={outcome.ciLow || ''} onChange={(e) => { updateOutcome(e.target.value, "ciLow") } } />
            <label className="rangeToLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
            <TextField className="totalInputBox inputField ciHighInput" type='number' label='95% CI High' size="small" variant='outlined' value={outcome.ciHigh || ''} onChange={ (e) => { updateOutcome(e.target.value, "ciHigh") } } /> </div> : <></>
          }
          */}
        </Table.Cell>
      );

  }

  export default OutcomeMeasureTotalCell;
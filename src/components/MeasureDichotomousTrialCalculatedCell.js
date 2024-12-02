import React from 'react';
import './App.css';
import './Table.css';


const MeasureDichotomousTrialCalculatedCell = ( { measureType, trialArm } ) => {
  const numerator = trialArm.numerator;
  const denominator = trialArm.denominator;
  const proportion = numerator/denominator;
  const requiredInput = denominator && numerator && !isNaN(proportion);
  
  const calculateCI = () => {
    let confidenceInterval = 1.96 * Math.sqrt((proportion * (1  - proportion) ) / denominator)
    let confidenceIntervalLow = ((proportion - confidenceInterval)*100);
    let confidenceIntervalHigh = ((proportion + confidenceInterval)*100);

    if (confidenceIntervalLow < 0) {
      confidenceIntervalLow = 0;
    }

    if (confidenceIntervalHigh > 100) {
      confidenceIntervalHigh = 100;
    }

    return [confidenceIntervalLow, confidenceIntervalHigh]
  };

  let missingInputClassName = "";
  if (!requiredInput) { missingInputClassName = "calculatedCellMissingInput"}
  
  return (
    <td className={`measureDichotomousTrialCalculatedCell calculatedCell ${missingInputClassName}`}>
      <div className="outputLine">
        {  measureType === "baselineMeasures" ?
            <label className={"trialDisplayCalculatedPercentage"}>{requiredInput ? `${(proportion*100).toFixed(1)}%` : <span>&nbsp;</span>}</label>
          :
            <div>
            <label className={"trialDisplayCalculatedPercentage"}>{
            requiredInput
            ? `${(proportion*100).toFixed(1)}%`
            : <span>&nbsp;</span>}
            { numerator !== "" && parseFloat(denominator) < 30 ?
                <span>{` (95% CI not calculated if n < 30)`}</span>
              :
                parseFloat(numerator) === 0 || parseFloat(numerator) === parseFloat(denominator)
                ? <></>
                : <span>{
                  requiredInput
                  ? ` (95% CI ${(calculateCI()[0]).toFixed(1)}% to ${(calculateCI()[1]).toFixed(1)}%)`
                  : <></>}</span>
            }
            </label>
            </div>
        }
      </div>
    </td>
  );
};

  export default MeasureDichotomousTrialCalculatedCell;
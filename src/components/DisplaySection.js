import React from 'react';
import { Link } from "react-router-dom";
import {
    Table,
  } from 'semantic-ui-react';
import './App.css';
import './Table.css';
import BaselineMeasureTotalCell from './BaselineMeasureTotalCell';
import OutcomeMeasureTotalCell from './OutcomeMeasureTotalCell';

  const Fragment = React.Fragment;

  const DisplaySection = ( { formState } ) => {

    /*
      const unitOfMeasureDisplay = (baselineMeasure) => { 
        return (baselineMeasure.outcome.unitOfMeasure !== "" ?
            <span><br /><b>Unit of measure:</b> {baselineMeasure.outcome.unitOfMeasure}</span>
          :
            <span></span>
          )
      };
      */
            
      const displayAttribute = {
        sd: ["SD", "Standard Deviation"],
        range: ["Range", "Range"],
        iqr: ["IQR", "Interquartile Range"],
        ci: ["95% CI", "95% Confidence Interval"],
      };

        const baselineMeasureRows = formState.baselineMeasures.map( (baselineMeasure) => {
        const attributeType = baselineMeasure.outcome.attribute;
        let attributeTypeText = "";
        if (attributeType && attributeType !== "") {
          attributeTypeText = "(" + displayAttribute[attributeType][0] + ")";
        }

        return (
        <Fragment key={baselineMeasure.id+"BaselineFragment"}>
        <Table.Row key={baselineMeasure.id+"a"} className="displayPageMeasureTopRow">
          <Table.Cell key={baselineMeasure.id+"Cell1"} className="displayPageCell">
            <b>{baselineMeasure.outcome.name}</b>
            {baselineMeasure.outcome.dichotomous ?
                <b><br/>Number with event / Number analyzed<br />(percent)</b>
              :
              baselineMeasure.outcome.mean ?
              <span><b><br />Mean {attributeTypeText} [number analyzed]
              </b></span>
              :
              <span><b><br />Median {attributeTypeText} [number analyzed]
              </b></span>
            }
            {
              !baselineMeasure.outcome.dichotomous && baselineMeasure.outcome.unitOfMeasure !== "" ?
              <span><br /><b>Unit of measure:</b> {baselineMeasure.outcome.unitOfMeasure}</span>
              :
              <></>
            }
          </Table.Cell>
          { baselineMeasure.trialArms.map( (trialArm) => {

            let averageText = "";

            if (baselineMeasure.outcome.mean) {
              averageText = trialArm.mean;
            } else {
              averageText = trialArm.median;
            }

            let attributeText = "";

            if (baselineMeasure.outcome.attribute === "sd") {
              attributeText = trialArm.sd;
            } else if (baselineMeasure.outcome.attribute === "range") {
              attributeText = trialArm.rangeLow + " to " + trialArm.rangeHigh;
            }  else if (baselineMeasure.outcome.attribute === "iqr") {
              attributeText = trialArm.iqrLow + " to " + trialArm.iqrHigh;
            } else if (baselineMeasure.outcome.attribute === "ci") {
              attributeText = trialArm.ciLow + " to " + trialArm.ciHigh;
            }

            
            if (baselineMeasure.outcome.dichotomous) {
              return (
                <Table.Cell className="displayPageCell" style={{textAlign: "center"}} key={"BaselineTrialArmCell"+trialArm.id}>{trialArm.numerator}<b> / </b>{trialArm.denominator}<br/>({(100*trialArm.numerator/trialArm.denominator).toFixed(1)}%)</Table.Cell>
              )
            } else {
              return (
              <Table.Cell className="displayPageCell" style={{textAlign: "center"}} key={"BaselineTrialArmCell"+trialArm.id}>{averageText} ({attributeText}) [n = {trialArm.denominator}]</Table.Cell>
              )
            }
            })
          }
          <BaselineMeasureTotalCell key={baselineMeasure.id+"TotalCell"} measuresIndex={baselineMeasure.id} measureType={"baselineMeasures"} outcome={baselineMeasure.outcome} measure={baselineMeasure} />
        </Table.Row>
        <Table.Row key={baselineMeasure.id+"b"} className="displayPageMeasureBottomRow">
          <Table.Cell key={baselineMeasure.id+"DescriptionCell"} className="displayPageCell" colSpan="4">
            {
              baselineMeasure.outcome.description !== ""
            ?
                <><b>Description: </b>{baselineMeasure.outcome.description}</>
            :
            <></>
            }
          </Table.Cell>
        </Table.Row>
        </Fragment>
    )});

    const outomeMeasureRows = formState.outcomeMeasures.map( (outcomeMeasure) => {

        const attributeType = outcomeMeasure.outcome.attribute;
        let attributeTypeText = "";
        if (attributeType && attributeType !== "") {
          attributeTypeText = "(" + displayAttribute[attributeType][0] + ")";
        }

      return (
      <Fragment key={outcomeMeasure.id+"OutcomeFragment"}>
      <Table.Row key={outcomeMeasure.id+"a"} className="displayPageMeasureTopRow">
        <Table.Cell key={outcomeMeasure.id+"Cell1"} className="displayPageCell">
          <b>{outcomeMeasure.outcome.name}</b>
          {outcomeMeasure.outcome.dichotomous ?
              <b><br/>Number with event / Number analyzed<br />percent (95% Confidence Interval)</b>
            :
            outcomeMeasure.outcome.mean ?
            <span><b><br />Mean {attributeTypeText} [number analyzed]</b></span>
            :
            <span><b><br />Median {attributeTypeText} [number analyzed]</b></span>
          }
          {
            !outcomeMeasure.outcome.dichotomous && outcomeMeasure.outcome.unitOfMeasure !== "" ?
            <span><br /><b>Unit of measure:</b> {outcomeMeasure.outcome.unitOfMeasure}</span>
            :
            <></>
          }
          {
            outcomeMeasure.outcome.timeOfMeasurement !== "" ?
            <span><br /><b>Time of Measurement:</b> {outcomeMeasure.outcome.timeOfMeasurement + " " + outcomeMeasure.outcome.timeOfUnit} </span>
            :
            <></>
          }
        </Table.Cell>
        { outcomeMeasure.trialArms.map( (trialArm) => {


          const numerator = trialArm.numerator;
          const denominator = trialArm.denominator;
          const proportion = numerator/denominator;    

          let confidenceInterval = 1.96 * Math.sqrt((proportion * (1  - proportion) ) / denominator)
          let confidenceIntervalLow = ((proportion - confidenceInterval)*100);
          let confidenceIntervalHigh = ((proportion + confidenceInterval)*100);

          if (confidenceIntervalLow < 0) {
            confidenceIntervalLow = 0;
          }

          if (confidenceIntervalHigh > 100) {
            confidenceIntervalHigh = 100;
          }
          let confidenceIntervalText = "";

          if (denominator < 30) {
            if (trialArm.denominator.trim() !== "") {
              confidenceIntervalText = "95% CI not calculated if n < 30";
            }
          } else {
            if (parseFloat(numerator) !== 0 && numerator.trim() !== "") {
              confidenceIntervalText = "(" + confidenceIntervalLow.toFixed(1) + "% to " + confidenceIntervalHigh.toFixed(1) + "%)";
            }
          }

          let averageText = "";

          if (outcomeMeasure.outcome.mean) {
            averageText = parseFloat(trialArm.mean);
          } else {
            averageText = parseFloat(trialArm.median);
          }

          let attributeText = "";

          if (outcomeMeasure.outcome.attribute === "sd") {
            attributeText = trialArm.sd;
          } else if (outcomeMeasure.outcome.attribute === "range") {
            attributeText = trialArm.rangeLow + " to " + trialArm.rangeHigh;
          }  else if (outcomeMeasure.outcome.attribute === "iqr") {
            attributeText = trialArm.iqrLow + " to " + trialArm.iqrHigh;
          } else if (outcomeMeasure.outcome.attribute === "ci") {
            attributeText = trialArm.ciLow + " to " + trialArm.ciHigh;
          }

          let proportionAsPercentage = "";
          if(trialArm.numerator.trim() !== "" && trialArm.denominator.trim() !== "") {
            proportionAsPercentage = (100*trialArm.numerator/trialArm.denominator).toFixed(1) + "%";
          }
          
          if (outcomeMeasure.outcome.dichotomous) {
            return (
              <Table.Cell key={"OutcomeTrialArmCell"+trialArm.id} className="displayPageCell" style={{textAlign: "center"}}>{trialArm.numerator}<b> / </b>{trialArm.denominator}<br/>{proportionAsPercentage} {confidenceIntervalText}</Table.Cell>
            )
          } else {
            return (
            <Table.Cell key={"OutcomeTrialArmCell"+trialArm.id} className="displayPageCell" style={{textAlign: "center"}}>{averageText} ({attributeText}) [n = {trialArm.denominator}]</Table.Cell>
            )
          }
          })
        }
        <OutcomeMeasureTotalCell key={outcomeMeasure.id+"TotalCell"} measuresIndex={outcomeMeasure.id} className="displayPageCell" measureType={"outcomeMeasures"} outcome={outcomeMeasure.outcome} measure={outcomeMeasure} />
      </Table.Row>
      <Table.Row key={outcomeMeasure.id+"b"} className="displayPageMeasureBottomRow">
          <Table.Cell key={outcomeMeasure.id+"DescriptionCell"} className="displayPageCell" colSpan="4">
            {
              outcomeMeasure.outcome.description !== ""
            ?
                <><b>Description: </b>{outcomeMeasure.outcome.description}</>
            :
            <></>
            }
          </Table.Cell>
        </Table.Row>
      </Fragment>
    )});
    let agesEligibleText = "";
    if (formState.populations[0].agesEligibleLow && formState.populations[0].agesEligibleLow !== "") {
      agesEligibleText = `(${formState.populations[0].agesEligibleLow} to ${formState.populations[0].agesEligibleHigh} ${formState.populations[0].agesEligibleUnit})`;
    }

    return (
        <div>
          <h2>Summary</h2>
          <h3>Study <Link to="/ctrr/2">[edit]</Link></h3>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell><b>{formState.studies[0].title}</b></Table.Cell><Table.Cell>{formState.studies[0].identifier}</Table.Cell><Table.Cell>{formState.studies[0].type}</Table.Cell><Table.Cell>{formState.studies[0].numberOfParticipants && formState.studies[0].numberOfParticipants.trim() !== "" ? formState.studies[0].numberOfParticipants + " participants" : <></>}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <h3>Population <Link to="/ctrr/2">[edit]</Link></h3>
          <Table>
            {/*
            <Table.Header>
              <Table.Row><Table.HeaderCell><h3>Population</h3></Table.HeaderCell><Table.HeaderCell></Table.HeaderCell></Table.Row>
            </Table.Header>
            */}
          <Table.Body>
            <Table.Row>
              <Table.Cell><b>{formState.populations[0].name}: </b>{formState.populations[0].description}</Table.Cell><Table.Cell><b>Ages eligible: </b>{formState.populations[0].agesEligible} {agesEligibleText}, <b>Sexes eligible: </b>{formState.populations[0].sexesEligible}, <b>Accepts healthy individuals: </b>{formState.populations[0].acceptsHealthy}</Table.Cell>
            </Table.Row>
          </Table.Body>
          </Table>
          <h3>Exposures/Trial Arms <Link to="/ctrr/2">[edit]</Link></h3>
          <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell className="rowHeader"><b>Intervention</b></Table.Cell>
              <Table.Cell><b>{formState.exposures[1].name}</b> {formState.exposures[1].description ? `: ${formState.exposures[1].description}` : ""}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="rowHeader"><b>Comparator</b></Table.Cell>
              <Table.Cell><b>{formState.exposures[0].name}</b> {formState.exposures[0].description ? `: ${formState.exposures[0].description}` : ""}</Table.Cell>
            </Table.Row>
          </Table.Body>
          </Table>
          <h3>Baseline Measures <Link to="/ctrr/3">[edit]</Link></h3>
          <Table>
          <Table.Header>
            <Table.Row><Table.HeaderCell><h4>Baseline Measures</h4></Table.HeaderCell><Table.HeaderCell>{formState.exposures[0].name}</Table.HeaderCell><Table.HeaderCell>{formState.exposures[1].name}</Table.HeaderCell><Table.HeaderCell>Total</Table.HeaderCell></Table.Row>
          </Table.Header>
          <Table.Body>
            {baselineMeasureRows}
          </Table.Body>
          </Table>
          <h3>Outcome Measures <Link to="/ctrr/4">[edit]</Link></h3>
          <Table>
          <Table.Header>
            <Table.Row><Table.HeaderCell><h4>Outcome Measures</h4></Table.HeaderCell><Table.HeaderCell>{formState.exposures[0].name}</Table.HeaderCell><Table.HeaderCell>{formState.exposures[1].name}</Table.HeaderCell><Table.HeaderCell>{formState.exposures[1].name} vs. {formState.exposures[0].name}</Table.HeaderCell></Table.Row>
          </Table.Header>
          <Table.Body>
            {outomeMeasureRows}
          </Table.Body>
          </Table>
          <br />
        </div>
    );
  };

  export default DisplaySection;
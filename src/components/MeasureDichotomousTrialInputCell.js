import React from 'react';
import {
    Form,
  } from 'semantic-ui-react';
import {
    TextField
} from '@material-ui/core';
import './App.css';
import './Table.css';

    const MeasureDichotomousTrialInputCell = ( {measureType, measuresIndex, trialArmsIndex, updateTrialArmsState, trialArm} ) => {

        let subjectsNumberLabel;
        if (measureType === "baselineMeasures"){
            subjectsNumberLabel = "Subjects with Characteristic";
        } else {
            subjectsNumberLabel = "Subjects with Finding";
        }

        return (
            <td className="measureDichotomousTrialInputCell inputCell">
                <Form.Group widths='equal'>
                <div className="inputLine">
                    <TextField className="numerator dichotomousNumerator inputField" type='number' label={subjectsNumberLabel} size="small" variant='outlined' value={trialArm.numerator || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "numerator", trialArmsIndex, measuresIndex, measureType); } } />
                    <label className="slashSeparator">&nbsp;/&nbsp;</label>
                    <TextField className="denominator dichotomousDenominator inputField" type='number' label='Subjects Measured' size="small" variant='outlined' value={trialArm.denominator || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "denominator", trialArmsIndex, measuresIndex, measureType); } } />
                </div>
                </Form.Group>
                {/*
                <br /><br /><br />
                <div className="inputLine"><Form.Input type='number' placeholder='Numerator ' /> <label style={{fontSize: '40px', alignSelf: 'center'}}>&nbsp;/&nbsp;</label> <Form.Input type='number' placeholder='Denominator ' /> </div>
                <br /><br /><br />
                <div className="inputLine"><TextField type='number' label='Numerator'  variant='outlined' /> <label style={{fontSize: '58px', alignSelf: 'center'}}>&nbsp;/&nbsp;</label> <TextField type='number' label='Denominator'  variant='outlined' /></div>
                */}
            </td>
        );
    };



  export default MeasureDichotomousTrialInputCell;
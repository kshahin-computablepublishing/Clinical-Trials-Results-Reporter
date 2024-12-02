import React from 'react';
import {
    Form,
  } from 'semantic-ui-react';
import {
    TextField
} from '@material-ui/core';
import './App.css';
import './Table.css';

    const MeasureContinuousTrialInputCell = ( {measureType, measuresIndex, trialArmsIndex, updateTrialArmsState, trialArm, outcome} ) => {

        return (
            <td className="measureContinuousTrialInputCell inputCell">
                <Form.Group widths='equal'>
                    <div className="inputLine">
                        <TextField className="denominator continuousDenominator inputField" type='number' label="Subjects Measured" size="small" variant='outlined' value={trialArm.denominator || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "denominator", trialArmsIndex, measuresIndex, measureType); } } />
                    </div>
                    <div className="inputLine">
                        {outcome.mean ?
                            <TextField className="mean inputField" type='number' label='Mean' size="small" variant='outlined' value={trialArm.mean || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "mean", trialArmsIndex, measuresIndex, measureType); } } />
                            :
                            <TextField className="median inputField" type='number' label='Median' size="small" variant='outlined' value={trialArm.median || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "median", trialArmsIndex, measuresIndex, measureType); } } />
                        }
                    </div>
                    {outcome.attribute === "sd" ?
                        <div className="inputLine"><TextField className="sd inputField" type='number' label='SD' size="small" variant='outlined' value={trialArm.sd || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "sd", trialArmsIndex, measuresIndex, measureType); } } /></div>
                        : outcome.attribute === "range" ?
                        <div className="inputLine">
                            <TextField className="rangeLow range inputField" type='number' label='Range Low' size="small" variant='outlined' value={trialArm.rangeLow || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "rangeLow", trialArmsIndex, measuresIndex, measureType); } } />
                            <label className="rangeToLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
                            <TextField className="rangeHigh range inputField" type='number' label='Range High' size="small" variant='outlined' value={trialArm.rangeHigh || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "rangeHigh", trialArmsIndex, measuresIndex, measureType); } } />
                        </div>
                        : outcome.attribute === "iqr" ?
                            <div className="inputLine">
                                <TextField className="iqrLow range inputField" type='number' label='IQR Low' size="small" variant='outlined' value={trialArm.iqrLow || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "iqrLow", trialArmsIndex, measuresIndex, measureType); } } />
                                <label className="rangeToLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
                                <TextField className="iqrHigh range inputField" type='number' label='IQR High' size="small" variant='outlined' value={trialArm.iqrHigh || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "iqrHigh", trialArmsIndex, measuresIndex, measureType); } } />
                            </div>
                        : outcome.attribute === "ci" ?
                            <div className="inputLine">
                                <TextField className="ciLow range inputField" type='number' label='95% CI Low' size="small" variant='outlined' value={trialArm.ciLow || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "ciLow", trialArmsIndex, measuresIndex, measureType); } } />
                                <label className="rangeToLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
                                <TextField className="ciHigh range inputField" type='number' label='95% CI High' size="small" variant='outlined' value={trialArm.ciHigh || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "ciHigh", trialArmsIndex, measuresIndex, measureType); } } />
                            </div>
                        :
                        <> </>
                    }
                    {/*
                    <div className="inputLine">
                        <TextField className="numerator dichotomousNumerator inputField" type='number' label='Number with Finding' size="small" variant='outlined' value={trialArm.numerator || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "numerator", trialArmsIndex, measuresIndex, measureType); } } />
                        <label className="slashSeparator">&nbsp;/&nbsp;</label>
                        <TextField className="denominator dichotomousDenominator inputField" type='number' label='Number Measured' size="small" variant='outlined' value={trialArm.denominator || ''} onChange={(e) => { updateTrialArmsState(e.target.value, "denominator", trialArmsIndex, measuresIndex, measureType); } } />
                    </div>
                    */}
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



  export default MeasureContinuousTrialInputCell;
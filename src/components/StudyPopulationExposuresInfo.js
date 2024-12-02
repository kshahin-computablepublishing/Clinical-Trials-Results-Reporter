import React from 'react';
import {
    Button,
    Segment,
    Dropdown,
  } from 'semantic-ui-react';
import {
      TextField,
  } from '@material-ui/core';
import './App.css';
import './Table.css';

const StudyPopulationExposuresInfo = ( { formState, updateDetails, studyTypes } ) => {

  const studies = formState.studies;
  const populations = formState.populations;
  const exposures = formState.exposures;

  const changeStudyType = (e, {value}) => {
    updateDetails("studies", 0, "type", value);
  };
  
  const sexes =  {
    'Male': 'Sexes Eligible for Study: Male',
    'Female': 'Sexes Eligible for Study: Female',
    'All': 'Sexes Eligible for Study: All',
  };

  const sexesOptions =  [
    { key: 'Male', text: 'Male', value: 'Male' },
    { key: 'Female', text: 'Female', value: 'Female' },
    { key: 'All', text: 'All', value: 'All' },
  ];

  const yesOrNo =  {
    'Yes': 'Accepts Healthy Volunteers: Yes',
    'No': 'Accepts Healthy Volunteers: No'
  };

  const yesOrNoOptions =  [
    { key: 'Yes', text: 'Yes', value: 'Yes' },
    { key: 'No', text: 'No', value: 'No' },
  ];

  const updatePopulationSexesEligibleChange = (e, {value}) => {
    updateDetails("populations", 0, "sexesEligible", value);
  };

  const updatePopulationAcceptsHealthyChange = (e, {value}) => {
    updateDetails("populations", 0, "acceptsHealthy", value);
  };

  const changeAgeEligibleUnit = (e, {value}) => {
    updateDetails("populations", 0, "agesEligibleUnit", value);
  };

  return (
    <Segment className={`containerSegment`} raised>
    <h1>Details</h1>
    <Segment className="subSegment inputSegment studySegment">
    <div className="inputLine segmentInputLine middleAlign leftAlign">
    <h2>Study</h2>&nbsp;&nbsp;&nbsp;&nbsp;
    <TextField className="inputField detailsInput studyTitleInput" label="Title" value={studies[0].title} onChange={ (e) => { updateDetails("studies", 0, "title", e.target.value) } } size="small" variant='outlined' type="text" autoComplete="off" />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <TextField className="inputField detailsInput studyIdentifierInput" label="Identifier" value={studies[0].identifier} onChange={ (e) => { updateDetails("studies", 0, "identifier", e.target.value) } } size="small" variant='outlined' type="text" autoComplete="off" />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Dropdown
      className="studyTypeDropDown"
      placeholder='Study Type'
      options={studyTypes}
      value={studies[0].type}
      onChange={changeStudyType}
      selectOnNavigation={false}
      selectOnBlur={false}
      clearable
      fluid
      selection
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <TextField className="studyNumberOfParticipants inputField" type='number' label='Number of Participants' size="small" variant='outlined' value={studies[0].numberOfParticipants} onChange={(e) => { updateDetails("studies", 0, "numberOfParticipants", e.target.value) } } />
    </div>
    </Segment>
    <Segment className="subSegment inputSegment populationSegment">
      <div className="inputLine segmentInputLine picoInputLine middleAlign leftAlign">
      <h2>Population&nbsp;(1)</h2>&nbsp;&nbsp;&nbsp;&nbsp;
      <TextField className="inputField detailsInput populationNameInput" label="Population Short Display Name" value={populations[0].name || ''} onChange={(e) => { updateDetails("populations", 0, "name", e.target.value) } } size="small" variant='outlined' type="text" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <TextField className="inputField detailsInput populationDescriptionInput" label="Population Description" value={populations[0].description || ''} onChange={(e) => { updateDetails("populations", 0, "description", e.target.value) } } size="small" variant='outlined' type="text" />
      </div>
      <br />
      <div className="inputLine segmentInputLine picoInputLine middleAlign leftAlign">
      <TextField className="inputField detailsInput agesEligibleDescriptionInput" label="Ages Eligible for Study Description" value={populations[0].agesEligible || ''} onChange={(e) => { updateDetails("populations", 0, "agesEligible", e.target.value) } } size="small" variant='outlined' type="text" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <TextField className="inputField detailsInput agesEligibleInput agesEligibleLowInput" label="Ages Eligible Low" value={populations[0].agesEligibleLow || ''} onChange={(e) => { updateDetails("populations", 0, "agesEligibleLow", e.target.value) } } size="small" variant='outlined' type="number" />
      <label className="rangeToLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
      <TextField className="inputField detailsInput agesEligibleInput agesEligibleHighInput" label="Ages Eligible High" value={populations[0].agesEligibleHigh || ''} onChange={(e) => { updateDetails("populations", 0, "agesEligibleHigh", e.target.value) } } size="small" variant='outlined' type="number" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Dropdown
                    className='populationUnitOfTimeMeasurementsDropdown'
                    placeholder='Units'
                    options={formState.unitOfTimeMeasures }
                    text={formState.allUnitsDisplay[populations[0].agesEligibleUnit] || 'Units'}
                    value={populations[0].agesEligibleUnit}
                    onChange={changeAgeEligibleUnit}
                    clearable
                    selection
                    selectOnNavigation={false}
                    selectOnBlur={false}
                  />
      &nbsp;&nbsp;&nbsp;&nbsp; 
      <Dropdown
                  className="populationDetailsDropdown"
                  options={sexesOptions}
                  placeholder='Sexes Eligible for Study'
                  text={ sexes[populations[0].sexesEligible] || 'Sexes Eligible for Study'}
                  selection
                  selectOnNavigation={false}
                  selectOnBlur={false}
                  clearable
                  value={populations[0].sexesEligible}
                  onChange={updatePopulationSexesEligibleChange}
                />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Dropdown
                  className="populationDetailsDropdown"
                  options={yesOrNoOptions}
                  placeholder='Accepts Healthy Volunteers'
                  text={ yesOrNo[populations[0].acceptsHealthy] || 'Accepts Healthy Volunteers'}
                  selection
                  selectOnNavigation={false}
                  selectOnBlur={false}
                  clearable
                  value={populations[0].acceptsHealthy}
                  onChange={updatePopulationAcceptsHealthyChange}
                />
      </div>
      <br />
      <Button className="formButton" content="+ Inclusion Criteria" compact onClick={(e) => { }} disabled />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button className="formButton" content="+ Exclusion Criteria" compact onClick={(e) => { }} disabled />
    </Segment>
    <Button className="formButton" content="+ Add Population" compact onClick={(e) => { }} disabled />
    <Segment className="subSegment inputSegment interventionSegment">
      <div className="inputLine segmentInputLine picoInputLine middleAlign leftAlign">
      <h2>Intervention</h2>&nbsp;&nbsp;&nbsp;&nbsp;
      <TextField className="inputField detailsInput exposureNameInput" label="Short Display Name" value={exposures[1].name || ''} onChange={(e) => { updateDetails("exposures", 1, "name", e.target.value) } } size="small" variant='outlined' type="text" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <TextField className="inputField detailsInput exposureDescriptionInput" label="Description" value={exposures[1].description || ''} onChange={(e) => { updateDetails("exposures", 1, "description", e.target.value) } } size="small" variant='outlined' type="text" />
      </div>
    </Segment>
    <Segment className="subSegment inputSegment comparatorSegment">
      <div className="inputLine segmentInputLine picoInputLine middleAlign leftAlign">
      <h2>Comparator</h2>&nbsp;&nbsp;&nbsp;&nbsp;
      <TextField className="inputField detailsInput exposureNameInput" label="Short Display Name" value={exposures[0].name || ''} onChange={(e) => { updateDetails("exposures", 0, "name", e.target.value) } } size="small" variant='outlined' type="text" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <TextField className="inputField detailsInput exposureDescriptionInput" label="Description" value={exposures[0].description || ''} onChange={(e) => { updateDetails("exposures", 0, "description", e.target.value) } } size="small" variant='outlined' type="text" />
      </div>
    </Segment>
    <Button className="formButton" content="+ Add Exposure/Trial Arm" compact onClick={(e) => { }} disabled />
  </Segment>
  );
};

  export default StudyPopulationExposuresInfo;
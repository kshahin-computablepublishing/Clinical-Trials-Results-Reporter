import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import './App.css';
import {
    TextField
} from '@material-ui/core';
import MeasuresSection from './MeasuresSection';
import { ToastProvider } from 'react-toast-notifications';
import NavigationButtons from './NavigationButtons';
import DisplaySection from './DisplaySection';
import ProjectInfoSection from './ProjectInfoSection';
import StudyPopulationExposuresInfo from './StudyPopulationExposuresInfo';
import ScrollToTop from './ScrollToTop';
import { Beforeunload } from 'react-beforeunload';
import ServerGetStateList from './ServerGetStateList';
import axios from 'axios';

const App = ( { } ) => {
  
  const emptyState = {
    projectStarted: false,
    projectname: "",
    statesOnServer: [],
    selectedServerState: "",
    loadedServerState: false,
    allUnitsDisplay: {
      days: 'Days',
      Days: 'Days',
      weeks: 'Weeks',
      Weeks: 'Weeks',
      months: 'Months',
      Months: 'Months',
      years: 'Years',
      Years: 'Years',
      mg: 'mg',
    },
    unitOfTimeMeasures: [
      { id: 0, key: 'days', text: 'Days', value: 'days' },
      { id: 1, key: 'weeks', text: 'Weeks', value: 'weeks' },
      { id: 2, key: 'months', text: 'Months', value: 'months' },
      { id: 3, key: 'years', text: 'Years', value: 'years' },
    ],
    unitOfMeasures: [
      { id: 0, key: 'days', text: 'Days', value: 'days' },
      { id: 1, key: 'weeks', text: 'Weeks', value: 'weeks' },
      { id: 2, key: 'months', text: 'Months', value: 'months' },
      { id: 3, key: 'years', text: 'Years', value: 'years' },
      { id: 4, key: 'mg', text: 'mg', value: 'mg' },
    ],
    studies: [{
      id: 0,
      title: "",
      identifier: "",
      type: "randomized clinical trial",
      numberOfParticipants: "",
   }],
   populations: [{
      id: 0,
      name: "",
      description: "",
      agesEligible: "",
      agesEligibleLow: "",
      agesEligibleHigh: "",
      agesEligibleUnit: "",
      sexesEligible: "",
      acceptsHealthy: "",
      inclusionCriteria: [{}],
      exclusionCriteria: [{}],  
   }],
   exposures: [
      {
         id: 0,
         name: "",
         description: "",
         baselineMeasureSubjects: "",
         baselineMeasureSubjectsDefault: false,
         outcomeMeasureSubjects: "",
         outcomeMeasureSubjectsDefault: false,
      },
      {
         id: 1,
         name: "",
         description: "",
         baselineMeasureSubjects: "",
         baselineMeasureSubjectsDefault: false,
         outcomeMeasureSubjects: "",
         outcomeMeasureSubjectsDefault: false,
      }
   ],
    baselineMeasures: [
      {
        id: 0,
        outcome: {
          name: "",
          timeOfMeasurement: "",
          timeOfUnit: "",
          dichotomous: true,
          mean: true,
          attribute: "",
          unitOfMeasure: "",
          median: "",
          iqrLow: "",
          iqrHigh: "",
          ciLow: "",
          ciHigh: "",
          description: "",
        },
        trialArms: [
          {
            id: 0,
            numerator: "",
            denominator: "",
            mean: "",
            median: "",
            sd: "",
            rangeLow: "",
            rangeHigh: "",
            iqrLow: "",
            iqrHigh: "",
            ciLow: "",
            ciHigh: "",
          },
          {
            id: 1,
            numerator: "",
            denominator: "",
            mean: "",
            median: "",
            sd: "",
            rangeLow: "",
            rangeHigh: "",
            iqrLow: "",
            iqrHigh: "",
            ciLow: "",
            ciHigh: "",
          }
        ]
      },
    ],
    outcomeMeasures: [
      {
        id: 0,
        outcome: {
          name: "",
          timeOfMeasurement: "",
          timeOfUnit: "",
          dichotomous: true,
          mean: true,
          attribute: "",
          unitOfMeasure: "",
          median: "",
          iqrLow: "",
          iqrHigh: "",
          ciLow: "",
          ciHigh: "",
          description: "",
        },
        trialArms: [
          {
            id: 0,
            numerator: "",
            denominator: "",
            mean: "",
            median: "",
            sd: "",
            rangeLow: "",
            rangeHigh: "",
            iqrLow: "",
            iqrHigh: "",
            ciLow: "",
            ciHigh: "",
          },
          {
            id: 1,
            numerator: "",
            denominator: "",
            mean: "",
            median: "",
            sd: "",
            rangeLow: "",
            rangeHigh: "",
            iqrLow: "",
            iqrHigh: "",
            ciLow: "",
            ciHigh: "",
          }
        ]
      }
    ]
  };

  const sampleState = {
    "projectStarted": true,
    "projectname": "ACTT-1",
    "formPreferences": [],
    "allUnitsDisplay": {
      "days": "Days",
      "Days": "Days",
      "weeks": "Weeks",
      "Weeks": "Weeks",
      "months": "Months",
      "Months": "Months",
      "years": "Years",
      "Years": "Years",
      "mg": "mg",
      "U/L": "U/L",
      "mg/dL": "mg/dL"
    },
    "unitOfTimeMeasures": [
      {
        "id": 0,
        "key": "days",
        "text": "Days",
        "value": "days"
      },
      {
        "id": 1,
        "key": "weeks",
        "text": "Weeks",
        "value": "weeks"
      },
      {
        "id": 2,
        "key": "years",
        "text": "Years",
        "value": "years"
      }
    ],
    "unitOfMeasures": [
      {
        "id": 3,
        "key": "mg/dL",
        "text": "mg/dL",
        "value": "mg/dL"
      },
      {
        "id": 4,
        "key": "U/L",
        "text": "U/L",
        "value": "U/L"
      },
      {
        "id": 5,
        "key": "days",
        "text": "Days",
        "value": "days"
      },
      {
        "id": 6,
        "key": "weeks",
        "text": "Weeks",
        "value": "weeks"
      },
      {
        "id": 7,
        "key": "years",
        "text": "Years",
        "value": "years"
      },
      {
        "id": 8,
        "key": "mg",
        "text": "mg",
        "value": "mg"
      }
    ],
    "studies": [
      {
        "id": 0,
        "title": "Adaptive COVID-19 Treatment Trial (ACTT)",
        "identifier": "NCT04280705",
        "type": "randomized clinical trial",
        "numberOfParticipants": "1062"
      }
    ],
    "populations": [
      {
        "id": 0,
        "name": "COVID-19",
        "description": "Hospitalized adults diagnosed with COVID-19",
        "agesEligible": "",
        "agesEligibleLow": "18",
        "agesEligibleHigh": "99",
        "agesEligibleUnit": "years",
        "sexesEligible": "All",
        "acceptsHealthy": "No",
        "inclusionCriteria": [
          {}
        ],
        "exclusionCriteria": [
          {}
        ]
      }
    ],
    "exposures": [
      {
        "id": 0,
        "name": "Placebo",
        "description": "200 mg of Remdesivir placebo administered intravenously on Day 1, followed by a 100 mg once-daily maintenance dose of Remdesivir placebo while hospitalized for up to a 10 days total course",
        "baselineMeasureSubjects": "521",
        "baselineMeasureSubjectsDefault": false,
        "outcomeMeasureSubjects": "521",
        "outcomeMeasureSubjectsDefault": true
      },
      {
        "id": 1,
        "name": "Remdesivir",
        "description": "200 mg of Remdesivir administered intravenously on Day 1, followed by a 100 mg once-daily maintenance dose of Remdesivir while hospitalized for up to a 10 days total course",
        "baselineMeasureSubjects": "541",
        "baselineMeasureSubjectsDefault": false,
        "outcomeMeasureSubjects": "541",
        "outcomeMeasureSubjectsDefault": true
      }
    ],
    "baselineMeasures": [
      {
        "id": 0,
        "outcome": {
          "name": "Age ",
          "timeOfMeasurement": "",
          "timeOfUnit": "",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "years",
          "iqrLow": "",
          "iqrHigh": "",
          "ciLow": "",
          "ciHigh": "",
          "description": ""
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "324",
            "denominator": "521",
            "mean": "59.2",
            "median": "",
            "sd": "15.4",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "354",
            "denominator": "541",
            "mean": "58.6",
            "median": "",
            "sd": "14.6",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 1,
        "outcome": {
          "name": "Age between 18 and 65 years",
          "dichotomous": true,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "years",
          "description": ""
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "324",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "354",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 2,
        "outcome": {
          "name": "Age >=65 years",
          "dichotomous": true,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "",
          "description": ""
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "197",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "187",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 3,
        "outcome": {
          "name": "Male Sex",
          "dichotomous": true,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "",
          "description": ""
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "332",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "352",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 4,
        "outcome": {
          "name": "Female Sex",
          "dichotomous": true,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "",
          "description": ""
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "189",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "189",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 5,
        "outcome": {
          "name": "Mild to Moderate Disease",
          "dichotomous": true,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "",
          "description": " SpO2 > 94% and respiratory rate < 24 breaths/min without supplemental oxygen"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "50",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "55",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 6,
        "outcome": {
          "name": "Severe Disease",
          "dichotomous": true,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "",
          "description": "requiring mechanical ventilation, requiring oxygen, a SpO2 = 94% on room air, or tachypnea (respiratory rate = 24 breaths/min)"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "471",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "486",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      }
    ],
    "outcomeMeasures": [
      {
        "id": 0,
        "outcome": {
          "name": "Time to Recovery",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days",
          "dichotomous": false,
          "mean": false,
          "attribute": "ci",
          "unitOfMeasure": "days",
          "iqrLow": "",
          "iqrHigh": "",
          "ciLow": "",
          "ciHigh": "",
          "description": "Day of recovery is defined as the first day on which the subject satisfies one of the following three categories from the ordinal scale: 1) Hospitalized, not requiring supplemental oxygen - no longer requires ongoing medical care; 2) Not hospitalized, limitation on activities and/or requiring home oxygen; 3) Not hospitalized, no limitations on activities."
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "15",
            "denominator": "352",
            "mean": "",
            "median": "15",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "13",
            "ciHigh": "18"
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "399",
            "mean": "",
            "median": "10",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "9",
            "ciHigh": "11"
          }
        ]
      },
      {
        "id": 1,
        "outcome": {
          "name": "ALT-Change from Baseline at Day 3",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "U/L",
          "description": "Blood to evaluate Alanine Transaminase (ALT)  was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge",
          "timeOfMeasurement": "2",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "463",
            "mean": "14.3",
            "median": "14.3",
            "sd": "88.0",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "465",
            "mean": "2.9",
            "median": "",
            "sd": "31.5",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 2,
        "outcome": {
          "name": "ALT-Change from Baseline at Day 5",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "U/L",
          "description": "Blood to evaluate Alanine Transaminase (ALT)  was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge",
          "timeOfMeasurement": "4",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "403",
            "mean": "23.1",
            "median": "",
            "sd": "70.6",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "398",
            "mean": "10.8",
            "median": "",
            "sd": "55.8",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 3,
        "outcome": {
          "name": "ALT-Change from Baseline at Day 8",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "U/L",
          "description": "Blood to evaluate Alanine Transaminase (ALT)  was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge",
          "timeOfMeasurement": "7",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "327",
            "mean": "24.2",
            "median": "",
            "sd": "79.7",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "296",
            "mean": "8.9",
            "median": "",
            "sd": "54.2",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 4,
        "outcome": {
          "name": "ALT-Change from Baseline at Day 11",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "U/L",
          "description": "Blood to evaluate Alanine Transaminase (ALT)  was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge",
          "timeOfMeasurement": "10",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "257",
            "mean": "27.7",
            "median": "",
            "sd": "89.8",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "227",
            "mean": "3.4",
            "median": "",
            "sd": "48.4",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 5,
        "outcome": {
          "name": "ALT-Change from Baseline at Day 15",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "U/L",
          "description": "Blood to evaluate Alanine Transaminase (ALT)  was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge",
          "timeOfMeasurement": "14",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "242",
            "mean": "28.1",
            "median": "",
            "sd": "110.1",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "257",
            "mean": "1.7",
            "median": "",
            "sd": "47.4",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 6,
        "outcome": {
          "name": "ALT-Change from Baseline at Day 29",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "U/L",
          "description": "Blood to evaluate Alanine Transaminase (ALT)  was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "180",
            "mean": "-3.9",
            "median": "",
            "sd": "62.2",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "220",
            "mean": "-6.8",
            "median": "",
            "sd": "43.7",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 7,
        "outcome": {
          "name": "Creatinine-Change Baseline to Day 3 ",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "mg/dL",
          "description": "Blood to evaluate serum creatinine was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge.",
          "timeOfMeasurement": "2",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "475",
            "mean": "0.037",
            "median": "",
            "sd": "0.517",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "482",
            "mean": "0.038",
            "median": "",
            "sd": "0.569",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 8,
        "outcome": {
          "name": "Creatinine-Change Baseline to Day 5 ",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "mg/dL",
          "description": "Blood to evaluate serum creatinine was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge.",
          "timeOfMeasurement": "4",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "418",
            "mean": "-0.695",
            "median": "",
            "sd": "17.552",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "411",
            "mean": "0.075",
            "median": "",
            "sd": "0.762",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 9,
        "outcome": {
          "name": "Creatinine-Change Baseline to Day 8",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "mg/dL",
          "description": "Blood to evaluate serum creatinine was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge.",
          "timeOfMeasurement": "7",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "335",
            "mean": "-0.882",
            "median": "",
            "sd": "19.637",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "309",
            "mean": "0.158",
            "median": "",
            "sd": "0.951",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 10,
        "outcome": {
          "name": "Creatinine-Change Baseline to Day 11 ",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "mg/dL",
          "description": "Blood to evaluate serum creatinine was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge.",
          "timeOfMeasurement": "10",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "269",
            "mean": "1.173",
            "median": "",
            "sd": "15.440",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "234",
            "mean": "0.236",
            "median": "",
            "sd": "1.057",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 11,
        "outcome": {
          "name": "Creatinine-Change Baseline to Day 15 ",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "mg/dL",
          "description": "Blood to evaluate serum creatinine was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge.",
          "timeOfMeasurement": "14",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "249",
            "mean": "-1.239",
            "median": "",
            "sd": "22.755",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "262",
            "mean": "0.319",
            "median": "",
            "sd": "2.147",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 12,
        "outcome": {
          "name": "Creatinine-Change Baseline to Day 29",
          "dichotomous": false,
          "mean": true,
          "attribute": "sd",
          "unitOfMeasure": "mg/dL",
          "description": "Blood to evaluate serum creatinine was collected at Days 1, 3, 5, 8, and 11 while participants were inpatient, and at Days 15 and 29, with the Day 1 assessment serving as baseline. Participants who had been discharged had blood collected if infection control measures allowed for in-person visits after discharge.",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "189",
            "mean": "-1.863",
            "median": "",
            "sd": "26.093",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "229",
            "mean": "0.075",
            "median": "",
            "sd": "0.644",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 13,
        "outcome": {
          "name": "Death at or before study visit at Day 1",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "",
          "timeOfMeasurement": "0",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "0",
            "denominator": "521",
            "mean": "0",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "0",
            "ciHigh": "1"
          },
          {
            "id": 1,
            "numerator": "0",
            "denominator": "541",
            "mean": "0",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "0",
            "ciHigh": "1"
          }
        ]
      },
      {
        "id": 14,
        "outcome": {
          "name": " Death at or before study visit at Day 3",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Invasive Ventilation at Day 3Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "2",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "7",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "3",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 15,
        "outcome": {
          "name": " Death at or before study visit at Day 5",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "",
          "timeOfMeasurement": "4",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "12",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "11",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 16,
        "outcome": {
          "name": "Death at or before study visit at Day 8",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "",
          "timeOfMeasurement": "7",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "34",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "17",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 17,
        "outcome": {
          "name": "Death at or before study visit at Day 11",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "",
          "timeOfMeasurement": "10",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "41",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "22",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 18,
        "outcome": {
          "name": "Death at or before study visit at Day 15",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "",
          "timeOfMeasurement": "14",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "58",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "34",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 19,
        "outcome": {
          "name": "Death at or before study visit at Day 22",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "",
          "timeOfMeasurement": "21",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "67",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "50",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 20,
        "outcome": {
          "name": "Death at or before study visit at Day 29",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "76",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "58",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 21,
        "outcome": {
          "name": "Invasive Ventilation or ECMO at Day 1",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "0",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "154",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "131",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 22,
        "outcome": {
          "name": "Invasive Ventilation or ECMO at Day 3",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "2",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "187",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "153",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 23,
        "outcome": {
          "name": "Invasive Ventilation or ECMO at Day 5",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "4",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "191",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "152",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 24,
        "outcome": {
          "name": "Invasive Ventilation or ECMO at Day 8",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "7",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "173",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "130",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 25,
        "outcome": {
          "name": "Invasive Ventilation or ECMO at Day 11",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "10",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "148",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "119",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 26,
        "outcome": {
          "name": "Invasive Ventilation or ECMO at Day 15",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "14",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "115",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "83",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 27,
        "outcome": {
          "name": "Invasive Ventilation or ECMO at Day 22",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "21",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "75",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "49",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 28,
        "outcome": {
          "name": "Invasive Ventilation or ECMO at Day 29",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Hospitalized, on invasive mechanical ventilation or extracorporeal membrane oxygenation (ECMO)",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "45",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "30",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 29,
        "outcome": {
          "name": "Adverse Events Grade 3 or 4 at Day 29",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Grade 3 AEs are defined as events that interrupt usual activities of daily living, or significantly affects clinical status, or may require intensive therapeutic intervention. Severe events are usually incapacitating. Grade 4 AEs are defined as events that are potentially life threatening",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "295",
            "denominator": "516",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "273",
            "denominator": "532",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 30,
        "outcome": {
          "name": "Serious Adverse Events at Day 29",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "An SAE is defined as an AE or suspected adverse reaction is considered serious if, in the view of either the investigator or the sponsor, it results in death, a life-threatening AE, inpatient hospitalization or prolongation of existing hospitalization, a persistent or significant incapacity or substantial disruption of the ability to conduct normal life functions, or a congenital anomaly/birth defect.",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "163",
            "denominator": "516",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "130",
            "denominator": "532",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 31,
        "outcome": {
          "name": "Incomplete Dosing Due to Discharge",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Participants discontinued from investigational therapeutics due to discharge before Day 10",
          "timeOfMeasurement": "9",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "158",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "223",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 32,
        "outcome": {
          "name": "Incomplete Dosing Due to Death",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Participants discontinued from investigational therapeutics due to death by Day 10",
          "timeOfMeasurement": "9",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "19",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "15",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 33,
        "outcome": {
          "name": "Incomplete Dosing (ANY reason)",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "Participants discontinued from Investigational Therapeutics or Received less than 10 doses",
          "timeOfMeasurement": "9",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "295",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "333",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 34,
        "outcome": {
          "name": "Received all 10 intended doses",
          "dichotomous": true,
          "mean": true,
          "attribute": "ci",
          "unitOfMeasure": "",
          "description": "",
          "timeOfMeasurement": "9",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "226",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "208",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 35,
        "outcome": {
          "name": "Duration of Hospitalization/ITT",
          "dichotomous": false,
          "mean": false,
          "attribute": "iqr",
          "unitOfMeasure": "days",
          "description": "Duration of hospitalization including imputations for participants who died.",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "521",
            "mean": "",
            "median": "17",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "8",
            "iqrHigh": "28",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "541",
            "mean": "",
            "median": "12",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "6",
            "iqrHigh": "28",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 36,
        "outcome": {
          "name": "Duration of Hospitalization/Survivors",
          "dichotomous": false,
          "mean": false,
          "description": "Duration of hospitalization restricted to participants who did not die",
          "unitOfMeasure": "days",
          "attribute": "iqr",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "443",
            "mean": "",
            "median": "14",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "7",
            "iqrHigh": "27",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "480",
            "mean": "",
            "median": "10",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "5",
            "iqrHigh": "21",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 37,
        "outcome": {
          "name": "Duration of New Ventilator/ECMO Use",
          "dichotomous": false,
          "mean": false,
          "attribute": "iqr",
          "unitOfMeasure": "days",
          "description": "Duration of new ventilator or ECMO use was measured in days among participants who were not on a ventilator or ECMO at baseline including imputations for participants who died.",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "82",
            "mean": "",
            "median": "23",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "12",
            "iqrHigh": "28",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "52",
            "mean": "",
            "median": "21.5",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "9",
            "iqrHigh": "28",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 38,
        "outcome": {
          "name": "Duration of New Ventilator/ECMO Use (Survivors)",
          "dichotomous": false,
          "mean": false,
          "attribute": "iqr",
          "unitOfMeasure": "days",
          "description": "Duration of new ventilator or ECMO use was measured in days among participants who were not on a ventilator or ECMO at baseline,  restricted to participants who did not die",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "",
            "denominator": "57",
            "mean": "",
            "median": "16",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "9",
            "iqrHigh": "24",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "",
            "denominator": "39",
            "mean": "",
            "median": "14",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "5",
            "iqrHigh": "26",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 39,
        "outcome": {
          "name": "New Ventilator or ECMO Use",
          "dichotomous": true,
          "mean": false,
          "attribute": "iqr",
          "unitOfMeasure": "days",
          "description": "Number of participants requiring new ventilator or ECMO use, not on a ventilator or ECMO at baseline",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "82",
            "denominator": "364",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "52",
            "denominator": "402",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 40,
        "outcome": {
          "name": "14-day Mortality",
          "dichotomous": true,
          "mean": false,
          "attribute": "iqr",
          "unitOfMeasure": "",
          "description": "Number of deaths by Day 15",
          "timeOfMeasurement": "14",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "61",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "35",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      },
      {
        "id": 41,
        "outcome": {
          "name": "28-day Mortality",
          "dichotomous": true,
          "mean": false,
          "attribute": "iqr",
          "unitOfMeasure": "",
          "description": "Number of deaths by Day 29",
          "timeOfMeasurement": "28",
          "timeOfUnit": "days"
        },
        "trialArms": [
          {
            "id": 0,
            "numerator": "77",
            "denominator": "521",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          },
          {
            "id": 1,
            "numerator": "59",
            "denominator": "541",
            "mean": "",
            "median": "",
            "sd": "",
            "rangeLow": "",
            "rangeHigh": "",
            "iqrLow": "",
            "iqrHigh": "",
            "ciLow": "",
            "ciHigh": ""
          }
        ]
      }
    ],
    "currentPage": 2
  };

  let startingState = emptyState;

  const [formState, setFormState] = useState(startingState);

  const resetFormState = () => {
    setFormState({
      ...emptyState
    });
  }

  const resetFormStateWithWarning = () => {
    if (window.confirm('Are you sure you want to reset the form? You will lose all unsaved data.')) {
      resetFormState();
    } else {
    }
    
  }

  const addUnitOfMeasure = (newUnit) => {
    const lastId = Math.max(...formState.unitOfMeasures.map(unit => unit.id));
    setFormState({
      ...formState,
      allUnitsDisplay: {...formState.allUnitsDisplay, [newUnit]: newUnit },
      unitOfMeasures: [
        { id: lastId+1, key: newUnit, text: newUnit, value: newUnit },
        ...formState.unitOfMeasures,
      ]
    });
  };

  const addUnitOfTimeMeasure = (newUnit) => {
    const lastId = Math.max(...formState.unitOfTimeMeasures.map(unit => unit.id));
    setFormState({
      ...formState,
      allUnitsDisplay: {...formState.allUnitsDisplay, [newUnit]: newUnit },
      unitOfTimeMeasures: [
        { id: lastId+1, key: newUnit, text: newUnit, value: newUnit },
        ...formState.unitOfTimeMeasures,
      ]
    });
  };

  const updateDetails = (detail, index, field, newValue) => {
    setFormState(prevState  => {
      let newDetail = prevState[detail];
      newDetail.find(x => x.id === index)[field] = newValue;
      return {
        ...prevState,
        [detail]: newDetail,
      };
    });
  };

  const updateTrialArmsState = (newValue, field, trialArmsIndex, measuresIndex, measureType) => {
    setFormState(prevState  => {
      let newTrialArms = prevState[measureType].find(x => x.id === measuresIndex).trialArms;
      newTrialArms.find(x => x.id === trialArmsIndex)[field] = newValue;
      let newMeasures = prevState[measureType];
      newMeasures.find(x => x.id === measuresIndex).trialArms = newTrialArms;

      return {
        ...prevState,
        [measureType]: newMeasures,
      };
    });
  };

  const updateMeasureOutcome = (newValue, field, measuresIndex, measureType) => {
    setFormState(prevState  => {
      let newMeasures = prevState[measureType];
      newMeasures.find(x => x.id === measuresIndex).outcome[field] = newValue;

      return {
        ...prevState,
        [measureType]: newMeasures,
      };
    });
  };

  const addMeasureRow = (measureType) => {

    let subjects;
    let subjectsDefault;
    if (measureType === "baselineMeasures") {
      subjects = "baselineMeasureSubjects";
      subjectsDefault = "baselineMeasureSubjectsDefault";
    } else {
      subjects = "outcomeMeasureSubjects";
      subjectsDefault = "outcomeMeasureSubjectsDefault";
    }

    const trialArms = formState.exposures.map( (exposure) => (
      {
        id: exposure.id,
        numerator: "",
        denominator: exposure[subjectsDefault] ? exposure[subjects] : "",
        mean: "",
        median: "",
        sd: "",
        rangeLow: "",
        rangeHigh: "",
        iqrLow: "",
        iqrHigh: "",
        ciLow: "",
        ciHigh: "",
      })
    );

    const lastId = Math.max(...formState[measureType].map(measure => measure.id));
    setFormState({
      ...formState,
      [measureType]: [...formState[measureType],
        {
          id: lastId+1,
          outcome: {
            name: "",
            timeOfMeasurement: "",
            timeOfUnit: formState[measureType][formState[measureType].length-1].outcome.timeOfUnit,
            dichotomous: formState[measureType][formState[measureType].length-1].outcome.dichotomous,
            mean: formState[measureType][formState[measureType].length-1].outcome.mean,
            attribute: formState[measureType][formState[measureType].length-1].outcome.attribute,
            unitOfMeasure: formState[measureType][formState[measureType].length-1].outcome.dichotomous ? "" : formState[measureType][formState[measureType].length-1].outcome.unitOfMeasure,
            median: "",
            iqrLow: "",
            iqrHigh: "",
            ciLow: "",
            ciHigh: "",
            description: "",
          },
          trialArms: trialArms
        }
      ]
    });
  }

  const nameProject = (newProjectName) => {
    setFormState(prevState  => {
      return {
        ...prevState,
        projectname: newProjectName,
      };
    });
  }

  const setStatesOnServer = (stateList) => {
    setFormState(prevState  => {
      return {
        ...prevState,
        statesOnServer: stateList,
      };
    });
  }

  const selectServerState = (value) => {
    setFormState(prevState  => {
      return {
        ...prevState,
        selectedServerState: value,
      };
    });
  }

  const updatePageNumber = () => {
    setFormState(prevState  => {
      //let currentPage = prevState["currentPage"];
      //if (currentPage === undefined) {
      //  currentPage = 1;
      //}
      return {
        ...prevState,
        currentPage: parseInt(window.location.pathname.substring(1).split("/")[1]),
      };
    });    
  }

  const startProject = () => {
    setFormState(prevState  => {
      return {
        ...prevState,
        projectStarted: true,
      };
    });
  }

  const acceptableExtensions = [".txt", ".json", ".text"];

  const saveTXT = (objectToSave, promptDialogue, defaultFileName) => {
    let saveJSONfile = prompt(promptDialogue, defaultFileName);
    if (saveJSONfile != null) {

      //saveState["projectStarted"] = false;

      if (saveJSONfile.indexOf(".") === -1 || acceptableExtensions.indexOf(saveJSONfile.substring(saveJSONfile.lastIndexOf("."), saveJSONfile.length)) === -1) {
        saveJSONfile = saveJSONfile + ".txt";
      }

      let jsonToSave = JSON.stringify(objectToSave, null, 2);

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(new Blob([jsonToSave], { type: 'data:text/plain;charset=utf-8;' }), saveJSONfile);
      } else {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonToSave));
        element.setAttribute('download', saveJSONfile);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
   }
  }
  
  const saveStateToTXT = () => {
    saveTXT({...formState}, "Name the file for the form's state that you're saving", "CTRR Form State.txt")
  };

  const saveFHIR = (fhirResources) => {
    saveTXT(fhirResources, "Name the file for the FHIR bundle (JSON)", "CTRR FHIR Resources.json")
  };

  const loadFormState = (json) => {
    setFormState(prevState => {
      return json;
    });
  };


  const loadStateFromFile = (e) => {
      const input = e.target;
      if ("files" in input && input.files.length > 0) {
        let file = input.files[0];

          const fileReader = new FileReader();
          fileReader.readAsText(file, "UTF-8");
          fileReader.onload = e => {
            let newJson = JSON.parse(e.target.result);
            newJson.loadedServerState = false;
            loadFormState(newJson);

            window.history.pushState('/ctrr/2', '', '/ctrr/2');
            updatePageNumber();
          };

      }
  };

  const loadSampleState = () => {
    setFormState(prevState => {
      return sampleState;
    });
  }

  const loadState = (newState) => {
    newState.loadedServerState = true;
    setFormState(prevState => {
      return newState;
    });
  }

  const studyTypes = [
    { key: 'randomized clinical trial', text: 'randomized clinical trial', value: 'randomized clinical trial' },
    { key: 'non-randomized clinical trial', text: 'non-randomized clinical trial', value: 'non-randomized clinical trial' },
    { key: 'observational study', text: 'observational study', value: 'observational study' },
    { key: 'patient registry', text: 'patient registry', value: 'patient registry' },
    { key: 'expanded access study', text: 'expanded access study', value: 'expanded access study' },
  ];
  



useEffect( () => {
  ServerGetStateList(setStatesOnServer);
}, []);

  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000} placement="bottom-left" >
    <Router>
    <Beforeunload onBeforeunload={(event) => { event.preventDefault(); } } />
    <ScrollToTop />
    <main className="App">
      <header className="App-header"></header>
      <div>
        <h2 className="computablePublishingTopBar"><a href="http://ComputablePublishing.com">Computable Publishing</a></h2>
        <h1 style={{position: "absolute", top: "0", padding: "0", margin: "0px", left: "40%", textAlign: "center"}}>Clinical Trial Results Reporter</h1>
        <Switch>
          <Route path={["/ctrr/", "/ctrr/1"]} exact>
            {formState.projectStarted === true ? <Redirect to={{ pathname: "/ctrr/2" }} />: <></> }
          </Route>
          <Route path={["/ctrr/", "/ctrr/2"]} exact>
            {formState.projectStarted === false ? <Redirect to={{ pathname: "/ctrr/" }} />: <></> }
            <div><TextField className="projectNameHeaderInput" label="Project Name" value={formState.projectname} onChange={(e) => { nameProject(e.target.value) } } size="small" variant='outlined' type="text" /><br /></div>
          </Route>
          <Route>
            {formState.projectStarted === false ? <Redirect to={{ pathname: "/ctrr/" }} />: <></> }
            <div><h1>{formState.projectname}</h1><br /></div>
          </Route>
        </Switch>
        <Switch>
          <Route path={["/ctrr/", "/ctrr/1"]} exact>
            <ProjectInfoSection formState={formState} loadState={loadState} loadSampleState={loadSampleState} startProject={startProject} nameProject={nameProject} loadStateFromFile={loadStateFromFile} selectServerState={selectServerState} updatePageNumber={updatePageNumber} />
          </Route>
          <Route path="/ctrr/2" exact>
            <StudyPopulationExposuresInfo formState={formState} updateDetails={updateDetails} studyTypes={studyTypes} />
          </Route>
          <Route path="/ctrr/3" exact>
            <MeasuresSection measureType={"baselineMeasures"} formState={formState} updateDetails={updateDetails} updateTrialArmsState={updateTrialArmsState} addMeasureRow={addMeasureRow} updateMeasureOutcome={updateMeasureOutcome} addUnitOfMeasure={addUnitOfMeasure} />
          </Route>
          <Route path="/ctrr/4" exact>
            <MeasuresSection measureType={"outcomeMeasures"} formState={formState} updateDetails={updateDetails} updateTrialArmsState={updateTrialArmsState} addMeasureRow={addMeasureRow} updateMeasureOutcome={updateMeasureOutcome} addUnitOfMeasure={addUnitOfMeasure} addUnitOfTimeMeasure={addUnitOfTimeMeasure} />
          </Route>
          <Route path="/ctrr/5" exact>
            <DisplaySection formState={formState} />
          </Route>
        </Switch>

        <br /><br /><br /><br />

        <Switch>
          <Route path={["/ctrr/", "/ctrr/1"]} exact>
          </Route>
          <Route>
            <span style={{position: "absolute", top: "6px", padding: "0px", margin: "0px", right: "8px"}}>
              <NavigationButtons formState={formState} updatePageNumber={updatePageNumber} resetFormStateWithWarning={resetFormStateWithWarning} saveStateToTXT={saveStateToTXT} saveFHIR={saveFHIR} />
            </span>
            <span className="bottomNavigationBar"><span className="bottomNavigationButtons"><NavigationButtons formState={formState} updatePageNumber={updatePageNumber} resetFormStateWithWarning={resetFormStateWithWarning} saveStateToTXT={saveStateToTXT} saveFHIR={saveFHIR} /></span><span style={{paddingRight: "50px"}}></span></span>
          </Route>
        </Switch>
        <footer><div style={{width: "100%"}}>© 2020  Computable Publishing LLC</div><div><a href="mailto:support@computablepublishing.com">support@computablepublishing.com</a></div></footer>
      </div>
    </main>
    </Router>
    </ToastProvider>
  );
};


export default App;

import moment from "moment";
import blankEvidenceReportResource from './BlankEvidenceReport.json';
import blankEvidenceResource from './BlankEvidence.json';
import blankEvidenceVariableResource from './BlankEvidenceVariable.json';
import blankGroupResource from './BlankGroup.json';
  
const studyTypes = {
    "randomized clinical trial": ["RCT", "randomized trial"],
    "non-randomized clinical trial": ["CCT", "controlled trial (non-randomized)"],
    "observational study": ["cohort", "comparative cohort study"],
    "patient registry": ["PATIENTREGISTRY", "PATIENTREGISTRY"],
    "expanded access study": ["EXPANDEDACCESSSTUDY", "EXPANDEDACCESSSTUDY"]
}

const statisticAttributeTypes = {
    sd: ["C53322", "Standard deviation"],
    range: ["C38013", "Range"],
    iqr: ["C53245", "Interquartile range"],
    ci: ["C53324", "Confidence interval"]
}

const ucum = {
    "s": "s",
    "second": "s",
    "seconds": "s",
    "min": "min",
    "minute": "min",
    "minutes": "min",
    "h": "h",
    "hour": "h",
    "hours": "h",
    "d": "d",
    "day": "d",
    "days": "d",
    "wk": "wk",
    "week": "wk",
    "weeks": "wk",
    "mo": "mo",
    "month": "mo",
    "months": "mo",
    "a": "a",
    "year": "a",
    "years": "a",
    "L": "L",
    "l": "L",
    "liter": "L",
    "liters": "L",
    "litre": "L",
    "litres": "L",
    "mL": "mL",
    "ml": "mL",
    "milliliter": "mL",
    "milliliters": "mL",
    "millilitre": "mL",
    "millilitres": "mL",
    "dL": "dL",
    "dl": "dL",
    "deciliter": "dL",
    "deciliters": "dL",
    "decilitre": "dL",
    "decilitres": "dL",
    "mg": "mg",
    "milligram": "mg",
    "milligrams": "mg",
    "g": "g",
    "gram": "g",
    "grams": "g",
    "kg": "kg",
    "kilogram": "kg",
    "kilograms": "kg",
    "mg/dL": "mg/dL",
    "mg/dl": "mg/dL",
    "milligram per deciliter": "mg/dL",
    "milligram per deciliters": "mg/dL",
    "milligram per decilitre": "mg/dL",
    "milligram per decilitres": "mg/dL",
    "mg/mL": "mg/mL",
    "mg/ml": "mg/mL",
    "milligram per milliliter": "mg/mL",
    "milligram per milliliters": "mg/mL",
    "milligram per millilitre": "mg/mL",
    "milligram per millilitres": "mg/mL",
    "mg/L": "mg/L",
    "mg/l": "mg/L",
    "milligram per liter": "mg/L",
    "milligram per liters": "mg/L",
    "milligram per litre": "mg/L",
    "milligram per litres": "mg/L",
    "g/dL": "g/dL",
    "g/dl": "g/dL",
    "gram per deciliter": "g/dL",
    "gram per deciliters": "g/dL",
    "gram per decilitre": "g/dL",
    "gram per decilitres": "g/dL",
    "g/L": "g/L",
    "g/l": "g/L",
    "gram per liter": "g/L",
    "gram per liters": "g/L",
    "gram per litre": "g/L",
    "gram per litres": "g/L",
    "g/mL": "g/mL",
    "g/ml": "g/mL",
    "gram per milliliter": "g/mL",
    "gram per milliliters": "g/mL",
    "gram per millilitre": "g/mL",
    "gram per millilitres": "g/mL",
    "U": "U",
    "u": "U",
    "unit": "U",
    "units": "U",
    "enzyme unit": "U",
    "enzyme Unit": "U",
    "U/L": "U/L",
    "u/l": "U/L",
    "enzyme unit per liter": "U/L",
    "U/mL": "U/mL",
    "u/ml": "U/mL",
    "enzyme unit per milliliter": "U/mL",
    "U/dL": "U/dL",
    "u/dl": "U/dL",
    "enzyme unit per deciliter": "U/dL",
};

const unitRepresentation = {
    "s": "second",
    "second": "second",
    "seconds": "second",
    "min": "minute",
    "minute": "minute",
    "minutes": "minute",
    "h": "hour",
    "hour": "hour",
    "hours": "hour",
    "d": "day",
    "day": "day",
    "days": "day",
    "wk": "week",
    "week": "week",
    "weeks": "week",
    "mo": "month",
    "month": "month",
    "months": "month",
    "a": "year",
    "year": "year",
    "years": "year",
    "L": "liter",
    "l": "liter",
    "liter": "liter",
    "liters": "liter",
    "litre": "liter",
    "litres": "liter",
    "mL": "milliliter",
    "ml": "milliliter",
    "milliliter": "milliliter",
    "milliliters": "milliliter",
    "millilitre": "milliliter",
    "millilitres": "milliliter",
    "dL": "deciliter",
    "dl": "deciliter",
    "deciliter": "deciliter",
    "deciliters": "deciliter",
    "decilitre": "deciliter",
    "decilitres": "deciliter",
    "mg": "milligram",
    "milligram": "milligram",
    "milligrams": "milligram",
    "g": "gram",
    "gram": "gram",
    "grams": "gram",
    "kg": "kilogram",
    "kilogram": "kilogram",
    "kilograms": "kilogram",
    "mg/dL": "milligram per deciliter",
    "mg/dl": "milligram per deciliter",
    "milligram per deciliter": "milligram per deciliter",
    "milligram per deciliters": "milligram per deciliter",
    "milligram per decilitre": "milligram per deciliter",
    "milligram per decilitres": "milligram per deciliter",
    "mg/mL": "milligram per milliliter",
    "mg/ml": "milligram per milliliter",
    "milligram per milliliter": "milligram per milliliter",
    "milligram per milliliters": "milligram per milliliter",
    "milligram per millilitre": "milligram per milliliter",
    "milligram per millilitres": "milligram per milliliter",
    "mg/L": "milligram per liter",
    "mg/l": "milligram per liter",
    "milligram per liter": "milligram per liter",
    "milligram per liters": "milligram per liter",
    "milligram per litre": "milligram per liter",
    "milligram per litres": "milligram per liter",
    "g/dL": "gram per deciliter",
    "g/dl": "gram per deciliter",
    "gram per deciliter": "gram per deciliter",
    "gram per deciliters": "gram per deciliter",
    "gram per decilitre": "gram per deciliter",
    "gram per decilitres": "gram per deciliter",
    "g/L": "gram per liter",
    "g/l": "gram per liter",
    "gram per liter": "gram per liter",
    "gram per liters": "gram per liter",
    "gram per litre": "gram per liter",
    "gram per litres": "gram per liter",
    "g/mL": "gram per milliliter",
    "g/ml": "gram per milliliter",
    "gram per milliliter": "gram per milliliter",
    "gram per milliliters": "gram per milliliter",
    "gram per millilitre": "gram per milliliter",
    "gram per millilitres": "gram per milliliter",
    "U": "enzyme Unit",
    "u": "enzyme Unit",
    "unit": "enzyme Unit",
    "units": "enzyme Unit",
    "enzyme unit": "enzyme Unit",
    "enzyme Unit": "enzyme Unit",
    "U/L": "enzyme unit per liter",
    "u/l": "enzyme unit per liter",
    "enzyme unit per liter": "enzyme unit per liter",
    "U/mL": "enzyme unit per milliliter",
    "u/ml": "enzyme unit per milliliter",
    "enzyme unit per milliliter": "enzyme unit per milliliter",
    "U/dL": "enzyme unit per deciliter",
    "u/dl": "enzyme unit per deciliter",
    "enzyme unit per deciliter": "enzyme unit per deciliter",
};

const ucumLookup = (unit) => {
    if (ucum[unit] !== undefined) {
        return {
            //"unit": unitRepresentation[unit.trim().toLowerCase()],
            "unit": unit,
            "code": ucum[unit.trim().toLowerCase()],
            "system": "http://unitsofmeasure.org/",
            "display": unitRepresentation[unit.trim().toLowerCase()]
        }
    } else {
        return {
                "unit": unit,
                "code": "",
                "system": "",
                "display": ""
        }
    }
}

const getLowestValue = (aRangeLow, bRangeLow) => {
    if (aRangeLow !== "" && aRangeLow !== "") {
        if (parseFloat(aRangeLow) < parseFloat(bRangeLow)){
            return parseFloat(aRangeLow);
        } else {
            return parseFloat(bRangeLow);
        }
    } else {
        if (aRangeLow !== "") {
            return parseFloat(aRangeLow);
        } else {
            return parseFloat(bRangeLow);
        }
    }
}

const getHighestValue = (aRangeHigh, bRangeHigh) => {
    if (aRangeHigh !== "" && aRangeHigh !== "") {
        if (parseFloat(aRangeHigh) > parseFloat(bRangeHigh)){
            return parseFloat(aRangeHigh);
        } else {
            return parseFloat(bRangeHigh);
        }
    } else {
        if (aRangeHigh !== "") {
            return parseFloat(aRangeHigh);
        } else {
            return parseFloat(bRangeHigh);
        }
    }
}

const calculateCI = (numerator, denominator) => {
    numerator = parseFloat(numerator);
    denominator = parseFloat(denominator);
    const proportion = numerator/denominator;
    let confidenceInterval = 1.96 * Math.sqrt((proportion * (1  - proportion) ) / denominator)
    let confidenceIntervalLow = (proportion - confidenceInterval);
    let confidenceIntervalHigh = (proportion + confidenceInterval);

    if (confidenceIntervalLow < 0) {
        confidenceIntervalLow = 0;
    }

    if (confidenceIntervalHigh > 100) {
        confidenceIntervalHigh = 100;
    }
    return [confidenceIntervalLow, confidenceIntervalHigh]
};


const objectRemoveBlank = (object, entry, result) => {
    let cleanedObject;
    if (typeof object === "object" && object !== null){
        let index = 0;
        if (Array.isArray(object)) {
          cleanedObject = [];
          let length = object.length;
          while (index < length) {
              objectRemoveBlank(object[index], index, cleanedObject);
              index += 1;
          }
        } else {
          cleanedObject = {};
          let keys = Object.keys(object);
          let length = keys.length;
          while (index < length) {
              let key = keys[index];
              objectRemoveBlank(object[key], key, cleanedObject);
              index += 1;
          }
        }
        if (!Object.keys(cleanedObject).length){
          return;
        }
    } else {
        if (!Array.isArray(object) && (object === null || (typeof object === "string" && object === ""))) {
            return;
        }
        cleanedObject = object;
    }
    if ( Array.isArray(result) ) {
        if (typeof cleanedObject !== "undefined") {
            result.push(cleanedObject);
        }
    } else {
       result[entry] = cleanedObject;
    }
  }
  
  
  const removeEmptyFields = (object) => {
      let keys = Object.keys(object);
      let length = keys.length;
      let index = 0;
      let result = {};
      while (index < length) {
        let key = keys[index];
        objectRemoveBlank(object[key], key, result);
        index += 1;
      }
      return result;
  }
  
  const makeUnitSection = (title, units) => {
    let evidenceReportSection1A = {};
    evidenceReportSection1A.title = title;
    evidenceReportSection1A.focus = {};
    evidenceReportSection1A.focus.text = title;
    evidenceReportSection1A.section = [];
    let evidenceReportSection1A1 = {};
    evidenceReportSection1A1.title = "";
    evidenceReportSection1A1.entryClassifier = [];
    let evidenceReportSection1A2 = {};
    evidenceReportSection1A2.title = "";
    evidenceReportSection1A2.entryClassifier = [];
    for (let x in units) {
        let evidenceReportEntryClassifier1 = {};
        evidenceReportEntryClassifier1.coding = [];
        let evidenceReportEntryClassifier1Coding = {};
        let choiceUcum = ucumLookup(units[x].value);
        evidenceReportEntryClassifier1Coding.system = choiceUcum.system;
        evidenceReportEntryClassifier1Coding.code = choiceUcum.code;
        evidenceReportEntryClassifier1Coding.display = choiceUcum.unit; //This could be choiceUcum.display, and in the JSON text field could have choiceUcum.unit
        
        evidenceReportEntryClassifier1.coding.push(evidenceReportEntryClassifier1Coding);
        if (choiceUcum.system !== "") {
            evidenceReportSection1A1.title = "coded";
            evidenceReportSection1A1.entryClassifier.push(evidenceReportEntryClassifier1);
        } else {
            evidenceReportSection1A2.title = "uncoded";
            evidenceReportSection1A2.entryClassifier.push(evidenceReportEntryClassifier1);
        }
    }
    evidenceReportSection1A.section.push(evidenceReportSection1A1);
    evidenceReportSection1A.section.push(evidenceReportSection1A2);
    return evidenceReportSection1A;
  }

  const ConvertStateToEBMonFHIR = (formState) => {
    //console.log(blankEvidenceResource);
    //console.log(blankEvidenceVariableResource);
    //console.log(blankGroupResource);
    //console.log(blankCitationResource);
    //console.log(blankEvidenceReportResource);

    let study = formState.studies[0];

    let population = formState.populations[0];
    
    let intervention = formState.exposures[1];
    let comparator = formState.exposures[0];
    
    let allResources = [];
    let evidenceReportResources = [];
    let groupResources = [];
    let evidenceVariableResources = [];
    let evidenceResources = [];
    //let citationResources = [];
    let bundle = {};

    //for (let study in formState.studies) {
    //}

    let population0 = JSON.parse(JSON.stringify(blankGroupResource));
    let population1 = JSON.parse(JSON.stringify(blankGroupResource));
    let population2 = JSON.parse(JSON.stringify(blankGroupResource));
    let population3 = JSON.parse(JSON.stringify(blankGroupResource));
    let exposure1 =  JSON.parse(JSON.stringify(blankEvidenceVariableResource));
    let exposure2 =  JSON.parse(JSON.stringify(blankEvidenceVariableResource));
    
    //Don't forget OUTCOMES, which will be done in each baselinemeasure and outcomemeasure

    let population0ID = (study.title + " participants").replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
    let population1ID = (population.name).replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
    let population2Name = intervention.name.trim() + " Cohort in " + study.title.trim() + " participants";
    let population2ID = population2Name.replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
    let population3Name = comparator.name.trim() + " Cohort in " + study.title.trim() + " participants";
    let population3ID = population3Name.replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');

    let exposure1ID = (intervention.name).replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
    let exposure2ID = (comparator.name).replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');

    population0.id = population0ID;
    population0.name = study.title.trim() + " participants";
    population0.type = "person";
    population0.actual = true;
    //population0.description = "Participants in " + study.title + " study";
    population0.characteristic = [];
    let population0CharacteristicA = {};
    population0CharacteristicA.code = {};
    population0CharacteristicA.code.text = "participation in research study";
    population0CharacteristicA.valueReference = {};
    population0CharacteristicA.valueReference.identifier = {};
    population0CharacteristicA.valueReference.identifier.value = study.identifier.trim();
    population0CharacteristicA.valueReference.display = study.title.trim();
    population0CharacteristicA.exclude = false;
    population0.characteristic.push(population0CharacteristicA);
    if (study.numberOfParticipants.trim() !== "") {
        population0.quantity = parseFloat(study.numberOfParticipants);
    }

    population1.id = population1ID;
    population1.name = population.name.trim();
    population1.type = "person";
    population1.actual = false;
    //population1.description = population.description;
    population1.characteristic = [];
    if (population.agesEligible && population.agesEligible.trim() !== "") {
        let population1CharacteristicA = {};
        population1CharacteristicA.code = {};
        population1CharacteristicA.code.text = "descriptive concept";
        population1CharacteristicA.valueReference = {};
        population1CharacteristicA.valueReference.display = population.agesEligible.trim();
        population1CharacteristicA.exclude = false;
        population1.characteristic.push(population1CharacteristicA);
    }
    if ((population.agesEligibleLow && population.agesEligibleLow.trim() !== "") || (population.agesEligibleHigh && population.agesEligibleHigh !== "")) {
        let population1CharacteristicB = {};
        population1CharacteristicB.code = {};
        population1CharacteristicB.code.coding = [];
        let population1CharacteristicBCoding = {};
        population1CharacteristicBCoding.system = "http://snomed.info/sct";
        population1CharacteristicBCoding.code = "397669002";
        population1CharacteristicBCoding.display = "Age";
        population1CharacteristicB.code.coding.push(population1CharacteristicBCoding);
        population1CharacteristicB.valueRange = {};
        population1CharacteristicB.valueRange.low = {};
        population1CharacteristicB.valueRange.low.value = parseFloat(population.agesEligibleLow.trim());
        const agesEligibleUnits = ucumLookup(population.agesEligibleUnit);
        population1CharacteristicB.valueRange.low.unit = agesEligibleUnits.unit;
        population1CharacteristicB.valueRange.low.system = agesEligibleUnits.system;
        population1CharacteristicB.valueRange.low.code = agesEligibleUnits.code;
        population1CharacteristicB.valueRange.high = {};
        population1CharacteristicB.valueRange.high.value = parseFloat(population.agesEligibleHigh.trim());
        population1CharacteristicB.valueRange.high.unit = agesEligibleUnits.unit;
        population1CharacteristicB.valueRange.high.system = agesEligibleUnits.system;
        population1CharacteristicB.valueRange.high.code = agesEligibleUnits.code;
        population1CharacteristicB.exclude = false;
        population1.characteristic.push(population1CharacteristicB);
    }
    if (population.sexesEligible && population.sexesEligible !== "") {
        let population1CharacteristicC = {};
        population1CharacteristicC.code = {};
        population1CharacteristicC.code.text = "sex";
        population1CharacteristicC.valueCodeableConcept = {};
        population1CharacteristicC.valueCodeableConcept.text = population.sexesEligible;
        population1CharacteristicC.exclude = false;
        population1.characteristic.push(population1CharacteristicC);
    }
    if (population.acceptsHealthy && population.acceptsHealthy.trim() !== "") {
        let population1CharacteristicD = {};
        population1CharacteristicD.code = {};
        population1CharacteristicD.code.text = "specific question";
        population1CharacteristicD.valueCodeableConcept = {};
        population1CharacteristicD.valueCodeableConcept.text = "Accepts Healthy Volunteers";
        population1CharacteristicD.exclude = false;
        if (population.acceptsHealthy.toLowerCase() === "no") {
            population1CharacteristicD.exclude = true;
        }
        population1.characteristic.push(population1CharacteristicD);
    }

    population2.name = population2Name;
    population2.id = population2ID;
    population2.type = "person";
    population2.actual = true;
    population2.characteristic = [];
    let population2CharacteristicA = {};
    population2CharacteristicA.code = {};
    population2CharacteristicA.code.text = "participation in research study";
    population2CharacteristicA.valueReference = {};
    population2CharacteristicA.valueReference.type = "Group";
    population2CharacteristicA.valueReference.identifier = {};
    population2CharacteristicA.valueReference.identifier.value = population0ID;
    population2CharacteristicA.valueReference.display = population0.name;
    population2CharacteristicA.exclude = false;
    population2.characteristic.push(population2CharacteristicA);
    let population2CharacteristicB = {};
    population2CharacteristicB.code = {};
    population2CharacteristicB.code.text = "trial arm";
    population2CharacteristicB.valueReference = {};
    population2CharacteristicB.valueReference.type = "EvidenceVariable";
    population2CharacteristicB.valueReference.identifier = {};
    population2CharacteristicB.valueReference.identifier.value = exposure1ID;
    population2CharacteristicB.valueReference.display = intervention.name.trim();
    population2CharacteristicB.exclude = false;
    population2.characteristic.push(population2CharacteristicB);
    if (formState.exposures[1].baselineMeasureSubjects.trim() !== "") {
        population2.quantity = parseFloat(formState.exposures[1].baselineMeasureSubjects);
    }

    population3.name = population3Name;
    population3.id = population3ID;
    population3.type = "person";
    population3.actual = true;
    population3.characteristic = [];
    let population3CharacteristicA = {};
    population3CharacteristicA.code = {};
    population3CharacteristicA.code.text = "participation in research study";
    population3CharacteristicA.valueReference = {};
    population3CharacteristicA.valueReference.type = "Group";
    population3CharacteristicA.valueReference.identifier = {};
    population3CharacteristicA.valueReference.identifier.value = population0ID;
    population3CharacteristicA.valueReference.display = population0.name;
    population3CharacteristicA.exclude = false;
    population3.characteristic.push(population3CharacteristicA);
    let population3CharacteristicB = {};
    population3CharacteristicB.code = {};
    population3CharacteristicB.code.text = "trial arm";
    population3CharacteristicB.valueReference = {};
    population3CharacteristicB.valueReference.type = "EvidenceVariable";
    population3CharacteristicB.valueReference.identifier = {};
    population3CharacteristicB.valueReference.identifier.value = exposure2ID;
    population3CharacteristicB.valueReference.display = comparator.name.trim();
    population3CharacteristicB.exclude = false;
    population3.characteristic.push(population3CharacteristicB);
    if (formState.exposures[0].baselineMeasureSubjects.trim() !== "") {
        population3.quantity = parseFloat(formState.exposures[0].baselineMeasureSubjects);
    }

    groupResources.push(removeEmptyFields(population0));
    groupResources.push(removeEmptyFields(population1));
    groupResources.push(removeEmptyFields(population2));
    groupResources.push(removeEmptyFields(population3));
    
    exposure1.id = exposure1ID;
    exposure1.name = intervention.name.trim();
    exposure1.actual = true;
    exposure1.description = intervention.description;

    exposure2.id = exposure2ID;
    exposure2.name = comparator.name.trim();
    exposure2.actual = true;
    exposure2.description = comparator.description;

    evidenceVariableResources.push(removeEmptyFields(exposure1));
    evidenceVariableResources.push(removeEmptyFields(exposure2));

    let populationDefinition = JSON.parse(JSON.stringify(blankEvidenceResource.variableDefinition[0]));
    populationDefinition.variableRole.coding[0].system = "http://terminology.hl7.org/CodeSystem/variable-role";
    populationDefinition.variableRole.coding[0].code = "population";
    populationDefinition.variableRole.coding[0].display = "population";
    //populationDefinition.observed.reference = population0ID;
    populationDefinition.observed.identifier = {};
    populationDefinition.observed.type = "Group";
    populationDefinition.observed.identifier.value = population0ID;
    populationDefinition.observed.display = study.title + " participants";
    //populationDefinition.intended.reference = population1ID;
    populationDefinition.intended.identifier = {};
    populationDefinition.intended.type = "Group";
    populationDefinition.intended.identifier.value = population1ID;
    populationDefinition.intended.display = population.name.trim();

    let interventionDefinition = JSON.parse(JSON.stringify(blankEvidenceResource.variableDefinition[0]));
    interventionDefinition.variableRole.coding[0].system = "http://terminology.hl7.org/CodeSystem/variable-role";
    interventionDefinition.variableRole.coding[0].code = "exposure";
    interventionDefinition.variableRole.coding[0].display = "exposure";
    //interventionDefinition.observed.reference = exposure1ID;
    interventionDefinition.observed.identifier = {};
    interventionDefinition.observed.type = "EvidenceVariable";
    interventionDefinition.observed.identifier.value = exposure1ID;
    interventionDefinition.observed.display = intervention.name.trim();

    let subPopulationInterventionDefinition = JSON.parse(JSON.stringify(blankEvidenceResource.variableDefinition[0]));
    subPopulationInterventionDefinition.variableRole.coding[0].system = "http://terminology.hl7.org/CodeSystem/variable-role";
    subPopulationInterventionDefinition.variableRole.coding[0].code = "subpopulation";
    subPopulationInterventionDefinition.variableRole.coding[0].display = "subpopulation";
    subPopulationInterventionDefinition.observed.identifier = {};
    subPopulationInterventionDefinition.observed.type = "Group";
    subPopulationInterventionDefinition.observed.identifier.value = population2ID;    
    subPopulationInterventionDefinition.observed.display = population2Name;

    let comparatorDefinition = JSON.parse(JSON.stringify(blankEvidenceResource.variableDefinition[0]));
    comparatorDefinition.variableRole.coding[0].system = "http://terminology.hl7.org/CodeSystem/variable-role";
    comparatorDefinition.variableRole.coding[0].code = "referenceExposure";
    comparatorDefinition.variableRole.coding[0].display = "reference exposure";
    //comparatorDefinition.observed.reference = exposure2ID;
    comparatorDefinition.observed.identifier = {};
    comparatorDefinition.observed.type = "EvidenceVariable";
    comparatorDefinition.observed.identifier.value = exposure2ID;    
    comparatorDefinition.observed.display = comparator.name.trim();

    let subPopulationComparatorDefinition = JSON.parse(JSON.stringify(blankEvidenceResource.variableDefinition[0]));
    subPopulationComparatorDefinition.variableRole.coding[0].system = "http://terminology.hl7.org/CodeSystem/variable-role";
    subPopulationComparatorDefinition.variableRole.coding[0].code = "subpopulation";
    subPopulationComparatorDefinition.variableRole.coding[0].display = "subpopulation";
    subPopulationComparatorDefinition.observed.identifier = {};
    subPopulationComparatorDefinition.observed.type = "Group";
    subPopulationComparatorDefinition.observed.identifier.value = population3ID;    
    subPopulationComparatorDefinition.observed.display = population3Name;

    
    let evidenceReport =  JSON.parse(JSON.stringify(blankEvidenceReportResource));
    evidenceReport.status = "draft";
    evidenceReport.useContext = [];
    let evidenceReportUseContext = {};
    evidenceReportUseContext.code = {};
    evidenceReportUseContext.code.system = "http://terminology.hl7.org/CodeSystem/usage-context-type";
    evidenceReportUseContext.code.code = "program";
    evidenceReportUseContext.code.display = "Program";
    evidenceReportUseContext.valueCodeableConcept = {};
    evidenceReportUseContext.valueCodeableConcept.text = "Clinical Trial Results Reporter";
    evidenceReport.useContext.push(evidenceReportUseContext);
    evidenceReport.identifier = [];
    //let evidenceReportIdentifer = {};
    //evidenceReportIdentifer.
    //evidenceReport.identifier.push(evidenceReportIdentifer);
    if (study.identifier.trim !== "") {
        evidenceReport.relatedIdentifier = [];
        let evidenceReportRelatedIdentifer = {};
        evidenceReportRelatedIdentifer.system = "https://clinicaltrials.gov";
        evidenceReportRelatedIdentifer.value = study.identifier;
        evidenceReport.relatedIdentifier.push(evidenceReportRelatedIdentifer);
    }
    evidenceReport.title = formState.projectname.trim() + " Evidence Report";
    evidenceReport.date = moment().format("YYYY-MM-DD hh:mm:ss");
    evidenceReport.subject.characteristic = [];
    let subjectCharacteristic1 = {};
    subjectCharacteristic1.code = {};
    subjectCharacteristic1.code.text = "ClinicalTrials.gov entry";
    subjectCharacteristic1.valueReference = {};
    subjectCharacteristic1.valueReference.display = study.identifier;
    evidenceReport.subject.characteristic.push(subjectCharacteristic1);
    let subjectCharacteristic2 = {};
    subjectCharacteristic2.code = {};
    subjectCharacteristic2.code.text = "Study Report Component";
    subjectCharacteristic2.valueReference = {};
    subjectCharacteristic2.valueReference.display = "Results";
    evidenceReport.subject.characteristic.push(subjectCharacteristic2);
    evidenceReport.publisher = "Computable Publishing LLC";
    evidenceReport.contact = [];
    let evidenceReportContact1 = {};
    evidenceReportContact1.name = "Brian S. Alper";
    evidenceReportContact1.telecom = [];
    let evidenceReportTelecom1 = {};
    evidenceReportTelecom1.system = "email";
    evidenceReportTelecom1.value = "support@computablepublishing.com";
    evidenceReportContact1.telecom.push(evidenceReportTelecom1);
    evidenceReport.contact.push(evidenceReportContact1);
    evidenceReport.author = [];
    let evidenceReportContact2 = {};
    evidenceReportContact2.name = "Joanne Dehnbostel";
    evidenceReportContact2.telecom = [];
    let evidenceReportTelecom2 = {};
    evidenceReportTelecom2.system = "email";
    evidenceReportTelecom2.value = "jdehnbostel@computablepublishing.com";
    evidenceReportContact2.telecom.push(evidenceReportTelecom2);
    evidenceReport.author.push(evidenceReportContact2);
    evidenceReport.section = [];
    let evidenceReportSection1 = {};
    evidenceReportSection1.title = "Form Settings";
    evidenceReportSection1.focus = {};
    evidenceReportSection1.focus.text = "form settings";
    evidenceReportSection1.section = [];
    
    let evidenceReportSection1A = makeUnitSection("Unit of Measure dropdown choices", formState.unitOfMeasures);
    let evidenceReportSection1B = makeUnitSection("Unit of Time dropdown choices", formState.unitOfTimeMeasures);

    let evidenceReportSection2 = {};
    evidenceReportSection2.title = "Default quantities";
    evidenceReportSection2.focus = {};
    evidenceReportSection2.focus.text = "Default quantities";
    evidenceReportSection2.section = [];
    let evidenceReportSection2A = {};
    evidenceReportSection2A.title = "Baseline Measures Default Quantities";
    evidenceReportSection2A.focus = {};
    evidenceReportSection2A.focus.text = "Baseline Measures";
    evidenceReportSection2A.section = [];
    let evidenceReportSection2A1 = {};
    evidenceReportSection2A1.title = population2Name;
    evidenceReportSection2A1.focusReference = {};
    evidenceReportSection2A1.focusReference.type =  "Group";
    evidenceReportSection2A1.focusReference.identifier =  {};
    evidenceReportSection2A1.focusReference.identifier.value = population2ID;
    evidenceReportSection2A1.focusReference.display = population2Name;
    evidenceReportSection2A1.entryClassifier = [];
    if (formState.exposures[1].baselineMeasureSubjectsDefault) {
       evidenceReportSection2A1.entryClassifier.push( {"coding": [ {"code": "setAsDefault" }] } );
    }
    if (formState.exposures[1].baselineMeasureSubjects.trim() !== "") {
        evidenceReportSection2A1.entryQuantity = [];
        evidenceReportSection2A1.entryQuantity.push( {"value": parseFloat(formState.exposures[1].baselineMeasureSubjects) } );
    }
    evidenceReportSection2A.section.push(evidenceReportSection2A1);
    let evidenceReportSection2A2 = {};
    evidenceReportSection2A2.title = population3Name;
    evidenceReportSection2A2.focusReference = {};
    evidenceReportSection2A2.focusReference.type = "Group";
    evidenceReportSection2A2.focusReference.identifier = {};
    evidenceReportSection2A2.focusReference.identifier.value = population3ID;
    evidenceReportSection2A2.focusReference.display = population3Name;
    evidenceReportSection2A2.entryClassifier = [];
    if (formState.exposures[0].baselineMeasureSubjectsDefault) {
       evidenceReportSection2A2.entryClassifier.push( {"coding": [ {"code": "setAsDefault" }] } );
    }
    if (formState.exposures[0].baselineMeasureSubjects.trim() !== "") {
        evidenceReportSection2A2.entryQuantity = [];
        evidenceReportSection2A2.entryQuantity.push( {"value": parseFloat(formState.exposures[0].baselineMeasureSubjects) } );
    }
    evidenceReportSection2A.section.push(evidenceReportSection2A2);
    let evidenceReportSection2B = {};
    evidenceReportSection2B.title = "Outcome Measures Default Quantities";
    evidenceReportSection2B.focus = {};
    evidenceReportSection2B.focus.text = "Outcome Measures";
    evidenceReportSection2B.section = [];
    let evidenceReportSection2B1 = {};
    evidenceReportSection2B1.title = population2Name;
    evidenceReportSection2B1.focusReference = {};
    evidenceReportSection2B1.focusReference.type =  "Group";
    evidenceReportSection2B1.focusReference.identifier =  {};
    evidenceReportSection2B1.focusReference.identifier.value =  population2ID;
    evidenceReportSection2B1.focusReference.display =  population2Name;
    evidenceReportSection2B1.entryClassifier = [];
    if (formState.exposures[1].outcomeMeasureSubjectsDefault) {
       evidenceReportSection2B1.entryClassifier.push( {"coding": [ {"code": "setAsDefault" }] } );
    }
    if (formState.exposures[1].outcomeMeasureSubjects.trim() !== "") {
        evidenceReportSection2B1.entryQuantity = [];
        evidenceReportSection2B1.entryQuantity.push( {"value": parseFloat(formState.exposures[1].outcomeMeasureSubjects) } );
    }
    evidenceReportSection2B.section.push(evidenceReportSection2B1);
    let evidenceReportSection2B2 = {};
    evidenceReportSection2B2.title = population3Name;
    evidenceReportSection2B2.focusReference = {};
    evidenceReportSection2B2.focusReference.type =  "Group";
    evidenceReportSection2B2.focusReference.identifier =  {};
    evidenceReportSection2B2.focusReference.identifier.value =  population3ID;
    evidenceReportSection2B2.focusReference.display =  population3Name;
    evidenceReportSection2B2.entryClassifier = [];
    if (formState.exposures[0].outcomeMeasureSubjectsDefault) {
       evidenceReportSection2B2.entryClassifier.push( {"coding": [ {"code": "setAsDefault" }] } );
    }
    if (formState.exposures[0].outcomeMeasureSubjects.trim() !== "") {
        evidenceReportSection2B2.entryQuantity = [];
        evidenceReportSection2B2.entryQuantity.push( {"value": parseFloat(formState.exposures[0].outcomeMeasureSubjects) } );
    }
    evidenceReportSection2B.section.push(evidenceReportSection2B2);

    evidenceReportSection2.section.push(evidenceReportSection2A);
    evidenceReportSection2.section.push(evidenceReportSection2B);

    evidenceReportSection1.section.push(evidenceReportSection1A);
    evidenceReportSection1.section.push(evidenceReportSection1B);
    evidenceReportSection1.section.push(evidenceReportSection2);
    evidenceReport.section.push(evidenceReportSection1);

    
    evidenceReportSection1.focusReference = {};
    evidenceReportSection1.author = [];
    evidenceReportSection1.text = {};
    evidenceReportSection1.mode = "";
    evidenceReportSection1.orderedBy = {};
    evidenceReportSection1.entryClassifier = [];
    evidenceReportSection1.emptyReason = {};

    let evidenceReportSection3 = {};
    evidenceReportSection3.title = "Evidence Variables and Groups";
    evidenceReportSection3.focus = {};
    evidenceReportSection3.focus.text = "Evidence Variables and Groups";
    evidenceReportSection3.section = [];
    let evidenceReportSection3A = {};
    evidenceReportSection3A.title = "Population Identifier";
    evidenceReportSection3A.focus = {};
    evidenceReportSection3A.focus.text = "Population Identifier";
    evidenceReportSection3A.entryReference = [];
    let evidenceReportSection3AEntryReference1 = {};
    evidenceReportSection3AEntryReference1.type = "Group"
    evidenceReportSection3AEntryReference1.identifier =  {};
    evidenceReportSection3AEntryReference1.identifier.value = population0ID;
    evidenceReportSection3AEntryReference1.display = study.title.trim() + " participants";
    evidenceReportSection3A.entryReference.push(evidenceReportSection3AEntryReference1);
    evidenceReportSection3.section.push(evidenceReportSection3A);

    let evidenceReportSection3B = {};
    evidenceReportSection3B.title = "Population Descriptor";
    evidenceReportSection3B.focus = {};
    evidenceReportSection3B.focus.text = "Population Descriptor";
    evidenceReportSection3B.entryReference = [];
    let evidenceReportSection3BEntryReference1 = {};
    evidenceReportSection3BEntryReference1.type = "Group"
    evidenceReportSection3BEntryReference1.identifier =  {};
    evidenceReportSection3BEntryReference1.identifier.value = population1ID;
    evidenceReportSection3BEntryReference1.display = population.name.trim();
    evidenceReportSection3B.entryReference.push(evidenceReportSection3BEntryReference1);
    evidenceReportSection3.section.push(evidenceReportSection3B);

    let evidenceReportSection3C = {};
    evidenceReportSection3C.title = "Sub Populations";
    evidenceReportSection3C.focus = {};
    evidenceReportSection3C.focus.text = "Sub Populations";
    evidenceReportSection3C.section = [];

    let evidenceReportSection3C1 = {};
    evidenceReportSection3C1.title = "Exposures - Trial Arms";
    evidenceReportSection3C1.focus = {};
    evidenceReportSection3C1.focus.text = "Exposures - Trial Arms";
    evidenceReportSection3C1.entryReference = [];
    let evidenceReportSection3C1EntryReference1 = {};
    evidenceReportSection3C1EntryReference1.type = "EvidenceVariable";
    evidenceReportSection3C1EntryReference1.identifier =  {};
    evidenceReportSection3C1EntryReference1.identifier.value = exposure1ID;
    evidenceReportSection3C1EntryReference1.display = intervention.name.trim();
    evidenceReportSection3C1.entryReference.push(evidenceReportSection3C1EntryReference1);
    let evidenceReportSection3C1EntryReference2 = {};
    evidenceReportSection3C1EntryReference2.type = "EvidenceVariable";
    evidenceReportSection3C1EntryReference2.identifier =  {};
    evidenceReportSection3C1EntryReference2.identifier.value = exposure2ID;
    evidenceReportSection3C1EntryReference2.display = comparator.name.trim();
    evidenceReportSection3C1.entryReference.push(evidenceReportSection3C1EntryReference2);
    evidenceReportSection3C.section.push(evidenceReportSection3C1);
    let evidenceReportSection3C2 = {};
    evidenceReportSection3C2.title = "Groups";
    evidenceReportSection3C2.focus = {};
    evidenceReportSection3C2.focus.text = "Groups";
    evidenceReportSection3C2.entryReference = [];
    let evidenceReportSection3C2EntryReference1 = {};
    evidenceReportSection3C2EntryReference1.type = "Group";
    evidenceReportSection3C2EntryReference1.identifier =  {};
    evidenceReportSection3C2EntryReference1.identifier.value = population2ID;
    evidenceReportSection3C2EntryReference1.display = population2Name;
    evidenceReportSection3C2.entryReference.push(evidenceReportSection3C2EntryReference1);
    let evidenceReportSection3C2EntryReference2 = {};
    evidenceReportSection3C2EntryReference2.type = "Group";
    evidenceReportSection3C2EntryReference2.identifier =  {};
    evidenceReportSection3C2EntryReference2.identifier.value = population3ID;
    evidenceReportSection3C2EntryReference2.display = population3Name;
    evidenceReportSection3C2.entryReference.push(evidenceReportSection3C2EntryReference2);
    evidenceReportSection3C.section.push(evidenceReportSection3C2);
    evidenceReportSection3.section.push(evidenceReportSection3C);
    let evidenceReportSection3D = {};
    evidenceReportSection3D.title = "Baseline Measures";
    evidenceReportSection3D.focus = {};
    evidenceReportSection3D.focus.text = "Baseline Measures";
    evidenceReportSection3D.entryReference = [];
    let evidenceReportSection4 = {};
    evidenceReportSection4.title = "Baseline Results";
    evidenceReportSection4.focus = {};
    evidenceReportSection4.focus.text = "Baseline Results";
    evidenceReportSection4.section = [];
    let evidenceReportSection4A = {};
    evidenceReportSection4A.title = intervention.name.trim() + " Baseline Results";
    evidenceReportSection4A.focus = {};
    evidenceReportSection4A.focus.text = intervention.name.trim();
    evidenceReportSection4A.entryReference = [];
    let evidenceReportSection4B = {};
    evidenceReportSection4B.title = comparator.name.trim() + " Baseline Results";
    evidenceReportSection4B.focus = {};
    evidenceReportSection4B.focus.text = comparator.name.trim();
    evidenceReportSection4B.entryReference = [];
    let evidenceReportSection4C = {};
    evidenceReportSection4C.title = "Total Population Baseline Results";
    evidenceReportSection4C.focus = {};
    evidenceReportSection4C.focus.text = study.title.trim() + " participants";
    evidenceReportSection4C.entryReference = [];
    let evidenceReportSection5 = {};
    evidenceReportSection5.title = "Outcome Results";
    evidenceReportSection5.focus = {};
    evidenceReportSection5.focus.text = "Outcome Results";
    evidenceReportSection5.section = [];
    let evidenceReportSection5A = {};
    evidenceReportSection5A.title = intervention.name.trim() + " Outcome Results";
    evidenceReportSection5A.focus = {};
    evidenceReportSection5A.focus.text = intervention.name.trim();
    evidenceReportSection5A.entryReference = [];
    let evidenceReportSection5B = {};
    evidenceReportSection5B.title = comparator.name.trim() + " Outcome Results";
    evidenceReportSection5B.focus = {};
    evidenceReportSection5B.focus.text = comparator.name.trim();
    evidenceReportSection5B.entryReference = [];
    let evidenceReportSection5C = {};
    evidenceReportSection5C.title = intervention.name.trim() + " vs. " + comparator.name.trim() + " Outcome Results";
    evidenceReportSection5C.focus = {};
    evidenceReportSection5C.focus.text = intervention.name.trim() + " vs. " + comparator.name.trim();
    evidenceReportSection5C.entryReference = [];

    formState.baselineMeasures.forEach((baselineMeasure, index) => {
        let evidence1 = JSON.parse(JSON.stringify(blankEvidenceResource));
        let evidence2 = JSON.parse(JSON.stringify(blankEvidenceResource));
        let evidence3 = JSON.parse(JSON.stringify(blankEvidenceResource));
        let blankVariableDefinition = JSON.parse(JSON.stringify(blankEvidenceResource.variableDefinition[0]));
        evidence1.variableDefinition = [];
        evidence2.variableDefinition = [];
        evidence3.variableDefinition = [];
        let blankStatistic = JSON.parse(JSON.stringify(blankEvidenceResource.statistic[0]));
        blankStatistic.attributeEstimate = [];
        evidence1.statistic = [];
        evidence2.statistic = [];
        evidence3.statistic = [];
        let blankAttributeEstimate = JSON.parse(JSON.stringify(blankEvidenceResource.statistic[0].attributeEstimate[0]));

        let outcomeName = baselineMeasure.outcome.name.trim();
        let outcomeDescription = baselineMeasure.outcome.description.trim();

        //let outcomeTimeFromStart = 0;
        //let outcomeTimeFromStartUnits = "";

        let evidence1Name = outcomeName+" for "+intervention.name.trim()+" Cohort in "+study.title;
        let evidence1ID = evidence1Name.replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
        let evidence2Name = outcomeName+" for "+comparator.name.trim()+" Cohort in "+study.title;
        let evidence2ID = evidence2Name.replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
        let evidence3Name = outcomeName+" for "+study.title;
        let evidence3ID = evidence3Name.replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');

        evidence1.id = evidence1ID;
        evidence1.title = evidence1Name;
        evidence1.status = "draft";
        evidence2.id = evidence2ID;
        evidence2.title = evidence2Name;
        evidence2.status = "draft";
        evidence3.id = evidence3ID;
        evidence3.title = evidence3Name;
        evidence3.status = "draft";

        evidence1.variableDefinition.push(populationDefinition);
        evidence1.variableDefinition.push(subPopulationInterventionDefinition);
        
        evidence2.variableDefinition.push(populationDefinition);
        //let comparatorDefinition2 = JSON.parse(JSON.stringify(comparatorDefinition));
        //comparatorDefinition2.variableRole.coding[0].code = "exposure";
        //comparatorDefinition2.variableRole.coding[0].display = "exposure";
        //evidence2.variableDefinition.push(comparatorDefinition2);
        evidence2.variableDefinition.push(subPopulationComparatorDefinition);

        evidence3.variableDefinition.push(populationDefinition);

        let outcomeEvidenceVariable = JSON.parse(JSON.stringify(blankEvidenceVariableResource));
        let outcomeEvidenceVariableID = (outcomeName).replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
    
        let evidenceReportSection3DEntryReference1 = {};
        evidenceReportSection3DEntryReference1.type = "EvidenceVariable"
        evidenceReportSection3DEntryReference1.identifier =  {};
        evidenceReportSection3DEntryReference1.identifier.value = outcomeEvidenceVariableID;
        evidenceReportSection3DEntryReference1.display = outcomeName;
        evidenceReportSection3D.entryReference.push(evidenceReportSection3DEntryReference1);
        let evidenceReportSection4AEntryReference1 = {};
        evidenceReportSection4AEntryReference1.type = "Evidence"
        evidenceReportSection4AEntryReference1.identifier =  {};
        evidenceReportSection4AEntryReference1.identifier.value = evidence1ID;
        evidenceReportSection4AEntryReference1.display = evidence1Name;
        evidenceReportSection4A.entryReference.push(evidenceReportSection4AEntryReference1);
        let evidenceReportSection4BEntryReference2 = {};
        evidenceReportSection4BEntryReference2.type = "Evidence"
        evidenceReportSection4BEntryReference2.identifier =  {};
        evidenceReportSection4BEntryReference2.identifier.value = evidence2ID;
        evidenceReportSection4BEntryReference2.display = evidence2Name;
        evidenceReportSection4B.entryReference.push(evidenceReportSection4BEntryReference2);
        let evidenceReportSection4CEntryReference3 = {};
        evidenceReportSection4CEntryReference3.type = "Evidence"
        evidenceReportSection4CEntryReference3.identifier =  {};
        evidenceReportSection4CEntryReference3.identifier.value = evidence3ID;
        evidenceReportSection4CEntryReference3.display = evidence3Name;
        evidenceReportSection4C.entryReference.push(evidenceReportSection4CEntryReference3); 

        outcomeEvidenceVariable.id = outcomeEvidenceVariableID;
        outcomeEvidenceVariable.name = outcomeName;
        outcomeEvidenceVariable.actual = true;
        outcomeEvidenceVariable.description = outcomeDescription;
        if (baselineMeasure.outcome.dichotomous) {
            outcomeEvidenceVariable.handling = "dichotomous";
        } else {
            outcomeEvidenceVariable.handling = "continuous";
        }
    
        evidenceVariableResources.push(removeEmptyFields(outcomeEvidenceVariable));

        let outcomeDefinition = JSON.parse(JSON.stringify(blankVariableDefinition));
        outcomeDefinition.variableRole.coding[0].system = "http://terminology.hl7.org/CodeSystem/variable-role";
        outcomeDefinition.variableRole.coding[0].code = "measuredVariable";
        outcomeDefinition.variableRole.coding[0].display = "measured variable";
        //outcomeDefinition.observed.reference = outcomeEvidenceVariableID;
        outcomeDefinition.observed.identifier = {}
        outcomeDefinition.observed.identifier.value = outcomeEvidenceVariableID;
        outcomeDefinition.observed.type = "EvidenceVariable";
        outcomeDefinition.observed.display = outcomeName;
        evidence1.variableDefinition.push(outcomeDefinition);
        evidence2.variableDefinition.push(outcomeDefinition);
        evidence3.variableDefinition.push(outcomeDefinition);

        evidence1.studyType.coding[0].system = "http://terminology.hl7.org/CodeSystem/study-type";
        evidence1.studyType.coding[0].code = studyTypes[study.type][0];
        evidence1.studyType.coding[0].display = studyTypes[study.type][1];
        evidence2.studyType.coding[0].system = "http://terminology.hl7.org/CodeSystem/study-type";
        evidence2.studyType.coding[0].code = studyTypes[study.type][0];
        evidence2.studyType.coding[0].display = studyTypes[study.type][1];
        evidence3.studyType.coding[0].system = "http://terminology.hl7.org/CodeSystem/study-type";
        evidence3.studyType.coding[0].code = studyTypes[study.type][0];
        evidence3.studyType.coding[0].display = studyTypes[study.type][1];

        let interventionData = baselineMeasure.trialArms[1];
        let comparatorData = baselineMeasure.trialArms[0];

        let statistic1 = JSON.parse(JSON.stringify(blankStatistic));
        statistic1.statisticType.coding[0].system = "http://terminology.hl7.org/CodeSystem/statistic-type";
        let statistic2 = JSON.parse(JSON.stringify(blankStatistic));
        statistic2.statisticType.coding[0].system = "http://terminology.hl7.org/CodeSystem/statistic-type";
        let statistic3 = JSON.parse(JSON.stringify(blankStatistic));
        statistic3.statisticType.coding[0].system = "http://terminology.hl7.org/CodeSystem/statistic-type";

        if (interventionData.denominator && interventionData.denominator !== "" ) {
            statistic1.sampleSize.knownDataCount = parseInt(interventionData.denominator);
        }

        if (comparatorData.denominator && comparatorData.denominator !== "") {
            statistic2.sampleSize.knownDataCount = parseInt(comparatorData.denominator);
        }

        if (interventionData.denominator &&  comparatorData.denominator !== "") {
            statistic3.sampleSize.knownDataCount = parseInt(interventionData.denominator) + parseInt(comparatorData.denominator);
        }

        if (baselineMeasure.outcome.dichotomous) {

            if (interventionData.numerator && interventionData.numerator !== "" ) {
                statistic1.numberOfEvents = parseInt(interventionData.numerator);
            }
    
            if (comparatorData.numerator && comparatorData.numerator !== "") {
                statistic2.numberOfEvents = parseInt(comparatorData.numerator);
            }

            if (interventionData.numerator !== "" && comparatorData.numerator !== "") {
                statistic3.numberOfEvents = parseInt(interventionData.numerator) + parseInt(comparatorData.numerator);
            }

            //PROPORTION
            statistic1.statisticType.coding[0].code = "C44256";
            statistic1.statisticType.coding[0].display = "Proportion";
            statistic2.statisticType.coding[0].code = "C44256";
            statistic2.statisticType.coding[0].display = "Proportion";
            statistic3.statisticType.coding[0].code = "C44256";
            statistic3.statisticType.coding[0].display = "Proportion"

            let allRequiredData = 0;

            if (interventionData.numerator !== "" && interventionData.denominator !== "") {
                statistic1.quantity = {};
                statistic1.quantity.value = (parseInt(interventionData.numerator)/parseInt(interventionData.denominator));
                allRequiredData += 1;
            }

            if (comparatorData.numerator !== "" && comparatorData.denominator !== "") {
                statistic2.quantity = {};
                statistic2.quantity.value = (parseInt(comparatorData.numerator)/parseInt(comparatorData.denominator));
                allRequiredData += 1;
            }
            
            if (allRequiredData === 2) {
                statistic3.quantity = {};
                statistic3.quantity.value = ((parseInt(interventionData.numerator)+parseInt(comparatorData.numerator))/(parseInt(interventionData.denominator)+parseInt(comparatorData.denominator)));
                allRequiredData += 1;
            }

        } else {

            const outcomeUnits = ucumLookup(baselineMeasure.outcome.unitOfMeasure);

            if (baselineMeasure.outcome.mean) {
                if (interventionData.mean !== "") {
                    statistic1.statisticType.coding[0].code = "C53319";
                    statistic1.statisticType.coding[0].display = "Mean";
                    statistic1.quantity = {};
                    statistic1.quantity.value = parseFloat(interventionData.mean);
                    statistic1.quantity.unit = outcomeUnits.unit;
                    statistic1.quantity.system = outcomeUnits.system;
                    statistic1.quantity.code = outcomeUnits.code;
                }
                if (comparatorData.mean !== "") {
                    statistic2.statisticType.coding[0].code = "C53319";
                    statistic2.statisticType.coding[0].display = "Mean";
                    statistic2.quantity = {};
                    statistic2.quantity.value = parseFloat(comparatorData.mean);
                    statistic2.quantity.unit = outcomeUnits.unit;
                    statistic2.quantity.system = outcomeUnits.system;
                    statistic2.quantity.code = outcomeUnits.code;
                }
                if (interventionData.mean !== "" && comparatorData.mean !== "" && interventionData.denominator !== "" && comparatorData.denominator !== "") {
                    statistic3.statisticType.coding[0].code = "C53319";
                    statistic3.statisticType.coding[0].display = "Mean";
                    statistic3.quantity = {};
                    statistic3.quantity.value = ((parseFloat(interventionData.mean)*parseFloat(interventionData.denominator)) + (parseFloat(comparatorData.mean)*parseFloat(comparatorData.denominator)))/(parseFloat(interventionData.denominator)+parseFloat(comparatorData.denominator));
                    statistic3.quantity.unit = outcomeUnits.unit;
                    statistic3.quantity.system = outcomeUnits.system;
                    statistic3.quantity.code = outcomeUnits.code;
                }
            } else {
                if (interventionData.median !== "") {
                    statistic1.statisticType.coding[0].code = "C28007";
                    statistic1.statisticType.coding[0].display = "Median";
                    statistic1.quantity = {};
                    statistic1.quantity.value = parseFloat(interventionData.median);
                    statistic1.quantity.unit = outcomeUnits.unit;
                    statistic1.quantity.system = outcomeUnits.system;
                    statistic1.quantity.code = outcomeUnits.code;
                }
                if (comparatorData.median !== "") {
                    statistic2.statisticType.coding[0].code = "C28007";
                    statistic2.statisticType.coding[0].display = "Median";
                    statistic2.quantity = {};
                    statistic2.quantity.value = parseFloat(comparatorData.median);
                    statistic2.quantity.unit = outcomeUnits.unit;
                    statistic2.quantity.system = outcomeUnits.system;
                    statistic2.quantity.code = outcomeUnits.code;
                }
                if (baselineMeasure.outcome.median && baselineMeasure.outcome.median !== "") {
                    statistic3.statisticType.coding[0].code = "C28007";
                    statistic3.statisticType.coding[0].display = "Median";
                    statistic3.quantity = {};
                    statistic3.quantity.value = parseFloat(baselineMeasure.outcome.median);
                    statistic3.quantity.unit = outcomeUnits.unit;
                    statistic3.quantity.system = outcomeUnits.system;
                    statistic3.quantity.code = outcomeUnits.code;
                }
            }

            let attributeEstimate1 = JSON.parse(JSON.stringify(blankAttributeEstimate));
            let attributeEstimate2 = JSON.parse(JSON.stringify(blankAttributeEstimate));
            let attributeEstimate3 = JSON.parse(JSON.stringify(blankAttributeEstimate));

            let attributeFound1 = false;
            let attributeFound2 = false;
            let attributeFound3 = false;
            let ciValueLow = true;
            let ciValueHigh = true;

            if (baselineMeasure.outcome.attribute === "sd") {
                if (interventionData.sd !== "") {
                    attributeEstimate1.quantity.value = parseFloat(interventionData.sd);
                    attributeEstimate1.quantity.unit = outcomeUnits.unit;
                    attributeEstimate1.quantity.system = outcomeUnits.system;
                    attributeEstimate1.quantity.code = outcomeUnits.code;
                    attributeFound1 = true;
                }
                if (comparatorData.sd !== "") {
                    attributeEstimate2.quantity.value = parseFloat(comparatorData.sd);
                    attributeEstimate2.quantity.unit = outcomeUnits.unit;
                    attributeEstimate2.quantity.system = outcomeUnits.system;
                    attributeEstimate2.quantity.code = outcomeUnits.code;
                    attributeFound2 = true;
                }
                if (interventionData.sd !== "" && comparatorData.sd !== "" && interventionData.denominator !== "" && comparatorData.denominator !== "") {
                    //attributeEstimate3.quantity.value = (((parseFloat(interventionData.sd)*parseFloat(interventionData.denominator)) + (parseFloat(comparatorData.sd)*parseFloat(comparatorData.denominator)))/(parseFloat(interventionData.denominator)+parseFloat(comparatorData.denominator)));
                    attributeEstimate3.quantity.value = Math.sqrt((((parseFloat(interventionData.denominator)-1) * Math.pow(parseFloat(interventionData.sd), 2))+((parseFloat(comparatorData.denominator)-1) * Math.pow(parseFloat(comparatorData.sd), 2)))/(parseFloat(interventionData.denominator)+parseFloat(comparatorData.denominator)-2));
                    attributeEstimate3.quantity.unit = outcomeUnits.unit;
                    attributeEstimate3.quantity.system = outcomeUnits.system;
                    attributeEstimate3.quantity.code = outcomeUnits.code;
                    attributeFound3 = true;
                }
            } else if (baselineMeasure.outcome.attribute === "range") {
                if (interventionData.rangeLow !== "") {
                    attributeEstimate1.range.low = {};
                    attributeEstimate1.range.low.value = parseFloat(interventionData.rangeLow);
                    attributeEstimate1.range.low.unit = outcomeUnits.unit;
                    attributeEstimate1.range.low.system = outcomeUnits.system;
                    attributeEstimate1.range.low.code = outcomeUnits.code;
                    attributeFound1 = true;
                }
                if (interventionData.rangeHigh !== "") {
                    attributeEstimate1.range.high = {};
                    attributeEstimate1.range.high.value = parseFloat(interventionData.rangeHigh);
                    attributeEstimate1.range.high.unit = outcomeUnits.unit;
                    attributeEstimate1.range.high.system = outcomeUnits.system;
                    attributeEstimate1.range.high.code = outcomeUnits.code;
                    attributeFound1 = true;
                }
                if (comparatorData.rangeLow !== "") {
                    attributeEstimate2.range.low = {};
                    attributeEstimate2.range.low.value = parseFloat(comparatorData.rangeLow);
                    attributeEstimate2.range.low.unit = outcomeUnits.unit;
                    attributeEstimate2.range.low.system = outcomeUnits.system;
                    attributeEstimate2.range.low.code = outcomeUnits.code;
                    attributeFound2 = true;
                }
                if (comparatorData.rangeHigh !== "") {
                    attributeEstimate2.range.high = {};
                    attributeEstimate2.range.high.value = parseFloat(comparatorData.rangeHigh);
                    attributeEstimate2.range.high.unit = outcomeUnits.unit;
                    attributeEstimate2.range.high.system = outcomeUnits.system;
                    attributeEstimate2.range.high.code = outcomeUnits.code;
                    attributeFound2 = true;
                }
                if (interventionData.rangeLow !== "" || comparatorData.rangeLow !== "") {
                    attributeEstimate3.range.low = {};
                    attributeEstimate3.range.low.value = getLowestValue(interventionData.rangeLow, comparatorData.rangeLow);
                    attributeEstimate3.range.low.unit = outcomeUnits.unit;
                    attributeEstimate3.range.low.system = outcomeUnits.system;
                    attributeEstimate3.range.low.code = outcomeUnits.code;
                    attributeFound3 = true;
                }
                if (interventionData.rangeHigh !== "" || comparatorData.rangeHigh !== "") {
                    attributeEstimate3.range.high = {};
                    attributeEstimate3.range.high.value = getHighestValue(interventionData.rangeHigh, comparatorData.rangeHigh);
                    attributeEstimate3.range.high.unit = outcomeUnits.unit;
                    attributeEstimate3.range.high.system = outcomeUnits.system;
                    attributeEstimate3.range.high.code = outcomeUnits.code;
                    attributeFound3 = true;
                }
            } else if (baselineMeasure.outcome.attribute === "iqr") {
                if (interventionData.iqrLow !== "") {
                    attributeEstimate1.range.low = {};
                    attributeEstimate1.range.low.value = parseFloat(interventionData.iqrLow);
                    attributeEstimate1.range.low.unit = outcomeUnits.unit;
                    attributeEstimate1.range.low.system = outcomeUnits.system;
                    attributeEstimate1.range.low.code = outcomeUnits.code;
                    attributeFound1 = true;
                }
                if (interventionData.iqrHigh !== "") {
                    attributeEstimate1.range.high = {};
                    attributeEstimate1.range.high.value = parseFloat(interventionData.iqrHigh);
                    attributeEstimate1.range.high.unit = outcomeUnits.unit;
                    attributeEstimate1.range.high.system = outcomeUnits.system;
                    attributeEstimate1.range.high.code = outcomeUnits.code;
                    attributeFound1 = true;
                }
                if (comparatorData.iqrLow !== "") {
                    attributeEstimate2.range.low = {};
                    attributeEstimate2.range.low.value =  parseFloat(comparatorData.iqrLow);
                    attributeEstimate2.range.low.unit = outcomeUnits.unit;
                    attributeEstimate2.range.low.system = outcomeUnits.system;
                    attributeEstimate2.range.low.code = outcomeUnits.code;
                    attributeFound2 = true;
                }
                if (comparatorData.iqrHigh !== "") {
                    attributeEstimate2.range.high = {};
                    attributeEstimate2.range.high.value = parseFloat(comparatorData.iqrHigh);
                    attributeEstimate2.range.high.unit = outcomeUnits.unit;
                    attributeEstimate2.range.high.system = outcomeUnits.system;
                    attributeEstimate2.range.high.code = outcomeUnits.code;
                    attributeFound2 = true;
                }
                if (interventionData.iqrLow !== "" || comparatorData.iqrLow !== "") {
                    attributeEstimate3.range.low = {};
                    attributeEstimate3.range.low.value =  getLowestValue(interventionData.iqrLow, comparatorData.iqrLow);
                    attributeEstimate3.range.low.unit = outcomeUnits.unit;
                    attributeEstimate3.range.low.system = outcomeUnits.system;
                    attributeEstimate3.range.low.code = outcomeUnits.code;
                    attributeFound3 = true;
                }
                if (interventionData.iqrHigh !== "" || comparatorData.iqrHigh !== "") {
                    attributeEstimate3.range.high = {};
                    attributeEstimate3.range.high.value = getHighestValue(interventionData.iqrHigh, comparatorData.iqrHigh);
                    attributeEstimate3.range.high.unit = outcomeUnits.unit;
                    attributeEstimate3.range.high.system = outcomeUnits.system;
                    attributeEstimate3.range.high.code = outcomeUnits.code;
                    attributeFound3 = true;
                }
            } else if (baselineMeasure.outcome.attribute === "ci") {
                if (interventionData.ciLow !== "") {
                    attributeEstimate1.range.low = {};
                    attributeEstimate1.range.low.value = parseFloat(interventionData.ciLow);
                    attributeEstimate1.range.low.unit = outcomeUnits.unit;
                    attributeEstimate1.range.low.system = outcomeUnits.system;
                    attributeEstimate1.range.low.code = outcomeUnits.code;
                    attributeFound1 = true;
                }
                if (interventionData.ciHigh !== "") {
                    attributeEstimate1.range.high = {};
                    attributeEstimate1.range.high.value = parseFloat(interventionData.ciHigh);
                    attributeEstimate1.range.high.unit = outcomeUnits.unit;
                    attributeEstimate1.range.high.system = outcomeUnits.system;
                    attributeEstimate1.range.high.code = outcomeUnits.code;
                    attributeFound1 = true;
                }
                if (comparatorData.ciLow !== "") {
                    attributeEstimate2.range.low = {};
                    attributeEstimate2.range.low.value = parseFloat(comparatorData.ciLow);
                    attributeEstimate2.range.low.unit = outcomeUnits.unit;
                    attributeEstimate2.range.low.system = outcomeUnits.system;
                    attributeEstimate2.range.low.code = outcomeUnits.code;
                    attributeFound2 = true;
                }
                if (comparatorData.ciHigh !== "") {
                    attributeEstimate2.range.high = {};
                    attributeEstimate2.range.high.value = parseFloat(comparatorData.ciHigh);
                    attributeEstimate2.range.high.unit = outcomeUnits.unit;
                    attributeEstimate2.range.high.system = outcomeUnits.system;
                    attributeEstimate2.range.high.code = outcomeUnits.code;
                    attributeFound2 = true;
                }
                if (baselineMeasure.outcome.ciLow && baselineMeasure.outcome.ciLow !== "") {
                    attributeEstimate3.range.low = {};
                    ciValueLow = parseFloat(baselineMeasure.outcome.ciLow);
                    if (ciValueLow !== null) {
                        attributeEstimate3.range.low.value = ciValueLow;
                        attributeEstimate3.range.low.unit = outcomeUnits.unit;
                        attributeEstimate3.range.low.system = outcomeUnits.system;
                        attributeEstimate3.range.low.code = outcomeUnits.code;
                        attributeFound3 = true;
                        ciValueLow = true;
                    } else {
                        ciValueLow = null;
                    }
                }
                if (baselineMeasure.outcome.ciHigh && baselineMeasure.outcome.ciHigh !== "") {
                    attributeEstimate3.range.high = {};
                    ciValueHigh =  parseFloat(baselineMeasure.outcome.ciHigh);
                    if (ciValueHigh !== null) {
                        attributeEstimate3.range.high.value = ciValueHigh;
                        attributeEstimate3.range.high.unit = outcomeUnits.unit;
                        attributeEstimate3.range.high.system = outcomeUnits.system;
                        attributeEstimate3.range.high.code = outcomeUnits.code;
                        attributeFound3 = true;
                        ciValueHigh = true;
                    } else {
                        ciValueHigh = null;
                    }
                }
                if (attributeFound1) {
                    attributeEstimate1.level = 0.95;
                }
                if (attributeFound2) {
                    attributeEstimate2.level = 0.95;
                }
                if (attributeFound3 && (ciValueLow !== null || ciValueHigh !== null)) {
                    attributeEstimate3.level = 0.95;
                }
            }
            if (attributeFound1) {
                attributeEstimate1.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                attributeEstimate1.type.coding[0].code = statisticAttributeTypes[baselineMeasure.outcome.attribute][0];
                attributeEstimate1.type.coding[0].display = statisticAttributeTypes[baselineMeasure.outcome.attribute][1];
            }
            if (attributeFound2) {
                attributeEstimate2.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                attributeEstimate2.type.coding[0].code = statisticAttributeTypes[baselineMeasure.outcome.attribute][0];
                attributeEstimate2.type.coding[0].display = statisticAttributeTypes[baselineMeasure.outcome.attribute][1];
            }
            if (attributeFound3 && (ciValueLow !== null || ciValueHigh !== null)) {
                attributeEstimate3.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                attributeEstimate3.type.coding[0].code = statisticAttributeTypes[baselineMeasure.outcome.attribute][0];
                attributeEstimate3.type.coding[0].display = statisticAttributeTypes[baselineMeasure.outcome.attribute][1];
            }

            statistic1.attributeEstimate.push(attributeEstimate1);
            statistic2.attributeEstimate.push(attributeEstimate2);
            statistic3.attributeEstimate.push(attributeEstimate3);
        }


        evidence1.statistic.push(statistic1);
        evidence2.statistic.push(statistic2);
        evidence3.statistic.push(statistic3);

        evidence1 = removeEmptyFields(evidence1);
        evidenceResources.push(evidence1);
        evidence2 = removeEmptyFields(evidence2);
        evidenceResources.push(evidence2);
        evidence3 = removeEmptyFields(evidence3);
        evidenceResources.push(evidence3);

    });

    evidenceReportSection3.section.push(evidenceReportSection3D);
    evidenceReportSection4.section.push(evidenceReportSection4A);
    evidenceReportSection4.section.push(evidenceReportSection4B);
    evidenceReportSection4.section.push(evidenceReportSection4C);

    let evidenceReportSection3E = {};
    evidenceReportSection3E.title = "Outcome Measures";
    evidenceReportSection3E.focus = {};
    evidenceReportSection3E.focus.text = "Outcome Measures";
    evidenceReportSection3E.entryReference = [];

    formState.outcomeMeasures.forEach((outcomeMeasure, index) => {
        let evidence1 = JSON.parse(JSON.stringify(blankEvidenceResource));
        let evidence2 = JSON.parse(JSON.stringify(blankEvidenceResource));
        let evidence = JSON.parse(JSON.stringify(blankEvidenceResource));
        let blankVariableDefinition = JSON.parse(JSON.stringify(blankEvidenceResource.variableDefinition[0]));
        evidence1.variableDefinition = [];
        evidence2.variableDefinition = [];
        evidence.variableDefinition = [];
        let blankStatistic = JSON.parse(JSON.stringify(blankEvidenceResource.statistic[0]));
        blankStatistic.attributeEstimate = [];
        evidence1.statistic = [];
        evidence2.statistic = [];
        evidence.statistic = [];
        let blankAttributeEstimate = JSON.parse(JSON.stringify(blankEvidenceResource.statistic[0].attributeEstimate[0]));

        let outcomeName = outcomeMeasure.outcome.name.replaceAll('  ', ' ').trim();
        let outcomeDescription = outcomeMeasure.outcome.description.trim();
        let outcomeTimeFromStart = "";
        let outcomeTimeFromStartUnits = "";

        if (outcomeMeasure.outcome.timeOfMeasurement) {
            outcomeTimeFromStart = outcomeMeasure.outcome.timeOfMeasurement;
        }
        if (outcomeMeasure.outcome.timeOfUnit) {
            outcomeTimeFromStartUnits = outcomeMeasure.outcome.timeOfUnit.trim();
        }
        
        if (outcomeTimeFromStart && outcomeTimeFromStart !== "") {
            outcomeName = (outcomeName + " time from start " + outcomeTimeFromStart + " " + outcomeTimeFromStartUnits).replaceAll('  ', ' ');
        }

        let evidence1Name = outcomeName+" for "+intervention.name.trim()+" Cohort in "+study.title;
        let evidence1ID = evidence1Name.replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
        let evidence2Name = outcomeName+" for "+comparator.name.trim()+" Cohort in "+study.title;
        let evidence2ID = evidence2Name.replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
        let evidenceName = outcomeName+" for "+intervention.name.trim()+" vs "+comparator.name.trim()+" in "+study.title;
        let evidenceID = evidenceName.replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');

        evidence1.id = evidence1ID;
        evidence1.title = evidence1Name;
        evidence1.status = "draft";
        evidence2.id = evidence2ID;
        evidence2.title = evidence2Name;
        evidence2.status = "draft";

        evidence.id = evidenceID;
        evidence.title = evidenceName;
        evidence.status = "draft";

        evidence1.variableDefinition.push(populationDefinition);
        evidence1.variableDefinition.push(subPopulationInterventionDefinition);
        
        evidence2.variableDefinition.push(populationDefinition);
        //let comparatorDefinition2 = JSON.parse(JSON.stringify(comparatorDefinition));
        //comparatorDefinition2.variableRole.coding[0].code = "exposure";
        //comparatorDefinition2.variableRole.coding[0].display = "exposure";
        //evidence2.variableDefinition.push(comparatorDefinition2);
        evidence2.variableDefinition.push(subPopulationComparatorDefinition);

        evidence.variableDefinition.push(JSON.parse(JSON.stringify(populationDefinition)));
        evidence.variableDefinition.push(JSON.parse(JSON.stringify(interventionDefinition)));
        evidence.variableDefinition.push(JSON.parse(JSON.stringify(comparatorDefinition)));

        let outcomeEvidenceVariable = JSON.parse(JSON.stringify(blankEvidenceVariableResource));
        let outcomeEvidenceVariableID = (outcomeName).replace(/[\W_]+/g, " ").trim().replace(/\s+/g, '-').replaceAll('--', '-');
    
        let evidenceReportSection3EEntryReference1 = {};
        evidenceReportSection3EEntryReference1.type = "EvidenceVariable"
        evidenceReportSection3EEntryReference1.identifier =  {};
        evidenceReportSection3EEntryReference1.identifier.value = outcomeEvidenceVariableID;
        evidenceReportSection3EEntryReference1.display = outcomeName;
        evidenceReportSection3E.entryReference.push(evidenceReportSection3EEntryReference1);
        let evidenceReportSection5AEntryReference1 = {};
        evidenceReportSection5AEntryReference1.type = "Evidence"
        evidenceReportSection5AEntryReference1.identifier =  {};
        evidenceReportSection5AEntryReference1.identifier.value = evidence1ID;
        evidenceReportSection5AEntryReference1.display = evidence1Name;
        evidenceReportSection5A.entryReference.push(evidenceReportSection5AEntryReference1);
        let evidenceReportSection5BEntryReference2 = {};
        evidenceReportSection5BEntryReference2.type = "Evidence"
        evidenceReportSection5BEntryReference2.identifier =  {};
        evidenceReportSection5BEntryReference2.identifier.value = evidence2ID;
        evidenceReportSection5BEntryReference2.display = evidence2Name;
        evidenceReportSection5B.entryReference.push(evidenceReportSection5BEntryReference2);
        let evidenceReportSection5CEntryReference3 = {};
        evidenceReportSection5CEntryReference3.type = "Evidence"
        evidenceReportSection5CEntryReference3.identifier =  {};
        evidenceReportSection5CEntryReference3.identifier.value = evidenceID;
        evidenceReportSection5CEntryReference3.display = evidenceName;
        evidenceReportSection5C.entryReference.push(evidenceReportSection5CEntryReference3);

        outcomeEvidenceVariable.id = outcomeEvidenceVariableID;
        outcomeEvidenceVariable.name = outcomeName;
        outcomeEvidenceVariable.actual = true;
        outcomeEvidenceVariable.description = outcomeDescription;
        if (outcomeMeasure.outcome.dichotomous) {
            outcomeEvidenceVariable.handling = "dichotomous";
        } else {
            outcomeEvidenceVariable.handling = "continuous";
        }
        if (outcomeMeasure.outcome.timeOfMeasurement !== "") {
            outcomeEvidenceVariable.characteristic = [];
            let outcomeCharacteristic = {};
            outcomeCharacteristic.definitionCodeableConcept = {};
            //outcomeCharacteristic.definitionCodeableConcept.text = "placeholder description for characteristic";'
            let timeOfUnit = outcomeMeasure.outcome.timeOfUnit;
            if (timeOfUnit) {
            } else {
                timeOfUnit = "";
            }
            outcomeCharacteristic.definitionCodeableConcept.text = ("time of measurement at " + outcomeMeasure.outcome.timeOfMeasurement.toString() + " " + timeOfUnit).trim();
            outcomeCharacteristic.timeFromStart = {};
            outcomeCharacteristic.timeFromStart.quantity = {};
            outcomeCharacteristic.timeFromStart.quantity.value = parseFloat(outcomeMeasure.outcome.timeOfMeasurement);
            
            const timeFromStartUnits = ucumLookup(timeOfUnit);
            outcomeCharacteristic.timeFromStart.quantity.unit = timeFromStartUnits.unit;
            outcomeCharacteristic.timeFromStart.quantity.system = timeFromStartUnits.system;
            outcomeCharacteristic.timeFromStart.quantity.code = timeFromStartUnits.code;

            outcomeEvidenceVariable.characteristic.push(outcomeCharacteristic);
        }
    
        evidenceVariableResources.push(removeEmptyFields(outcomeEvidenceVariable));

        let outcomeDefinition = JSON.parse(JSON.stringify(blankVariableDefinition));
        outcomeDefinition.variableRole.coding[0].system = "http://terminology.hl7.org/CodeSystem/variable-role";
        outcomeDefinition.variableRole.coding[0].code = "measuredVariable";
        outcomeDefinition.variableRole.coding[0].display = "measured variable";
        //outcomeDefinition.observed.reference = outcomeEvidenceVariableID;
        outcomeDefinition.observed.identifier = {}
        outcomeDefinition.observed.identifier.value = outcomeEvidenceVariableID;
        outcomeDefinition.observed.type = "EvidenceVariable";
        outcomeDefinition.observed.display = outcomeName;
        evidence1.variableDefinition.push(outcomeDefinition);
        evidence2.variableDefinition.push(outcomeDefinition);
        evidence.variableDefinition.push(outcomeDefinition);

        evidence1.studyType.coding[0].system = "http://terminology.hl7.org/CodeSystem/study-type";
        evidence1.studyType.coding[0].code = studyTypes[study.type][0];
        evidence1.studyType.coding[0].display = studyTypes[study.type][1];
        evidence2.studyType.coding[0].system = "http://terminology.hl7.org/CodeSystem/study-type";
        evidence2.studyType.coding[0].code = studyTypes[study.type][0];
        evidence2.studyType.coding[0].display = studyTypes[study.type][1];

        evidence.studyType.coding[0].system = "http://terminology.hl7.org/CodeSystem/study-type";
        evidence.studyType.coding[0].code = studyTypes[study.type][0];
        evidence.studyType.coding[0].display = studyTypes[study.type][1];


        let interventionData = outcomeMeasure.trialArms[1];
        let comparatorData = outcomeMeasure.trialArms[0];


        let statistic1 = JSON.parse(JSON.stringify(blankStatistic));
        statistic1.statisticType.coding[0].system = "http://terminology.hl7.org/CodeSystem/statistic-type";
        let statistic2 = JSON.parse(JSON.stringify(blankStatistic));
        statistic2.statisticType.coding[0].system = "http://terminology.hl7.org/CodeSystem/statistic-type";
        let statistic = JSON.parse(JSON.stringify(blankStatistic));
        statistic.statisticType.coding[0].system = "http://terminology.hl7.org/CodeSystem/statistic-type";

        if (interventionData.denominator !== "" && interventionData.denominator) {
            statistic1.sampleSize.knownDataCount = parseInt(interventionData.denominator);
        }
        if (comparatorData.denominator !== "" && comparatorData.denominator) {
            statistic2.sampleSize.knownDataCount = parseInt(comparatorData.denominator);
        }

        if (comparatorData.denominator !== "" && interventionData.denominator !== "" && comparatorData.denominator && interventionData.denominator) {
            statistic.sampleSize.knownDataCount = parseInt(comparatorData.denominator) + parseInt(interventionData.denominator);
        }
        
        if (outcomeMeasure.outcome.dichotomous) {

            if (interventionData.numerator && interventionData.numerator !== "" ) {
                statistic1.numberOfEvents = parseInt(interventionData.numerator);
            }
    
            if (comparatorData.numerator && comparatorData.numerator !== "") {
                statistic2.numberOfEvents = parseInt(comparatorData.numerator);
            }

            if (interventionData.numerator !== "" && comparatorData.numerator !== "") {
                statistic.numberOfEvents = parseInt(interventionData.numerator) + parseInt(comparatorData.numerator);
            }

            if (interventionData.denominator !== "" && interventionData.numerator !== "") {
                statistic1.statisticType.coding[0].code = "C44256";
                statistic1.statisticType.coding[0].display = "Proportion";
                statistic1.quantity = {};
                statistic1.quantity.value = (parseFloat(interventionData.numerator)/parseFloat(interventionData.denominator));

                let attributeEstimate1 = JSON.parse(JSON.stringify(blankAttributeEstimate));
                if (parseFloat(interventionData.denominator) >= 30 && parseFloat(interventionData.numerator) !== 0) {
                    attributeEstimate1.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                    attributeEstimate1.type.coding[0].code = statisticAttributeTypes["ci"][0];
                    attributeEstimate1.type.coding[0].display = statisticAttributeTypes["ci"][1];
                    const confidenceInterval = calculateCI(interventionData.numerator, interventionData.denominator);
                    attributeEstimate1.range.low = {};
                    attributeEstimate1.range.low.value = confidenceInterval[0];
                    //attributeEstimate1.range.low.unit = outcomeMeasure.outcome.unitOfMeasure;
                    attributeEstimate1.range.high = {};
                    attributeEstimate1.range.high.value = confidenceInterval[1];
                    //attributeEstimate1.range.high.unit = outcomeMeasure.outcome.unitOfMeasure;
                    attributeEstimate1.level = 0.95;
                }
                statistic1.attributeEstimate.push(attributeEstimate1);
            }
            if (comparatorData.denominator !== "" && comparatorData.numerator !== "") {
                statistic2.statisticType.coding[0].code = "C44256";
                statistic2.statisticType.coding[0].display = "Proportion";
                statistic2.quantity = {};
                statistic2.quantity.value = (parseFloat(comparatorData.numerator)/parseFloat(comparatorData.denominator));

                let attributeEstimate2 = JSON.parse(JSON.stringify(blankAttributeEstimate));
                if (parseFloat(comparatorData.denominator) >= 30 && parseFloat(comparatorData.numerator) !== 0) {
                    attributeEstimate2.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                    attributeEstimate2.type.coding[0].code = statisticAttributeTypes["ci"][0];
                    attributeEstimate2.type.coding[0].display = statisticAttributeTypes["ci"][1];
                    const confidenceInterval = calculateCI(comparatorData.numerator, comparatorData.denominator);
                    attributeEstimate2.range.low = {};
                    attributeEstimate2.range.low.value = confidenceInterval[0];
                    //attributeEstimate2.range.low.unit = outcomeMeasure.outcome.unitOfMeasure;
                    attributeEstimate2.range.high = {};
                    attributeEstimate2.range.high.value = confidenceInterval[1];
                    //attributeEstimate2.range.high.unit = outcomeMeasure.outcome.unitOfMeasure;
                    attributeEstimate2.level = 0.95;
                }
                statistic2.attributeEstimate.push(attributeEstimate2);
            }
            if (comparatorData.denominator !== "" && interventionData.denominator !== "" && comparatorData.denominator && interventionData.denominator
             && comparatorData.numerator !== "" && interventionData.numerator !== "" && comparatorData.numerator && interventionData.numerator) {
                statistic.statisticType.coding[0].code = "0000424";
                statistic.statisticType.coding[0].display = "Risk Difference";
                statistic.quantity = {};
                statistic.quantity.value = (((parseFloat(interventionData.numerator)/parseFloat(interventionData.denominator)) - (parseFloat(comparatorData.numerator)/parseFloat(comparatorData.denominator))));                


                let attributeEstimate3 = JSON.parse(JSON.stringify(blankAttributeEstimate));
                if (interventionData.denominator !== "" && comparatorData.denominator !== "" && parseFloat(interventionData.denominator) >= 30 && parseFloat(comparatorData.denominator) >= 30 && parseFloat(interventionData.numerator) !== 0 && parseFloat(comparatorData.numerator) !== 0) {
                    attributeEstimate3.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                    attributeEstimate3.type.coding[0].code = statisticAttributeTypes["ci"][0];
                    attributeEstimate3.type.coding[0].display = statisticAttributeTypes["ci"][1];
                    let proportion1 = parseFloat(interventionData.numerator) / parseFloat(interventionData.denominator);
                    let proportion2 = parseFloat(comparatorData.numerator) / parseFloat(comparatorData.denominator);
                    let riskDifference = (proportion1 - proportion2);
                    let riskDifferenceCI = (1.96*Math.sqrt(((proportion2*(1 - proportion2))/comparatorData.denominator)+((proportion1*(1 - proportion1))/interventionData.denominator)));
                    let riskDifferenceCILow = riskDifference - riskDifferenceCI;
                    let riskDifferenceCIHigh = riskDifference + riskDifferenceCI;
          
                    if (riskDifferenceCILow < -100) {
                      riskDifferenceCILow = -100;
                    }
                    if (riskDifferenceCIHigh > 100) {
                      riskDifferenceCIHigh = 100;
                    }
                    attributeEstimate3.range.low = {};
                    attributeEstimate3.range.low.value = riskDifferenceCILow;
                    //attributeEstimate3.range.low.unit = outcomeMeasure.outcome.unitOfMeasure;
                    attributeEstimate3.range.high = {};
                    attributeEstimate3.range.high.value = riskDifferenceCIHigh;
                    //attributeEstimate3.range.high.unit = outcomeMeasure.outcome.unitOfMeasure;
                    attributeEstimate3.level = 0.95;
                }
                statistic.attributeEstimate.push(attributeEstimate3);
            }
    
        }  else {
            const outcomeUnits = ucumLookup(outcomeMeasure.outcome.unitOfMeasure);
            if (outcomeMeasure.outcome.mean) {

                statistic1.statisticType.coding[0].code = "C53319";
                statistic1.statisticType.coding[0].display = "Mean";
                if (interventionData.mean !== "") {
                    statistic1.quantity = {};
                    statistic1.quantity.value = parseFloat(interventionData.mean);
                    statistic1.quantity.unit = outcomeUnits.unit;
                    statistic1.quantity.system = outcomeUnits.system;
                    statistic1.quantity.code = outcomeUnits.code;
                }
                statistic2.statisticType.coding[0].code = "C53319";
                statistic2.statisticType.coding[0].display = "Mean";
                if (comparatorData.mean !== "") {
                    statistic2.quantity = {};
                    statistic2.quantity.value = parseFloat(comparatorData.mean);
                    statistic2.quantity.unit = outcomeUnits.unit;
                    statistic2.quantity.system = outcomeUnits.system;
                    statistic2.quantity.code = outcomeUnits.code;
                }

                statistic.statisticType.coding[0].code = "0000457";
                statistic.statisticType.coding[0].display = "Mean Difference";
                if (interventionData.mean !== "" && comparatorData.mean !== "" && interventionData.mean && comparatorData.mean) {
                    statistic.quantity = {};
                    statistic.quantity.value = parseFloat(interventionData.mean) - parseFloat(comparatorData.mean);
                    statistic.quantity.unit = outcomeUnits.unit;
                    statistic.quantity.system = outcomeUnits.system;
                    statistic.quantity.code = outcomeUnits.code;
                }
            } else {

                statistic1.statisticType.coding[0].code = "C28007";
                statistic1.statisticType.coding[0].display = "Median";
                if (interventionData.median !== "") {
                    statistic1.quantity = {};
                    statistic1.quantity.value = parseFloat(interventionData.median);
                    statistic1.quantity.unit = outcomeUnits.unit;
                    statistic1.quantity.system = outcomeUnits.system;
                    statistic1.quantity.code = outcomeUnits.code;
                }
                statistic2.statisticType.coding[0].code = "C28007";
                statistic2.statisticType.coding[0].display = "Median";
                if (comparatorData.median !== "") {
                    statistic2.quantity = {};
                    statistic2.quantity.value = parseFloat(comparatorData.median);
                    statistic2.quantity.unit = outcomeUnits.unit;
                    statistic2.quantity.system = outcomeUnits.system;
                    statistic2.quantity.code = outcomeUnits.code;
                }

                statistic.statisticType.coding[0].code = "absolute-MedianDiff";
                statistic.statisticType.coding[0].display = "Absolute Median Difference";
                if (interventionData.median !== "" && comparatorData.median !== "" && interventionData.median && comparatorData.median) {
                    statistic.quantity = {};
                    statistic.quantity.value = parseFloat(interventionData.median) - parseFloat(comparatorData.median);
                    statistic.quantity.unit = outcomeUnits.unit;
                    statistic.quantity.system = outcomeUnits.system;
                    statistic.quantity.code = outcomeUnits.code;
                }
            }

            if (outcomeMeasure.outcome.attribute && outcomeMeasure.outcome.attribute !== "") {
                let attributeEstimate = JSON.parse(JSON.stringify(blankAttributeEstimate));   

                let attributeEstimate1 = JSON.parse(JSON.stringify(blankAttributeEstimate));
                let attributeEstimate2 = JSON.parse(JSON.stringify(blankAttributeEstimate));

                let attributeFound1 = false;
                let attributeFound2 = false;
                let attributeFound = false;

                if (outcomeMeasure.outcome.attribute === "sd") {
                    if (interventionData.sd !== "") {
                        attributeEstimate1.quantity.value = parseFloat(interventionData.sd);
                        attributeEstimate1.quantity.unit = outcomeUnits.unit;
                        attributeEstimate1.quantity.system = outcomeUnits.system;
                        attributeEstimate1.quantity.code = outcomeUnits.code;
                        attributeFound1 = true;
                    }
                    if (comparatorData.sd !== "") {
                        attributeEstimate2.quantity.value = parseFloat(comparatorData.sd);
                        attributeEstimate2.quantity.unit = outcomeUnits.unit;
                        attributeEstimate2.quantity.system = outcomeUnits.system;
                        attributeEstimate2.quantity.code = outcomeUnits.code;
                        attributeFound2 = true;
                    }
    
                } else if (outcomeMeasure.outcome.attribute === "range") {
                    if (interventionData.rangeLow !== "") {
                        attributeEstimate1.range.low = {};
                        attributeEstimate1.range.low.value = parseFloat(interventionData.rangeLow);
                        attributeEstimate1.range.low.unit = outcomeUnits.unit;
                        attributeEstimate1.range.low.system = outcomeUnits.system;
                        attributeEstimate1.range.low.code = outcomeUnits.code;
                        attributeFound1 = true;
                    }
                    if (interventionData.rangeHigh !== "") {
                        attributeEstimate1.range.high = {};
                        attributeEstimate1.range.high.value = parseFloat(interventionData.rangeHigh);
                        attributeEstimate1.range.high.unit = outcomeUnits.unit;
                        attributeEstimate1.range.high.system = outcomeUnits.system;
                        attributeEstimate1.range.high.code = outcomeUnits.code;
                        attributeFound1 = true;
                    }
                    if (comparatorData.rangeLow !== "") {
                        attributeEstimate2.range.low = {};
                        attributeEstimate2.range.low.value = parseFloat(comparatorData.rangeLow);
                        attributeEstimate2.range.low.unit = outcomeUnits.unit;
                        attributeEstimate2.range.low.system = outcomeUnits.system;
                        attributeEstimate2.range.low.code = outcomeUnits.code;
                        attributeFound2 = true;
                    }
                    if (comparatorData.rangeHigh !== "") {
                        attributeEstimate2.range.high = {};
                        attributeEstimate2.range.high.value = parseFloat(comparatorData.rangeHigh);
                        attributeEstimate2.range.high.unit = outcomeUnits.unit;
                        attributeEstimate2.range.high.system = outcomeUnits.system;
                        attributeEstimate2.range.high.code = outcomeUnits.code;
                        attributeFound2 = true;
                    }
                } else if (outcomeMeasure.outcome.attribute === "iqr") {
                    if (interventionData.iqrLow !== "") {
                        attributeEstimate1.range.low = {};
                        attributeEstimate1.range.low.value = parseFloat(interventionData.iqrLow);
                        attributeEstimate1.range.low.unit = outcomeUnits.unit;
                        attributeEstimate1.range.low.system = outcomeUnits.system;
                        attributeEstimate1.range.low.code = outcomeUnits.code;
                        attributeFound1 = true;
                    }
                    if (interventionData.iqrHigh !== "") {
                        attributeEstimate1.range.high = {};
                        attributeEstimate1.range.high.value = parseFloat(interventionData.iqrHigh);
                        attributeEstimate1.range.high.unit = outcomeUnits.unit;
                        attributeEstimate1.range.high.system = outcomeUnits.system;
                        attributeEstimate1.range.high.code = outcomeUnits.code;
                        attributeFound1 = true;
                    }
                    if (comparatorData.iqrLow !== "") {
                        attributeEstimate2.range.low = {};
                        attributeEstimate2.range.low.value = parseFloat(comparatorData.iqrLow);
                        attributeEstimate2.range.low.unit = outcomeUnits.unit;
                        attributeEstimate2.range.low.system = outcomeUnits.system;
                        attributeEstimate2.range.low.code = outcomeUnits.code;
                        attributeFound2 = true;
                    }
                    if (comparatorData.iqrHigh !== "") {
                        attributeEstimate2.range.high = {};
                        attributeEstimate2.range.high.value = parseFloat(comparatorData.iqrHigh);
                        attributeEstimate2.range.high.unit = outcomeUnits.unit;
                        attributeEstimate2.range.high.system = outcomeUnits.system;
                        attributeEstimate2.range.high.code = outcomeUnits.code;
                        attributeFound2 = true;
                    }
                } else if (outcomeMeasure.outcome.attribute === "ci") {
                    if (interventionData.ciLow !== "") {
                        attributeEstimate1.range.low = {};
                        attributeEstimate1.range.low.value = parseFloat(interventionData.ciLow);
                        attributeEstimate1.range.low.unit = outcomeUnits.unit;
                        attributeEstimate1.range.low.system = outcomeUnits.system;
                        attributeEstimate1.range.low.code = outcomeUnits.code;
                        attributeFound1 = true;
                    }
                    if (interventionData.ciHigh !== "") {
                        attributeEstimate1.range.high = {};
                        attributeEstimate1.range.high.value = parseFloat(interventionData.ciHigh);
                        attributeEstimate1.range.high.unit = outcomeUnits.unit;
                        attributeEstimate1.range.high.system = outcomeUnits.system;
                        attributeEstimate1.range.high.code = outcomeUnits.code;
                        attributeFound1 = true;
                    }
                    if (comparatorData.ciLow !== "") {
                        attributeEstimate2.range.low = {};
                        attributeEstimate2.range.low.value = parseFloat(comparatorData.ciLow);
                        attributeEstimate2.range.low.unit = outcomeUnits.unit;
                        attributeEstimate2.range.low.system = outcomeUnits.system;
                        attributeEstimate2.range.low.code = outcomeUnits.code;
                        attributeFound2 = true;
                    }
                    if (comparatorData.ciHigh !== "") {
                        attributeEstimate2.range.high = {};
                        attributeEstimate2.range.high.value = parseFloat(comparatorData.ciHigh);
                        attributeEstimate2.range.high.unit = outcomeUnits.unit;
                        attributeEstimate2.range.high.system = outcomeUnits.system;
                        attributeEstimate2.range.high.code = outcomeUnits.code;
                        attributeFound2 = true;
                    }
                    if (attributeFound1) {
                        attributeEstimate1.level = 0.95;
                    }
                    if (attributeFound2) {
                        attributeEstimate2.level = 0.95;
                    }
                }
                if (attributeFound1) {
                    attributeEstimate1.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                    attributeEstimate1.type.coding[0].code = statisticAttributeTypes[outcomeMeasure.outcome.attribute][0];
                    attributeEstimate1.type.coding[0].display = statisticAttributeTypes[outcomeMeasure.outcome.attribute][1];
                }
                if (attributeFound2) {
                    attributeEstimate2.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                    attributeEstimate2.type.coding[0].code = statisticAttributeTypes[outcomeMeasure.outcome.attribute][0];
                    attributeEstimate2.type.coding[0].display = statisticAttributeTypes[outcomeMeasure.outcome.attribute][1];
                }

                if (attributeFound) {
                    attributeEstimate.type.coding[0].system = "http://terminology.hl7.org/CodeSystem/attribute-estimate-type";
                    attributeEstimate.type.coding[0].code = statisticAttributeTypes[outcomeMeasure.outcome.attribute][0];
                    attributeEstimate.type.coding[0].display = statisticAttributeTypes[outcomeMeasure.outcome.attribute][1];
                }

                statistic1.attributeEstimate.push(attributeEstimate1);
                statistic2.attributeEstimate.push(attributeEstimate2);
    
                statistic.attributeEstimate.push(attributeEstimate);
            }
        }

        evidence1.statistic.push(statistic1);
        evidence2.statistic.push(statistic2);
        evidence.statistic.push(statistic);

        //Clear blank fields from Evidence resource
        evidence1 = removeEmptyFields(evidence1);
        evidenceResources.push(evidence1);
        evidence2 = removeEmptyFields(evidence2);
        evidenceResources.push(evidence2);
        evidence = removeEmptyFields(evidence);
        evidenceResources.push(evidence);
    });
    
    evidenceReportSection3.section.push(evidenceReportSection3E);

    evidenceReportSection5.section.push(evidenceReportSection5A);
    evidenceReportSection5.section.push(evidenceReportSection5B);
    evidenceReportSection5.section.push(evidenceReportSection5C);

    evidenceReport.section.push(evidenceReportSection3);
    evidenceReport.section.push(evidenceReportSection4);
    evidenceReport.section.push(evidenceReportSection5);

    evidenceReportResources.push(removeEmptyFields(evidenceReport));
    allResources = allResources.concat(evidenceReportResources);

    allResources = allResources.concat(groupResources);
    allResources = allResources.concat(evidenceVariableResources);
    allResources = allResources.concat(evidenceResources);

    bundle = {
        "resourceType": "Bundle",
        "type": "collection",
        "total": allResources.length,
        "entry": allResources

    }

    return bundle;
  };

  export default ConvertStateToEBMonFHIR;
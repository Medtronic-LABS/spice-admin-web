const MOCK_DATA_CONSTANTS = {
    ORDER: {
        "bioData":0,
        "bioMetrics":1,
        "bpLog":2,
        "glucoseLog":3,
        "phq4":4
    },
    HEIGHT: {
        "bioData":29,
        "bioMetrics":29,
        "bpLog":29,
        "glucoseLog":29,
        "phq4":29
},
INITIAL_VALUES: {
    "bioData": {
      "bioData": {
        "viewType": "CardView",
        "id": "bioData",
        "title": "Bio Data",
        "familyOrder": 0
      },
      "firstName": {
        "id": "firstName",
        "viewType": "EditText",
        "title": "First Name",
        "fieldName": "First Name",
        "family": "bioData",
        "isSummary": true,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "hint": "Enter First Name",
        "maxLength": 100,
        "minLength": 1,
        "errorMessage": "First name is required and must be length of 1 to 100",
        "inputType": 96,
        "isNotDefault": false,
        "orderId": 1
      },
      "lastName": {
        "id": "lastName",
        "viewType": "EditText",
        "title": "Last Name",
        "fieldName": "Last Name",
        "family": "bioData",
        "isSummary": true,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "hint": "Enter Last Name",
        "maxLength": 100,
        "minLength": 1,
        "errorMessage": "Last name is required and  must be length of 1 to 100",
        "inputType": 96,
        "isNotDefault": false,
        "orderId": 3
      },
      "phoneNumber": {
        "id": "phoneNumber",
        "viewType": "EditText",
        "title": "Mobile Number",
        "fieldName": "Mobile Number",
        "family": "bioData",
        "isSummary": true,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "hint": "Enter Mobile Number",
        "contentLength": 10,
        "errorMessage": "Mobile number is required and must be of 10 digits",
        "inputType": 3,
        "isNotDefault": false,
        "orderId": 4
      },
      "phoneNumberCategory": {
        "id": "phoneNumberCategory",
        "viewType": "Spinner",
        "title": "Mobile Number Category",
        "fieldName": "Mobile Number Category",
        "family": "bioData",
        "isSummary": false,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "defaultValue": "Personal",
        "optionsList": [
          {
            "name": "Personal",
            "id": "Personal"
          },
          {
            "name": "Family Member",
            "id": "Family Member"
          },
          {
            "name": "Friend",
            "id": "Friend"
          }
        ],
        "isNotDefault": false,
        "errorMessage": "Please select a category",
        "orderId": 5
      },
      "landmark": {
        "id": "landmark",
        "viewType": "EditText",
        "title": "Village/Town/City Name",
        "fieldName": "Village/Town/City Name",
        "family": "bioData",
        "isSummary": true,
        "isMandatory": false,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "hint": "Enter Village/Town/City Name",
        "maxLength": 100,
        "minLength": 1,
        "errorMessage": "",
        "inputType": -1,
        "isNotDefault": false,
        "orderId": 6
      },
      "nationalId": {
        "id": "nationalId",
        "viewType": "EditText",
        "title": "National ID",
        "fieldName": "National ID",
        "family": "bioData",
        "isSummary": true,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "hint": "Enter National ID",
        "maxLength": 50,
        "minLength": 1,
        "errorMessage": "National ID is required",
        "inputType": -1,
        "isNotDefault": false,
        "isNeedAction": true,
        "orderId": 7
      }
    },
    "bioMetrics": {
      "bioMetrics": {
        "viewType": "CardView",
        "id": "bioMetrics",
        "title": "Biometrics",
        "familyOrder": 1
      },
      "gender": {
        "id": "gender",
        "viewType": "RadioGroup",
        "title": "Gender",
        "fieldName": "Gender",
        "family": "bioMetrics",
        "isSummary": true,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "optionsList": [
          {
            "name": "Male",
            "id": "Male"
          },
          {
            "name": "Female",
            "id": "Female"
          },
          {
            "name": "Non-Binary",
            "id": "Non-Binary"
          }
        ],
        "orientation": 0,
        "errorMessage": "Please select a gender",
        "optionType": "string",
        "orderId": 1
      },
      "age": {
        "id": "age",
        "viewType": "Age",
        "title": "Age",
        "fieldName": "Age",
        "family": "bioMetrics",
        "isSummary": true,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "isNeededDefault": true,
        "disableFutureDate": true,
        "orderId": 2
      },
      "height": {
        "id": "height",
        "viewType": "EditText",
        "title": "Height (in cm)",
        "fieldName": "Height",
        "family": "bioMetrics",
        "isSummary": false,
        "isMandatory": false,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "hint": "Enter Height",
        "errorMessage": "Height is required and must be in a range from 10 to 300",
        "inputType": 8192,
        "minValue": 50,
        "maxValue": 300,
        "isNotDefault": true,
        "orderId": 3
      },
      "weight": {
        "id": "weight",
        "viewType": "EditText",
        "title": "Weight (in kg)",
        "fieldName": "Weight",
        "family": "bioMetrics",
        "isSummary": false,
        "isMandatory": false,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "hint": "Enter Weight",
        "errorMessage": "Weight is required and must be in a range from 10 to 400",
        "inputType": 8192,
        "minValue": 10,
        "maxValue": 400,
        "isNotDefault": false,
        "orderId": 4
      }
    },
    "bpLog": {
      "bpLog": {
        "viewType": "CardView",
        "id": "bpLog",
        "title": "Blood Pressure",
        "familyOrder": 2
      },
      "isBeforeHtnDiagnosis": {
        "id": "isBeforeHtnDiagnosis",
        "viewType": "RadioGroup",
        "title": "Have you been diagnosed with High Blood Pressure or Hypertension before?",
        "fieldName": "Have you been diagnosed with High Blood Pressure or Hypertension before?",
        "family": "bpLog",
        "isSummary": false,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "optionsList": [
          {
            "name": "Yes",
            "id": true
          },
          {
            "name": "No",
            "id": false
          }
        ],
        "orientation": 0,
        "errorMessage": "Please select a valid option",
        "optionType": "boolean",
        "orderId": 1
      },
      "bpLogDetails": {
        "id": "bpLogDetails",
        "viewType": "BP",
        "title": "Blood Pressure",
        "fieldName": "Blood Pressure",
        "family": "bpLog",
        "isSummary": true,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "isNeededDefault": true,
        "maxLength": 3,
        "maxValue": 300,
        "minValue": 30,
        "pulseMaxValue": 300,
        "pulseMinValue": 35,
        "instructions": [
          "Ensure participant has rested for at least 5 minutes before capturing readings.",
          "Ensure participant is sitting calmly on a chair/stool with their feet flat on the floor, their back upright and supported.",
          "Rest the participant's arm on a flat surface at heart level.",
          "Place the bottom of the cuff above the bend of the elbow.",
          "Take at least 2 readings (on separate arms of the participant) with a gap/break of 1 minute between the two readings and record both results."
        ],
        "totalCount": 2,
        "mandatoryCount": 1,
        "errorMessage": "Please enter a blood pressure value",
        "orderId": 2
      },
      "isRegularSmoker": {
        "id": "isRegularSmoker",
        "viewType": "RadioGroup",
        "title": "Are you a regular smoker or have you been a regular smoker in the past 12 months?",
        "fieldName": "Are you a regular smoker or have you been a regular smoker in the past 12 months?",
        "family": "bpLog",
        "isSummary": false,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "optionsList": [
          {
            "name": "Yes",
            "id": true
          },
          {
            "name": "No",
            "id": false
          }
        ],
        "orientation": 0,
        "errorMessage": "Please select a valid option",
        "optionType": "boolean",
        "orderId": 5
      }
    },
    "glucoseLog": {
      "glucoseLog": {
        "viewType": "CardView",
        "id": "glucoseLog",
        "title": "Blood Glucose",
        "familyOrder": 3
      },
      "isBeforeDiabetesDiagnosis": {
        "id": "isBeforeDiabetesDiagnosis",
        "viewType": "RadioGroup",
        "title": "Have you been diagnosed with High Blood Sugar or Diabetes before?",
        "fieldName": "Have you been diagnosed with High Blood Sugar or Diabetes before?",
        "family": "glucoseLog",
        "isSummary": false,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [],
        "isNeededDefault": true,
        "optionsList": [
          {
            "name": "Yes",
            "id": true
          },
          {
            "name": "No",
            "id": false
          }
        ],
        "orientation": 0,
        "errorMessage": "Please select a valid option",
        "optionType": "boolean",
        "orderId": 1
      },
      "glucose": {
        "id": "glucose",
        "viewType": "EditText",
        "title": "Blood Glucose",
        "fieldName": "Blood Glucose",
        "family": "glucoseLog",
        "isSummary": false,
        "isMandatory": false,
        "isEnabled": true,
        "visibility": "visible",
        "condition": [
          {
            "lengthGreaterThan": 0,
            "targetId": "lastMealTime",
            "enabled": true
          }
        ],
        "hint": "Enter Glucose Reading",
        "errorMessage": "",
        "inputType": 8192,
        "minValue": 0.6,
        "maxValue": 33,
        "isNotDefault": false,
        "unitMeasurement": "mmol/L",
        "orderId": 2
      },
      "lastMealTime": {
        "id": "lastMealTime",
        "viewType": "TimeView",
        "title": "Time of Last Meal",
        "fieldName": "Time of Last Meal",
        "family": "glucoseLog",
        "isSummary": false,
        "isMandatory": false,
        "isEnabled": false,
        "visibility": "visible",
        "isNotDefault": false,
        "orderId": 3
      }
    },
    "phq4": {
      "phq4": {
        "viewType": "CardView",
        "id": "phq4",
        "title": "Mental Health",
        "familyOrder": 4
      },
      "healthText": {
        "viewType": "TextLabel",
        "id": "healthText",
        "title": "Over the last 2 weeks, how often have you been bothered by the following problems?",
        "family": "phq4",
        "fieldName": "Over the last 2 weeks, how often have you been bothered by the following problems?",
        "isMandatory": false,
        "isEnabled": true,
        "visibility": "visible",
        "orderId": 1
      },
      "phq4MentalHealth": {
        "id": "phq4MentalHealth",
        "viewType": "MentalHealthView",
        "title": "Mental Health",
        "fieldName": "Mental Health",
        "family": "phq4",
        "isSummary": false,
        "isMandatory": true,
        "isEnabled": true,
        "visibility": "visible",
        "localDataCache": "PHQ4",
        "isNeededDefault": true,
        "orderId": 2
      }
    },
    "NO_FAMILY": {
      "btnSubmit": {
        "viewType": "Button",
        "id": "btnSubmit",
        "title": "Submit",
        "fieldName": "Submit",
        "action": "formSubmission"
      }
    }
  }
  };
  
  export default MOCK_DATA_CONSTANTS;
  
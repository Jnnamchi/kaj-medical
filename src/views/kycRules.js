import { countries } from 'countries-list'

const documentTypes = [
  "Company Registration", "Licensce Registration", "Product Catalogue", "Certification", "Company VAT / Number"
]

export const eKycRules = {
  "name": "E-KYC Registration",
  "stages": [
    {
      "name": "Part 1: Inquiry Form",
      "questions": [
        {
          "question": "First Name",
          "type": "text",
          "required": true,
          "answer": "",
        },
        {
          "question": "Last Name",
          "type": "text",
          "required": true,
          "answer": "",
        },
        {
          "question": "Email (No gmail or major @mails)",
          "type": "text",
          "required": true,
          "answer": "",
          "domainCheck": true,
        },
        {
          "question": "Company Website",
          "type": "text",
          "required": false,
          "answer": "",
        },
        {
          "question": "Company or Entity Name",
          "type": "text",
          "required": true,
          "answer": "",
        },
        {
          "question": "Location Registered",
          "type": "dropdown",
          "options": getAllCountries(),
          "required": true,
          "answer": "",
        },
        {
          "question": "Type of Entity",
          "type": "dropdown",
          "options": [ "Licensed Distributor / Importer", "Manufacturer / Supplier", "Brokerage Agency", "Government Agency", "Non-Profit Organization", "Medical Facility", "Business Collaborator", "Other" ],
          "required": true,
          "answer": "",
        },
        {
          "question": "Description of Request",
          "type": "textarea",
          "required": true,
          "answer": "",
        },
      ]
    },
    {
      "name": "Part 2: Verifying Business",
      "questions": [
        {
          "question": "Document Upload 1",
          "type": "upload",
          "documentTypes": documentTypes,
          "required": true,
          "selectedType": ""
        },
        {
          "question": "Document Upload 2 (optional)",
          "type": "upload",
          "documentTypes": documentTypes,
          "required": true,
          "selectedType": ""
        },
        {
          "question": "Document Upload 1 (optional)",
          "type": "upload",
          "documentTypes": documentTypes,
          "required": true,
          "selectedType": ""
        },
      ]
    },
    {
      "name": "Part 2: Verifying Business",
      "questions": [
        {
          "question": "First Name",
          "type": "text",
          "required": true,
          "answer": "John",
        },
        {
          "question": "Last Name",
          "type": "text",
          "required": true,
          "answer": "Nnamchi",
        },
        {
          "question": "Date of Birth",
          "type": "date",
          "required": true,
          "answer": "",
        },
        {
          "question": "Unique ID Number (Government ID or Passport Number)",
          "type": "text",
          "required": true,
          "answer": "",
        },
        {
          "question": "Passport or ID Copy",
          "type": "upload",
          "required": true,
          "selectedType": ""
        },
      ]
    }
  ]
}

function getAllCountries () {
  let allCountries = []
  for (const countryCode in countries) {
    const countryData = countries[countryCode]
    allCountries.push(countryData.name)
  }
  return allCountries
}
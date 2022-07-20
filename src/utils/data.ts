import countryList from "react-select-country-list";
export const userTypeOptions = [
  { value: "businessBroker", label: "Business Broker" },
  { value: "licensed", label: "Licensed Distributor/Importer" },
  { value: "manufacturer", label: "Manufacturer (Supplier)" },
  { value: "brokerageAgency", label: "Brokerage Agency" },
  { value: "governmentAgency", label: "Government Agency" },
  { value: "nonProfit", label: "Non Profit Organization" },
  { value: "medicalFacility", label: "Medical Facility" },
  { value: "businessCollaborator", label: "Business Collaborator" },
  { value: "other", label: "Other" },
];

export const documentPerEntity = {
  licensed: [
    { value: "companyRegistration", label: "Company Registration" },
    {
      value: "licenseRegistration",
      label: "License Registration documents / certifications",
    },
    { value: "governmentRegistration", label: "Government Registration Forms" },
  ],
  manufacturer: [
    { value: "productCatalogue", label: "Product Catalogue" },
    { value: "certification", label: "Certification(s)" },
  ],
  brokerageAgency: [
    { value: "companyRegistration", label: "Company Registration" },
    {
      value: "registrationCertifications",
      label: "Registration Certifications",
    },
    { value: "VATnumberCode", label: "Company VAT number / code" },
  ],
  medicalFacility: [
    { value: "companyRegistration", label: "Company Registration" },
  ],
};

export const surveyFields = {
  inquiry: [
    {
      name: "firstName",
      label: "First Name",
      control: "input",
    },
    {
      name: "lastName",
      label: "Last Name",
      control: "input",
    },

    {
      name: "email",
      label: "Email (No gmail or major@mails) ",
      control: "input",
      type: "email",
    },

    {
      name: "companySite",
      label: "Company Website",
      control: "input",
    },

    {
      name: "companyEntity",
      label: "Company or Entity Name",
      control: "input",
    },

    {
      name: "location",
      label: "Location Registered",
      control: "select",
      options: countryList().getData(),
    },

    {
      name: "entityType",
      label: "Type of Entity",
      control: "select",
      options: userTypeOptions,
    },
    {
      name: "requestDescription",
      label: "Description of Request",
      control: "textarea",
    },
  ],
  document: {
    licensed: [
      {
        name: "companyRegistration",
        label: "Company Registration",
        control: "input",
        type: "file",
      },
      {
        name: "licenseRegistration",
        label: "License Registration documents / certifications",
        control: "input",
        type: "file",
      },
      {
        name: "governmentRegistration",
        label: "Government Registration Forms",
        control: "input",
        type: "file",
      },
    ],
    manufacturer: [
      {
        name: "productCatalogue",
        label: "Product Catalogue",
        control: "input",
        type: "file",
      },
      {
        name: "certification",
        label: "Certification(s)",
        control: "input",
        type: "file",
      },
    ],
    brokerageAgency: [
      {
        name: "companyRegistration",
        label: "Company Registration",
        control: "input",
        type: "file",
      },
      {
        name: "registrationCertifications",
        label: "Registration Certifications",
        control: "input",
        type: "file",
      },
      {
        name: "VATnumberCode",
        label: "Company VAT number / code",
        control: "input",
      },
    ],
    medicalFacility: [
      {
        name: "companyRegistration",
        label: "Company Registration",
        control: "input",
        type: "file",
      },
    ],
  },
  ekyc: [
    {
      name: "firstName",
      label: "First Name",
      control: "input",
    },
    {
      name: "lastName",
      label: "Last Name",
      control: "input",
    },
    {
      name: "birth",
      label: "Date of Birth",
      control: "input",
      type: "date",
    },

    {
      name: "governmentId",
      label: "Unique ID Number (Government ID or Passport Number)",
      control: "input",
      type: "file",
    },

    {
      name: "passport",
      label: "Passport or ID Copy",
      control: "input",
      type: "file",
    },
  ],
};

export const documentInitValues = {
  licensed: {
    companyRegistration: null,
    licenseRegistration: null,
    governmentRegistration: null,
  },
  manufacturer: {
    productCatalogue: null,
    certification: null,
  },
  brokerageAgency: {
    companyRegistration: null,
    registrationCertifications: null,
    VATnumberCode: "",
  },
  medicalFacility: {
    companyRegistration: null,
  },
};

export const matchedDocumentFiles = {
  licensed: [
    "companyRegistration",
    "licenseRegistration",
    "governmentRegistration",
  ],
  manufacturer: ["productCatalogue", "certification"],
  brokerageAgency: [
    "companyRegistration",
    "registrationCertifications",
    "VATnumberCode",
  ],
  medicalFacility: ["companyRegistration"],
};

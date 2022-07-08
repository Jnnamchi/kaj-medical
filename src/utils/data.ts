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

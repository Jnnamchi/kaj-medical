import * as Yup from "yup";
// const FILE_SIZE = 160 * 1024 * 1024;
// const SUPPORTED_FORMATS = ["jpg", "jpeg", "gif", "png"];
// .test(
//   "fileSize",
//   "File too large",
//   (value) => value && value.size <= FILE_SIZE
// )
// .test("fileFormat", "Unsupported Format", (value) => {
//   return value && SUPPORTED_FORMATS.includes(value.type);
// }),
export const inquirySchema = Yup.object().shape({
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  companySite: Yup.string().required("Company Website Required"),
  companyEntity: Yup.string().required("Company or Entity Name Required"),
  location: Yup.string().required("Location Required"),
  entityType: Yup.string().required("Type of Entity Required"),
  requestDescription: Yup.string().required("Description of Request Required")
});

export const documentSchema = {
  licensed: Yup.object().shape({
    companyRegistration: Yup.mixed().required("A file is required"),
    licenseRegistration: Yup.mixed().required("A file is required"),
    governmentRegistration: Yup.mixed().required("A file is required")
  }),
  manufacturer: Yup.object().shape({
    productCatalogue: Yup.mixed().required("A file is required"),
    certification: Yup.mixed().required("A file is required")
  }),
  brokerageAgency: Yup.object().shape({
    companyRegistration: Yup.mixed().required("A file is required"),
    registrationCertifications: Yup.mixed().required("A file is required"),
    VATnumberCode: Yup.string().required("VAT Number Code Required")
  }),
  medicalFacility: Yup.object().shape({
    companyRegistration: Yup.mixed().required("A file is required")
  })
};

export const ekycSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  birth: Yup.date().required("Birth Required"),
  governmentId: Yup.mixed().required("A file is required"),
  passport: Yup.mixed().required("A file is required")
});

export const permissionSchema = Yup.object().shape({
  description: Yup.string().required("Description Required"),
  videoUpload: Yup.mixed().required("A file is required"),
  catalogueUpload: Yup.mixed().required("A file is required"),
  workUs: Yup.string().required("This field is Required"),
  
});

import * as Yup from "yup";

export const inquirySchema = Yup.object().shape({
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  companySite: Yup.string().required("Company Website Required"),
  companyEntity: Yup.string().required("Company or Entity Name Required"),
  location: Yup.string().required("Location Required"),
  entityType: Yup.string().required("Type of Entity Required"),
  requestDescription: Yup.string().required("Description of Request Required"),
});

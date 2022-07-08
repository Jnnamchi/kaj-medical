import Select from "react-select";
import { userTypeOptions } from "../../utils/data";

const inputFormFields: { value: string; label: string }[] = [
  {
    value: "firstName",
    label: "First Name",
  },
  {
    value: "lastName",
    label: "Last Name",
  },

  {
    value: "lastName",
    label: "Last Name",
  },
  {
    value: "email",
    label: "Email (No gmail or major@mails) ",
  },

  {
    value: "companySite",
    label: "Company Website",
  },

  {
    value: "companyEntity",
    label: "Company or Entity Name",
  },

  {
    value: "location",
    label: "Location Registered",
  },
];

const InquiryPart = () => {
  return (
    <>
      {inputFormFields.map((field) => (
        <div className="flex items-center space-x-4 ">
          <div className="flex justify-end w-1/3">
            <span className="whitespace-nowrap">{field.label}</span>
          </div>
          <div className="w-2/3 ">
            <input className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
          </div>
        </div>
      ))}

      <div className="flex items-center space-x-4 ">
        <div className="flex justify-end w-1/3">
          <span className="whitespace-nowrap">Location Registered</span>
        </div>
        <div className="w-2/3 ">
          <Select options={userTypeOptions} />
        </div>
      </div>

      <div className="flex items-center space-x-4 ">
        <div className="flex justify-end w-1/3">
          <span className="whitespace-nowrap">Type of Entity</span>
        </div>
        <div className="w-2/3 ">
          <Select options={userTypeOptions} />
        </div>
      </div>

      <div className="flex items-center space-x-4 ">
        <div className="flex justify-end w-1/3">
          <span className="whitespace-nowrap">Description of Request</span>
        </div>
        <div className="w-2/3 ">
          <textarea className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
        </div>
      </div>
    </>
  );
};

export default InquiryPart;

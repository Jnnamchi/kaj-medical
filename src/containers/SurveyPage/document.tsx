const DocumentPart = ({ formFields }: any) => {
  return (
    <>
      {formFields.map((field: any) => (
        <div className="flex items-center space-x-4 ">
          <div className="flex justify-end w-1/3">
            <span className="whitespace-nowrap">{field.label}</span>
          </div>
          <div className="w-2/3 ">
            <input className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
          </div>
        </div>
      ))}
    </>
  );
};

export default DocumentPart;

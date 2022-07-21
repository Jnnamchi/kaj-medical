import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';

import { storage } from '../../config/firebase';
import { documentSchema, ekycSchema, inquirySchema } from './schema';
import FormikControl from '../../components/surveyPage/SurveyFormikControl';
import { documentInitValues, matchedDocumentFiles, surveyFields } from '../../utils/data';
import { DocumentStepInterface, EkycStepInterface, InquiryStepInterface } from './interface';

const SurveyPage = () => {
  const router = useRouter();
  const authUser = useAuthUser();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    to: '',
    firstName: '',
    lastName: '',
    email: '',
    companySite: '',
    companyEntity: '',
    location: '',
    entityType: '',
    requestDescription: '',
    birth: '',
    governmentId: '',
    passport: '',
  });

  type ObjectKey = keyof typeof documentInitValues;

  const uploadFile = async (imageUpload: File) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  useEffect(() => {
    if (documentInitValues[formData.entityType as ObjectKey]) {
      setFormData(prev => ({
        ...prev,
        ...documentInitValues[formData.entityType as ObjectKey],
      }));
    }
  }, [formData.entityType]);

  const makeRequest = async (formData: any) => {
    type FileObjectKey = keyof typeof matchedDocumentFiles;
    await Promise.all(
      [...(matchedDocumentFiles[formData.entityType as FileObjectKey] || []), 'passport', 'governmentId'].map(
        async file => {
          if (file !== 'VATnumberCode') {
            formData[file] = await uploadFile(formData[file]);
          } else {
            formData[file] = formData[file];
          }
        },
      ),
    );

    const token = await authUser.getIdToken();

    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        Authorization: token || 'unauthenticated',
      },
      body: JSON.stringify({
        ...formData,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(`Data fetching failed with status ${response.status}: ${JSON.stringify(data)}`);
      return null;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleNextStep = (newData: any, final = false) => {
    setFormData(prev => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setCurrentStep(prev => prev - 1);
  };

  const surveySteps = [
    <InquiryStep next={handleNextStep} data={formData} />,
    <DocumentStep next={handleNextStep} prev={handlePrevStep} data={formData} />,
    <EkycStep next={handleNextStep} prev={handlePrevStep} data={formData} />,
  ];

  return (
    <div className="max-w-2xl p-4 mx-auto ">
      <p className="text-xl text-center">
        {currentStep === 0
          ? 'Step 1: Inquiry form'
          : currentStep === 1
          ? 'Step 2: Company Verification'
          : currentStep === 2
          ? 'Step 3: eKYC'
          : 'You are all set !'}
      </p>
      {surveySteps[currentStep]}
      {currentStep === 3 && (
        <div className="flex justify-center mt-4">
          <button onClick={() => router.push('/')} className="px-4 py-2 border border-gray-600 rounded">
            Go To Home
          </button>
        </div>
      )}
    </div>
  );
};

const SurveyPart = ({ fields, formik }: any) => {
  if (fields) {
    return fields.map((field: any, id: number) => {
      return <FormikControl {...field} formik={formik} key={id} />;
    });
  }
};

const InquiryStep = (props: InquiryStepInterface) => {
  const handleSubmit = (values: any) => {
    props.next(values);
  };

  return (
    <Formik validationSchema={inquirySchema} initialValues={props.data} onSubmit={handleSubmit}>
      {formik => (
        <Form>
          <div className="py-8 space-y-4">
            <SurveyPart fields={surveyFields.inquiry} formik={formik} />
            <div className="flex justify-center">
              <button type="submit" className="px-4 py-2 border border-gray-600 rounded">
                Continue
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const DocumentStep = (props: DocumentStepInterface) => {
  const handleSubmit = (values: any) => {
    props.next(values);
  };
  type ObjectKey = keyof typeof surveyFields.document;

  const schema = documentSchema[props.data.entityType as ObjectKey];

  return (
    <Formik validationSchema={schema} initialValues={props.data} onSubmit={handleSubmit} enableReinitialize>
      {formik => (
        <Form>
          <div className="py-8 space-y-4">
            <SurveyPart fields={surveyFields.document[formik.values.entityType as ObjectKey]} formik={formik} />

            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 border border-gray-600 rounded"
                type="button"
                onClick={() => props.prev(formik.values)}
              >
                Back
              </button>

              <button type="submit" className="px-4 py-2 border border-gray-600 rounded">
                Continue
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EkycStep = (props: EkycStepInterface) => {
  const handleSubmit = (values: any) => {
    props.next(values, true);
  };

  return (
    <Formik validationSchema={ekycSchema} initialValues={props.data} onSubmit={handleSubmit} enableReinitialize>
      {formik => (
        <Form>
          <div className="py-8 space-y-4">
            <SurveyPart fields={surveyFields.ekyc} formik={formik} />

            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 border border-gray-600 rounded"
                type="button"
                onClick={() => props.prev(formik.values)}
              >
                Back
              </button>

              <button type="submit" className="px-4 py-2 border border-gray-600 rounded">
                Finish
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SurveyPage);

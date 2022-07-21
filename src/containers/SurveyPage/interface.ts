export interface InquiryStepInterface {
  next: Function;
  data: any;
}

export interface DocumentStepInterface {
  next: Function;
  prev: Function;
  data: any;
}

export interface EkycStepInterface {
  next: Function;
  prev: Function;
  data: any;
}

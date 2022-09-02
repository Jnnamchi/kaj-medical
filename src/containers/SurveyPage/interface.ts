export interface InquiryStepInterface {
  next: Function;
  data: any;
  user: any;
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

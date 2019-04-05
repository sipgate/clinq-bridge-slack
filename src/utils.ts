import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const parsePhoneNumber = (phoneNumber: string) => {
  try {
    const parsedPhoneNumber = phoneUtil.parse(phoneNumber);
    return phoneUtil.format(parsedPhoneNumber, PhoneNumberFormat.NATIONAL);
  } catch {
    return phoneNumber;
  }
};

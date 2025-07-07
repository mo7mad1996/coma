interface validationMessages {
  [rulName: string]: string;
  default: string;
}

interface Dictionary {
  [locale: string]: validationMessages;
}

const dictionary: Dictionary = {
  en: {
    required_phone:
      "This field is required to receive periodic campaign execution reports",
    required: "This field is required",
    email: "This field must be a valid email address",
    min: "This field is too short",
    englishNumbersOnly: "English numbers only",
    default: "This field is invalid",
  },
  ar: {
    required_phone: "هذا الحقل مطلوب لتصلك تقارير تنفيذ الحملة بشكل دوري ",
    required: "هذا الحقل مطلوب",
    email: "هذا الحقل يجب ان يكون بريدا صالحا",
    min: "هذا الحقل قصير جدا",
    englishNumbersOnly: "الارقام الانجليزيه فقط",
    default: "هذا الحقل غير صالح",
  },
  ms: {
    required_phone:
      "Medan ini diperlukan untuk menerima laporan pelaksanaan kempen secara berkala",
    required: "Medan ini diperlukan",
    email: "Medan ini mesti berupa alamat emel yang sah",
    min: "Medan ini terlalu pendek",
    englishNumbersOnly: "Nombor Inggeris sahaja",
    default: "Medan ini tidak sah",
  },
};

// A helper function to retrieve messages
export function getMessage(locale: string, ruleName: string, field: string) {
  const localeDict = dictionary[locale] || dictionary.ar;
  const message =
    localeDict[ruleName] || localeDict.default || `This field is invalid.`;
  return message;
}

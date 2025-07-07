import { defineRule, configure } from "vee-validate";
import { all } from "@vee-validate/rules";
import { useCookie } from "nuxt/app";
import { getMessage } from "~/helpers/validation-msg";
import { type CookieRef } from "nuxt/app";

export default defineNuxtPlugin(() => {
  let currentLocale: CookieRef<string | null | undefined>;
  let locale: CookieRef<string | null | undefined> | string;

  Object.entries(all).forEach(([ruleName, ruleFn]) => {
    defineRule(ruleName, ruleFn);
  });

  // Custom rule to accept only English digits

  defineRule("required_phone", (value: string) => {
    if (!value) {
      switch (locale) {
        case "en":
          return "This field is required to receive periodic campaign execution reports";
        case "ar":
          return "هذا الحقل مطلوب لتصلك تقارير تنفيذ الحملة بشكل دوري ";
        case "ms":
          return "Medan ini diperlukan untuk menerima laporan pelaksanaan kempen secara berkala";
        default:
          return "This field is required to receive periodic campaign execution reports";
      }
    } else return true;
  });

  defineRule("domain", (value: string) => {
    const domainRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if (!domainRegex.test(value)) {
      switch (locale) {
        case "ar":
          return "يجب أن يبدأ الاسم بحرف إنجليزي، ويمكن أن يحتوي على أرقام لاحقًا";
        case "en":
          return "Name must start with an English letter and can contain numbers after";
        case "ms":
          return "Nama mesti bermula dengan huruf Inggeris dan boleh mengandungi nombor selepas itu";
        default:
          return "Name must start with an English letter and can contain numbers after";
      }
    } else return true;
  });

  defineRule("phone", (value: string) => {
    const phoneRegex = /^\+?[\d\s().-]{7,}$/;

    if (!phoneRegex.test(value)) {
      switch (locale) {
        case "en":
          return "Invalid phone number format.";
        case "ar":
          return "رقم الهاتف غير صالح";
        case "ms":
          return "Nombor telefon tidak sah";
        default:
          return "Invalid phone number format.";
      }
    } else return true;
  });

  // Custom rule to accept only English digits
  defineRule("englishNumbersOnly", (value: any) => {
    const englishNumbersRegex = /^[0-9]*$/;

    currentLocale = useCookie("i18n_redirected");
    locale = currentLocale.value || "ar";

    if (!englishNumbersRegex.test(value)) {
      switch (locale) {
        case "en":
          return "Only English numbers from [0-9] are allowed.";
        case "ar":
          return "يجب ان تكون الارقام [0-9] انجليزيه فقط";
        case "ms":
          return "Nombor mestilah [0-9] hanya Bahasa Inggeris";
        default:
          return "Only English numbers from [0-9] are allowed.";
      }
    } else return true;
  });

  // password
  defineRule("password", (value: any) => {
    currentLocale = useCookie("i18n_redirected");
    locale = currentLocale.value || "ar";

    if (value.length < 5) {
      switch (locale) {
        case "en":
          return "Password must be at least 5 characters long.";
        case "ar":
          return "يجب أن تكون كلمة المرور مكونة من 5 أحرف على الأقل.";
        case "ms":
          return "Kata laluan mestilah sekurang-kurangnya 5 aksara panjang.";
        default:
          return "Password must be at least 5 characters long.";
      }
    } else if (!value.match(/[1-9]/)) {
      switch (locale) {
        case "en":
          return "Password must contain at least one digit.";
        case "ar":
          return "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.";
        case "ms":
          return "Kata laluan mesti mengandungi sekurang-kurangnya satu digit.";
        default:
          return "Password must contain at least one digit.";
      }
    } else if (!value.match(/[a-z]/)) {
      switch (locale) {
        case "en":
          return "Password must contain at least one lowercase letter.";
        case "ar":
          return "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل.";
        case "ms":
          return "Kata laluan mesti mengandungi sekurang-kurangnya satu huruf kecil.";
        default:
          return "Password must contain at least one lowercase letter.";
      }
    } else if (!value.match(/[A-Z]/)) {
      switch (locale) {
        case "en":
          return "Password must contain at least one uppercase letter.";
        case "ar":
          return "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.";
        case "ms":
          return "Kata laluan mesti mengandungi sekurang-kurangnya satu huruf besar.";
        default:
          return "Password must contain at least one uppercase letter.";
      }
    } else if (!value.match(/[^a-zA-Z0-9]/)) {
      switch (locale) {
        case "en":
          return "The password must have a special letter or at least one symbol.";
        case "ar":
          return "يجب أن تحتوي كلمة المرور على حرف خاص أو رمز واحد على الأقل.";
        case "ms":
          return "Kata laluan mesti mempunyai surat khas atau sekurang-kurangnya satu simbol.";
        default:
          return "The password must have a special letter or at least one symbol.";
      }
    } else return true;
  });

  // Configure custom message generator
  configure({
    generateMessage: (ctx) => {
      if (!ctx.rule) return `Field ${ctx.field} is invalid.`;
      currentLocale = useCookie("i18n_redirected");
      locale = currentLocale.value || "ar";
      return getMessage(locale, ctx.rule.name, ctx.field);
    },
  });
});

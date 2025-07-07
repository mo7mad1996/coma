import axios from "axios";
import { useAuth } from "~/modules/auth/services/auth";
import { useTenant } from "./tenant";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",

    Accept: "application/json",
  },
});

api.interceptors.request.use((config: any) => {
  const { url, tenant_name } = useTenant();

  const backend = import.meta.env.VITE_BACKEND_CENTRAL;
  const domain = tenant_name ? `${tenant_name}.${backend}` : backend;

  config.baseURL = url;
  config.headers.domain = domain;
  return config;
});

api.interceptors.request.use((config: any) => {
  const userLanguage = useCookie("i18n_redirected").value || "ar";
  const { token } = useAuth();

  config.headers.lang = userLanguage;
  config.headers.Authorization = `Bearer ${token.value}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err: any) => {
    switch (err.status) {
      case 301:
        await navigateTo("/verify-email");
        break;
      case 303:
        await navigateTo("/not-allow");
        break;
      case 401:
        await navigateTo("/login");
        break;

      default:
        return Promise.reject(err); // to propagate the error
    }

    return Promise.reject(err); // to propagate the error
  }
);

export const objectToFormData = (
  obj: any = {},
  form: FormData,
  fileFields: string[] = [],
  namespace = ""
): any => {
  for (const key in obj) {
    if (obj[key] === undefined) continue;

    const formKey = namespace ? `${namespace}[${key}]` : key;

    // skip if value is a string but should be a File (like logo or icon)
    if (fileFields.some((f) => f == key) && typeof obj[key] === "string") {
      continue;
    }

    if (typeof obj[key] === "object" && !(obj[key] instanceof File)) {
      objectToFormData(obj[key], form, fileFields, formKey);
    } else {
      form.append(formKey, obj[key]);
    }
  }

  return form;
};

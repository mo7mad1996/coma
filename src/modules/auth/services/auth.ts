import { api } from "~/helpers/axios";
import { encryptData, decryptData } from "~/helpers/data-encryption";
import { useApi } from "./handle-apicals";
import { setToken, setUser, setCode } from "~/helpers/set-cookies";
import { startLoader, stopLoader } from "~/helpers/nprogress";
import { type User, type NewUser, type NewCharity } from "~/helpers/interfaces";
import { useTenant } from "~/helpers/tenant";

export function useAuth() {
  // data
  const { hostname, tenant_name, baseURl, backendUrl } = useTenant();
  const { handleApiCall, isLoading, error } = useApi();

  const route = useRequestURL();

  const tenant_cookie: any = useCookie("tenant_cookie");

  const token = computed(() => {
    const cookieValue = useCookie("token").value;
    return cookieValue ? decryptData(cookieValue as string) : null;
  });

  const user: any = computed(() => {
    const cookieValue = useCookie("user").value;
    return cookieValue ? decryptData(cookieValue as string) : null;
  });

  // ----------- METHODS -------------
  // successLogin
  const successLogin = async (userValue: any, tokenValue: any) => {
    setToken(encryptData(tokenValue));

    try {
      if (process.client) startLoader();

     
        setUser(encryptData(userValue));
     
      // setUser(encryptData(userValue));
      if (userValue?.user_type === "donor")
        await navigateTo("/dashboard/donor");
      else await navigateTo("/dashboard/home");

      if (process.client) stopLoader();

      return "ok";
    } catch (err) {
      console.error("Token verification failed:", err);
      if (process.client) stopLoader();
      return navigateTo("/");
    }
  };

  // login
  const login = async (credentials: User, handelError: any = null) => {
    const response: any = await handleApiCall(() =>
      api.post(`${backendUrl}/login`, credentials)
    );

    if (response) {
      const { token: tokenValue, user: userValue } = response.data.result;

      successLogin(userValue, tokenValue);
    }

    if (handelError && error.value) handelError(error.value);
  };
  // login Tenant
  const loginTenant = async (credentials: User, handelError: any = null) => {
    const response: any = await handleApiCall(() =>
      api.post("/login-tenant", credentials)
    );

    if (response) {
      const { login_url, domain, token } = response.data.result;
      credentials.email = "";
      credentials.password = "";
      handelError({});

      window.open(login_url, "_blank");
    }

    if (handelError && error.value) handelError(error.value);
  };

  const loginWithGoogle = () => {
    if (tenant_name) {
      navigateTo(`https://${baseURl}/google?tenant_name=${tenant_name}`, {
        external: true,
      });
    } else {
      // 1) save where are from
      tenant_cookie.value = route.searchParams.get("tenant_name");

      const provider = "google";
      navigateTo(`${backendUrl}/auth/${provider}/url`, {
        external: true,
      });
    }
  };

  // register
  const register = async (
    userData: NewUser | NewCharity,
    handelError: any = null
  ) => {
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response: any = await handleApiCall(() =>
      api.post(`${backendUrl}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );

    if (response) {
      const { token: tokenValue, user: userValue } = response.data.result;
      setToken(encryptData(tokenValue));
      setUser(encryptData(userValue));
      setCode(userValue.verification_code);
      navigateTo("/verify-email");
    }
    if (handelError && error.value) handelError(error.value);
  };

  // Verify user email
  const verifyEmail = async (verificationCode: number | string) => {
    const response: any = await handleApiCall(() =>
      api.post(`${backendUrl}/verify-email`, {
        verification_code: verificationCode,
      })
    );

    if (response?.data.status && user.value) {
      navigateTo("/dashboard/" + user.value?.user_type);
    }
  };

  //  Logout the user
  const logout = async () => {
    await navigateTo("/");
    await handleApiCall(() => api.post(`${backendUrl}/logout`, {}));

    setUser(null);
    setToken(null);
  };

  const checkDomain = async (payload: any, cb: any, handelError: any) => {
    try {
      const res = await handleApiCall(() =>
        api.post(`${backendUrl}/check-domain`, payload)
      );

      if (res && cb) cb(res);
      else if (handelError && error.value) handelError(error.value);
    } catch (err) {
      console.error(err);
    }
  };

  const createTenant = async (payload: any, cb: any, handelError: any) => {
    try {
      const res = await handleApiCall(() =>
        api.post("/create-tenant", payload)
      );
      if (res && cb) cb(res);
      else if (handelError && error.value) handelError(error.value);
    } catch (err) {
      console.error(err);
    }
  };

  const setCurrentUser = async (newUser: any) => {
    if (user.value.email == newUser.email) {
      setUser(null);

      setUser(encryptData(newUser));
    } else {
      setUser(null);

      setUser(encryptData(newUser));
      await navigateTo("/verify-email");
    }
  };

  const editEmail = async (data: any) => {
    await handleApiCall(() => api.post(`${backendUrl}/edit/profile`, data));
  };

  const saveMobile = async (data: any, cb: any, handelError: any) => {
    const response = await handleApiCall(() =>
      api.post(`${backendUrl}/auth/google/user/data`, data)
    );

    if (response) {
      if (cb) cb(response);
    }

    if (handelError && error.value) handelError(error.value);
  };

  // return back object
  return {
    login,
    register,
    editEmail,
    checkDomain,
    createTenant,
    verifyEmail,
    logout,
    token,
    user,
    isLoading,
    error,
    setUser: setCurrentUser,
    saveMobile,
    successLogin,
    loginWithGoogle,
    loginTenant,
  };
}

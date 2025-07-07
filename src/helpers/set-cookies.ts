const week = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
export const setToken = (userToken: any) => {
  const tokenCookie: any = useCookie("token", {
    expires: week,
  });
  tokenCookie.value = userToken;
};

export const setUser = (userData: any) => {
  const userCookie: any = useCookie("user", {
    expires: week,
  });
  userCookie.value = userData;
};

export const setCode = (verrifyCode: any) => {
  const codeCookie: any = useCookie("verrification_code");
  codeCookie.value = verrifyCode;
};

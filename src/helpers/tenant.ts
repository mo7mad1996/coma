export const useTenant = () => {
  const url = useRequestURL();
  const hostname = url.hostname;

  const hostnameParts = hostname.split(".");
  const dname = import.meta.dev
    ? "host"
    : hostnameParts.some((i) => i == "orphansociety")
    ? "orphansociety"
    : "orphanssociety";

  let subdomain: string = "";

  if (hostnameParts.length >= 2) {
    const possibleSub = hostnameParts[0];

    if (possibleSub !== dname && possibleSub !== "www") {
      subdomain = possibleSub;
    }
  }

  if (subdomain == "192" && import.meta.dev) subdomain = "";

  const backendCentral = import.meta.env.VITE_BACKEND_CENTRAL;
  const backendApi = import.meta.env.VITE_BACKEND_API;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fullUrl =
    subdomain !== ""
      ? `https://${subdomain}.${backendCentral}${backendApi}`
      : backendUrl;

  const tenant_data: any = {};

  return {
    url: fullUrl,
    tenant_name: subdomain,
    central: backendCentral,
    backendUrl,
    tenant_data,
    hostname,
    baseURl: hostnameParts.some((i) => i == "orphansociety")
      ? "orphansociety.net"
      : "orphanssociety.com",
    setData(data: any) {
      this.tenant_data = data;
      return data;
    },
  };
};

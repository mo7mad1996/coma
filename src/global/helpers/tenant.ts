export const useTenant = () => {

  const url = useRequestURL();
  const hostname = url.hostname;
  const subdomainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\.]+)\./;
  const match = hostname.match(subdomainRegex);
  const dname = process.dev ? 'orphansociety' : 'orphanssociety';
  let subdomain = match && match[1] != dname ? match[1] : '';

  const backendCentral = import.meta.env.VITE_BACKEND_CENTRAL;
  const backendApi = import.meta.env.VITE_BACKEND_API;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fullUrl = subdomain !== '' ? `https://${subdomain}.${backendCentral}${backendApi}` : backendUrl;

  return {
    url: fullUrl,
    tenant_name: subdomain,
    central: backendCentral,
    tenant_data: process.client ? JSON.parse(localStorage.getItem('tenant_data')) : {},
  };
};

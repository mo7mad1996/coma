import { api } from "~/helpers/axios";

export const useCities = () => {
  const getCites = async (country_id: string) => {
    try {
      const req = await api.get("/cities", { params: { country_id } });
      return req;
    } catch (err) {
      return err;
    }
  };

  return {
    getCites,
  };
};

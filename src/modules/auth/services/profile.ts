import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";
import { useAuth } from "~/modules/auth/services/auth";

export const useProfile = () => {
  const { user } = useAuth();
  const { backendUrl } = useTenant();

  return {
    update(payload: any, files: File[]) {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("file[]", file, file.name);
      });

      for (const key in payload) {
        if (payload[key]) formData.append(key, payload[key]);
      }
      return api.post(`${backendUrl}/edit/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    changePassword(payload: any) {
      return api.post(`${backendUrl}/change/password`, payload);
    },
  };
};

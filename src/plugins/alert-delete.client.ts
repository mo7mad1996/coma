import Swal from "sweetalert2";

export default defineNuxtPlugin((nuxtApp) => {
  const method = (options: any): any => {
    const t = nuxtApp.vueApp.config.globalProperties.$t;

    const option = {
      imageHeight: 120,
      theme: "bulma",
      showCancelButton: true,
      text: t("donor.delete_question"),
      cancelButtonText: t("donor.cancel"),
      confirmButtonText: t("donor.remove"),
      customClass: {
        confirmButton:
          "text-red-400 !bg-red-50 hover:!bg-red-100 border !border-transparent",
        cancelButton: "!bg-transparent hover:border hover:!bg-neutral-100",
        backdrop: "bg-[#1113]",
        popup: "bg-neutral-100 pb-3 p-3",
        actions: "bg-white flex gap-2 w-full py-2 rounded-lg",
      },
      ...options,

      preConfirm: async () => {
        Swal.showLoading();
        await options.preConfirm?.call();
        Swal.hideLoading();
      },
    };

    return Swal.fire(option).then(() => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        title: t("global_dashboard.orphan_form.confirm_delete_orphan"),
        timer: 3000,
      });
      option.cb?.call();
    });
  };

  return {
    provide: {
      alertDeleteQuestion: method,
    },
  };
});

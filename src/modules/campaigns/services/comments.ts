import { api } from "~/helpers/axios";

export const useComments = (id: any) => {
  const { locale } = useI18n();
  const currentPage = ref(1);
  const per_page = ref(3);
  const isFinish = ref(false);
  const appendedComments = ref<any[]>([]);
  const isLoading = ref(false);

  const fetchData = () => {
    return api
      .get(`/get-comments/${id}`, {
        params: {
          page: currentPage.value,
          per_page: per_page.value,
        },
      })
      .then((response) => response.data.result);
  };

  const {
    data,
    error: commentsData_error,
    refresh,
    status,
    clear,
  } = useAsyncData(`comments-${id}-${locale.value}`, fetchData, {
    watch: [locale],
  });

  const comments = computed(
    () => [data.value?.data, appendedComments.value].flat() || []
  );
  const commentsMeta: any = computed(() => data.value?.meta || {});

  // methods
  const fetchComments = async () => {
    if (isLoading.value) return;
    if (commentsMeta.value.last_page >= currentPage.value) {
      try {
        isLoading.value = true;
        const res: any = await fetchData();
        appendedComments.value = [...appendedComments.value, ...res.data];
      } catch (err) {
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    } else {
      isFinish.value = true;
    }
  };
  watch(currentPage, fetchComments);
  watch(locale, () => (appendedComments.value = []));

  // return
  return {
    comments,
    commentsData_error,
    commentsMeta,
    refresh,
    status,
    isFinish,
    isLoading,
    clear,
    currentPage,
  };
};

export const sharePage = async (
  title: string = "",
  text: string = "",
  url: string = window.location.href
) => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Sharing is not supported on this device.");
  }
};

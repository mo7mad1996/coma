// @ts-expect-error
import { DateTime } from "luxon";

// format => '3 hours ago'
export const reFormat = (date: any) => {
  const { locale, t } = useI18n();

  if (!date) return "";

  const dt = DateTime.fromFormat(date, "yyyy-MM-dd HH:mm:ss", { zone: "utc" });

  const validDate = dt.isValid
    ? dt
    : DateTime.fromJSDate(new Date(date), { locale: locale.value });

  return validDate.isValid
    ? validDate.toRelative({ locale: locale.value, base: DateTime.now() }) ?? ""
    : "";
};

// format => '3 February 2025'
export const reFormat2 = (date: any) => {
  const { locale, t } = useI18n();

  if (!date) return "";

  const dt = DateTime.fromISO(date, { locale: locale.value });
  const validDate = dt.isValid
    ? dt
    : DateTime.fromJSDate(new Date(date), { locale: locale.value });

  return validDate.isValid
    ? validDate.toFormat("d LLLL yyyy") // example: 3 February 2025
    : "";
};

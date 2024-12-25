import { Rates } from "@lib/types/property";

export const getRateDisplay = (rates: Rates): string => {
  if (!rates) return "Rates not available";

  const { nightly, weekly, monthly } = rates;

  if (monthly) return `$${monthly.toLocaleString()}/month`;
  if (weekly) return `$${weekly.toLocaleString()}/week`;
  if (nightly) return `$${nightly.toLocaleString()}/night`;

  return "Rates not available";
};

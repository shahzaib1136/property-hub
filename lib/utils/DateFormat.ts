import { format } from "date-fns";

export const formatDate = (isoDate: string) => {
  return `Received: ${format(new Date(isoDate), "M/d/yyyy h:mm a")}`;
};

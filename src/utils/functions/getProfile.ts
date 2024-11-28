import { UserType } from "../../types/common/auth";
import variables from "../constants/variables";

export function getProfile(): UserType | null {
  const userData = localStorage.getItem(variables.PROFILE);

  if (!userData) {
    return null;
  }

  try {
    const parsedData: UserType = JSON.parse(userData);
    return parsedData;
  } catch (error) {
    console.error("Error parsing user data from localStorage", error);
    return null;
  }
}

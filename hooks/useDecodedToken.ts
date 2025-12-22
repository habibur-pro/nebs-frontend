import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  iat: number;

  [key: string]: unknown;
  firstName: string;
  lastName: string;
  photo?: string;
  email: string;
  role: string;
  id: string;
}

export function useDecodedToken(
  token: string | null | undefined
): DecodedToken | null {
  return useMemo(() => {
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }, [token]);
}

import { startRegistration } from "@simplewebauthn/browser";

export const regSetupCOmpl = async (
  setError: (error: string | null) => void
) => {
  try {
    const response = await fetch(
      "https://portalsapi.quadropic.com/register/setup",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.ok) {
      console.log("Data Updated SUCCESSFULLY", response.status);
    } else {
      // Handle server-side errors
      if (response.status === 401) {
        setError(
          "There's something wrong in generated Passkey. Please try again."
        );
      } else {
        setError("There's something wrong. Please try again later.");
      }
    }
  } catch (error) {
    // Handle client-side errors
    setError("An error occurred. Please check your network connection.");
    console.error("An error occurred");
  }
};

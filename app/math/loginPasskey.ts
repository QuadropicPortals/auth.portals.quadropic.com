import { startAuthentication } from "@simplewebauthn/browser";

export const loginPasskey = async (
  setError: (error: string | null) => void
) => {
  try {
    const response = await fetch(
      "https://portalsapi.quadropic.com/biometrics/getloginpasskey",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userId: "alexf1",
        }),
      }
    );

    if (response.ok) {
      console.log("Started Passkey Verification", response.status);
      const { options } = await response.json();
      const authRes = await startAuthentication(options);
      try {
        await fetch(
          "https://portalsapi.quadropic.com/biometrics/verifyloginpasskey",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              userId: "alexf1",
              cred: JSON.stringify(authRes),
            }),
          }
        );
      } catch (error) {
        console.error("An error occurred");
      }
    } else {
      // Handle server-side errors
      if (response.status === 401) {
        setError("Passkey was not compatible.");
      } else {
        setError("There's something wrong. Please try again later.");
      }
    }
  } catch (error) {
    // Handle client-side errors
    setError("An error occurred. Please check your network connection.");
    console.error("An error occurred", error);
  }
};

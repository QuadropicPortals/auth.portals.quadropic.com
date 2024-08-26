export const passwordLogin = async (
  setError: (error: string | null) => void
) => {
  try {
    const response = await fetch(
      "https://portalsapi.quadropic.com/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          id: "alexf1",
          password: "mypass",
        }),
      }
    );

    if (response.ok) {
      console.log("Login successful", response.status);
      // Perform necessary actions on successful login
    } else {
      // Handle server-side errors
      if (response.status === 401) {
        setError("Incorrect password. Please try again.");
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

export const registerUserStart = async (
  username: string,
  displayName: string,
  email: string
): Promise<Response> => {
  const response = await fetch(
    "https://portalsapi.quadropic.com/register/start",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id: username,
        dispname: displayName,
        email: email,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("There's something wrong. Please try again later.");
  }

  return response;
};

export const registerUserConfirm = async (otp: string): Promise<Response> => {
  const response = await fetch(
    "https://portalsapi.quadropic.com/register/complete",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        otp: otp,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error occured while confirming OTP");
  }

  return response;
};

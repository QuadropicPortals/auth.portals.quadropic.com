export const registerUserStart = async (
  username: string,
  displayName: string,
  email: string
): Promise<Response> => {
  const response = await fetch("http://localhost:8080/register/start", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      id: username,
      name: displayName,
      email: email,
    }),
  });

  if (!response.ok) {
    throw new Error("There's something wrong. Please try again later.");
  }

  return response;
};

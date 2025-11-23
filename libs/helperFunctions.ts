export default async function handleRegisterSubmit(
  email: string,
  password: string,
  name: string = ""
) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

  const data = await res.json();

  return {
    success: data.success || false,
    message: data.message,
    statusCode: res.status,
  };
}

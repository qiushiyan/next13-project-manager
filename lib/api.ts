import { CreateUserInput, LoginInput } from "./dto/auth";

export const fetcher = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body?: Object;
}) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data.data);
    return data.data;
  }

  // message returned in api routes by res.json()
  const { message } = await res.json();

  throw new Error(message);
};

export const login = async (input: LoginInput) => {
  return await fetcher({
    url: "/api/auth/login",
    method: "POST",
    body: input,
  });
};

export const register = async (input: CreateUserInput) => {
  return await fetcher({
    url: "/api/auth/register",
    method: "POST",
    body: input,
  });
};

export const logout = async () => {
  return await fetcher({
    url: "/api/auth/logout",
    method: "POST",
    body: undefined,
  });
};

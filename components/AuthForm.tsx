"use client";

import { register, login } from "@lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { useImmer } from "use-immer";

import Button from "./ui/Button";
import Card from "./ui/Card";
import ErrorBox from "./ui/Error";
import Input from "./ui/Input";
const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

interface Props {
  mode: "register" | "signin";
}

const initial = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const AuthForm = ({ mode }: Props) => {
  const [formState, setFormState] = useImmer(initial);
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      try {
        if (mode === "register") {
          await register(formState);
        } else {
          await login(formState);
        }

        router.replace("/home");
      } catch (e) {
        console.log(e);
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        // setFormState(initial);
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((draft) => {
                      draft.firstName = e.target.value;
                    })
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((draft) => {
                      draft.lastName = e.target.value;
                    })
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((draft) => {
                  draft.email = e.target.value;
                })
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((draft) => {
                  draft.password = e.target.value;
                })
              }
            />
          </div>
          {error && (
            <ErrorBox>
              <p>{error}</p>
            </ErrorBox>
          )}
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link href={content.linkUrl} className="text-blue-600">
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AuthForm;

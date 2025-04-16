import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      login(data.token);
      router.push("/");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      login(data.token);
      router.push("/");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out all required fields");
      return;
    }

    if (type === "login") {
      loginMutation.mutate({ email, password });
    } else {
      registerMutation.mutate({ email, password, name: name || undefined });
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {type === "register" && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="pl-3 pr-3 py-3 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all duration-200"

              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && error.includes("email") ? error : undefined}
              placeholder="your@email.com"
              className="pl-3 pr-3 py-3 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all duration-200"

            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && error.includes("password") ? error : undefined}
              placeholder="********"
              className="pl-3 pr-3 py-3 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all duration-200"

            />
          </div>
        </div>

        {error && !error.includes("email") && !error.includes("password") && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        <div>
          <Button
            type="submit"
            className="w-full py-3"
            isLoading={loginMutation.isPending || registerMutation.isPending}
          >
            {type === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
};

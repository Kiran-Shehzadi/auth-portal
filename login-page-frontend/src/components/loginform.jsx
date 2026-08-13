import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Temporary login simulation
    setTimeout(() => {
      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Remember me:", rememberMe);

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">

      {/* Mobile brand */}
      <div className="mb-10 lg:hidden">
        <h1 className="text-2xl font-semibold tracking-tight text-[#24483d]">
          KeenCodic<span className="text-[#9aa79f]">.</span>
        </h1>
      </div>

      {/* Header */}
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#789087]">
          Welcome back
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-[#1f2925] sm:text-4xl">
          Sign in to KeenCodic
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Enter your details below to access your account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-[#37413d]"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);

              if (errors.username) {
                setErrors({
                  ...errors,
                  username: "",
                });
              }
            }}
            placeholder="Enter your username"
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 ${
              errors.username
                ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
            }`}
          />

          {errors.username && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.username}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#37413d]"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (errors.password) {
                  setErrors({
                    ...errors,
                    password: "",
                  });
                }
              }}
              placeholder="Enter your password"
              className={`w-full rounded-xl border bg-white px-4 py-3 pr-20 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 ${
                errors.password
                  ? "border-red-400"
                  : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-2 text-xs font-medium text-gray-400 transition hover:text-[#5d7d70]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between">

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#5d7d70]"
            />

            <span className="text-xs text-gray-500">
              Remember me
            </span>
          </label>

          <button
            type="button"
            className="text-xs font-medium text-[#5d7d70] transition hover:text-[#3f5e52]"
          >
            Forgot password?
          </button>

        </div>

        {/* Login */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-[#5d7d70] px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#4d6d60] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs text-gray-400">
          or
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
      >
        <span className="text-base font-bold text-[#4285F4]">
          G
        </span>

        Sign in with Google
      </button>

      {/* Signup */}
      <p className="mt-8 text-center text-sm text-gray-500">
        New to KeenCodic?{" "}

        <Link
          to="/signup"
          className="font-medium text-[#5d7d70] underline-offset-4 transition hover:text-[#3f5e52] hover:underline"
        >
          Create an account
        </Link>
      </p>

    </div>
  );
};

export default LoginForm;
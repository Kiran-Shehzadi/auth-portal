import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Select your gender";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required";
    }

    if (!formData.email.trim()) {
  newErrors.email = "Email is required";
} else if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
) {
  newErrors.email = "Enter a valid email";
}

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        birthDate: formData.birthDate,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);

      setErrors({
        email: data.message || "Unable to create account.",
      });

      return;
    }

    console.log("Signup response:", data);

    setLoading(false);
    setShowSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 2500);
  } catch (error) {
    console.error("Signup error:", error);

    setLoading(false);

    setErrors({
      email: "Unable to connect to the server.",
    });
  }
};
  return (
    <>
      <div className="w-full max-w-xl">

        {/* Mobile brand */}
        <div className="mb-4 lg:hidden">
          <h1 className="text-2xl font-semibold text-[#24483d]">
            KeenCodic<span className="text-[#9aa79f]">.</span>
          </h1>
        </div>

        {/* Header */}
        <div className="mb-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#789087]">
            Join KeenCodic
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-[#1f2925] sm:text-3xl">
            Create your account
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Enter your details below to get started.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >

          {/* First + Last */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label
                htmlFor="firstName"
                className="mb-1 block text-xs font-medium text-[#37413d]"
              >
                First name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. John"
                className={`w-full rounded-lg border px-3 py-2.5 text-xs outline-none transition sm:text-sm ${
                  errors.firstName
                    ? "border-red-400"
                    : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
                }`}
              />

              {errors.firstName && (
                <p className="mt-0.5 text-[10px] text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-1 block text-xs font-medium text-[#37413d]"
              >
                Last name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g. Smith"
                className={`w-full rounded-lg border px-3 py-2.5 text-xs outline-none transition sm:text-sm ${
                  errors.lastName
                    ? "border-red-400"
                    : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
                }`}
              />

              {errors.lastName && (
                <p className="mt-0.5 text-[10px] text-red-500">
                  {errors.lastName}
                </p>
              )}
            </div>

          </div>

          {/* Gender + DOB */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label
                htmlFor="gender"
                className="mb-1 block text-xs font-medium text-[#37413d]"
              >
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-xs outline-none transition sm:text-sm ${
                  errors.gender
                    ? "border-red-400"
                    : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
                }`}
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">
                  Prefer not to say
                </option>
              </select>

              {errors.gender && (
                <p className="mt-0.5 text-[10px] text-red-500">
                  {errors.gender}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="birthDate"
                className="mb-1 block text-xs font-medium text-[#37413d]"
              >
                Birth date
              </label>

              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                title="Choose your birth date"
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-xs outline-none transition sm:text-sm ${
                  errors.birthDate
                    ? "border-red-400"
                    : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
                }`}
              />

              {errors.birthDate && (
                <p className="mt-0.5 text-[10px] text-red-500">
                  {errors.birthDate}
                </p>
              )}
            </div>

          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-[#37413d]"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john.smith@example.com"
              className={`w-full rounded-lg border px-3 py-2.5 text-xs outline-none transition sm:text-sm ${
                errors.email
                  ? "border-red-400"
                  : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
              }`}
            />

            {errors.email && (
              <p className="mt-0.5 text-[10px] text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-3">

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-medium text-[#37413d]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className={`w-full rounded-lg border px-3 py-2.5 pr-12 text-xs outline-none transition sm:text-sm ${
                    errors.password
                      ? "border-red-400"
                      : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-gray-400 hover:text-[#5d7d70]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-0.5 text-[10px] text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-xs font-medium text-[#37413d]"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full rounded-lg border px-3 py-2.5 pr-12 text-xs outline-none transition sm:text-sm ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-gray-200 focus:border-[#5d7d70] focus:ring-4 focus:ring-[#5d7d70]/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-gray-400 hover:text-[#5d7d70]"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-0.5 text-[10px] text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-center gap-2 pt-1">
            <input
              type="checkbox"
              required
              className="h-3.5 w-3.5 accent-[#5d7d70]"
            />

            <span className="text-[10px] text-gray-500 sm:text-xs">
              I agree to the KeenCodic terms and conditions.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#5d7d70] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4d6d60] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        {/* Login */}
        <p className="mt-4 text-center text-xs text-gray-500 sm:text-sm">
          Already have an account?{" "}

          <Link
            to="/"
            className="font-semibold text-[#5d7d70] hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#5d7d70]/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5d7d70] text-xl font-semibold text-white">
                ✓
              </div>
            </div>

            <h3 className="mt-5 text-2xl font-semibold text-[#1f2925]">
              Account created!
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Welcome to KeenCodic. Your account has been created successfully.
            </p>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-full origin-left animate-pulse bg-[#5d7d70]" />
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Redirecting you to the login page...
            </p>

          </div>

        </div>
      )}
    </>
  );
};

export default SignupForm;
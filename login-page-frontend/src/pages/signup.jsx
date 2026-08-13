import SignupForm from "../components/SignupForm";
import { useState } from "react";

const Signup = () => {
  return (
    <main className="min-h-screen bg-[#f3f4f0] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-xl sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">

        {/* LEFT SIDE */}
        <section
          className="relative hidden w-1/2 overflow-hidden lg:block"
          style={{
            backgroundImage: "url('/recodify-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#24483d]/70" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                KeenCodic<span className="text-white/50">.</span>
              </h1>
            </div>

            <div className="max-w-lg">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/60">
                Start your journey
              </p>

              <h2 className="text-4xl font-semibold leading-tight text-white xl:text-5xl">
                Create your KeenCodic account.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/70 xl:text-base">
                Join KeenCodic and create a space where you can learn, build,
                experiment and grow.
              </p>
            </div>

            <div className="flex justify-between text-xs text-white/50">
              <span>© 2026 KeenCodic</span>
              <span>Code your ideas.</span>
            </div>

          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex flex-1 items-center justify-center bg-white px-6 py-7 sm:px-10 lg:px-12 xl:px-14">
          <SignupForm />
        </section>

      </div>
    </main>
  );
};

export default Signup;
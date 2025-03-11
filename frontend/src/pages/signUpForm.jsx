import { useContext, useState } from "react";
import { AuthContext } from "../context.jsx/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export function SignUpForm() {
  const { onSignup, isLoading, rememberMe, setRememberMe } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await onSignup(data, (errorResponse) => {
      if (errorResponse.username) {
        setError("username", {
          type: "server",
          message: errorResponse.username,
        });
      }
      if (errorResponse.email) {
        setError("email", { type: "server", message: errorResponse.email });
      }
      if (errorResponse.detail) {
        setError("root", { type: "server", message: errorResponse.detail });
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[90%] md:w-[68%] flex flex-col gap-3"
    >
      <div>
        <label className="text-sm" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          {...register("username", { required: "username is required" })}
          className="border border-[#CBD5E1] bg-[#F8FAFC] rounded-xl px-3 text-sm py-2 w-full outline-none"
          placeholder="enter your username"
        />
        {errors.username && (
          <p className="text-[10px] text-red-500 mt-2">
            {errors.username.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name=""
          id="email"
          {...register("email", { required: "email is required" })}
          className="border border-[#CBD5E1] rounded-xl bg-[#F8FAFC] px-3 text-sm py-2 w-full outline-none"
          placeholder="enter your email"
        />
        {errors.email && (
          <p className="text-[10px] text-red-500 mt-2">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name=""
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 8 characters" },
          })}
          className="border border-[#CBD5E1] rounded-xl bg-[#F8FAFC] px-3 text-sm py-2 w-full outline-none"
          placeholder="create a password"
        />
        {errors.password && (
          <p className="text-[10px] text-red-500 mt-2">password is required</p>
        )}
      </div>

      <div className="flex flex-row w-full justify-between">
        <span className="flex flex-row gap-2">
          <input
            type="checkbox"
            name=""
            id=""
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <p>remember me</p>
        </span>
      </div>

      {errors.root && (
        <p className="text-xs text-red-500">{errors.root.message}</p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className={`bg-blue text-white py-3 ${
          isLoading && "opacity-75"
        } rounded-xl w-full`}
      >
        {isLoading ? "Signing up" : " Sign Up"}
      </button>

      <span className="flex flex-row gap-1 items-center w-full justify-center text-xs">
        <p>Already have an account?</p>
        <Link className="text-blue" to="/login">
          Login
        </Link>
      </span>
    </form>
  );
}

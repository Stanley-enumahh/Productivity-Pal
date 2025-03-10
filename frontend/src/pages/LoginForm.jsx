import { useContext, useState } from "react";
import { AuthContext } from "../context.jsx/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export function LoginForm() {
  const { isLoading, onLogin, rememberMe, setRememberMe, errorMessage } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await onLogin(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[90%] md:w-[70%] flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          {...register("username", { required: "username is required" })}
          className="border border-[#CBD5E1] bg-[#F8FAFC] rounded-xl px-3 text-sm md:py-2 py-3 w-full outline-none"
          placeholder="username"
        />
        {errors.username && (
          <p className="text-[10px] text-red-500 mt-2">username is required</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
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
          className="border border-[#CBD5E1] rounded-xl bg-[#F8FAFC] px-3 text-sm md:py-2 py-3 w-full outline-none"
          placeholder="password"
        />
        {errors.password && (
          <p className="text-[10px] text-red-500 mt-2">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex flex-row w-full justify-between">
        <span className="flex flex-row gap-2">
          <input
            type="checkbox"
            name=""
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe" className="text-sm">
            remember me
          </label>
        </span>
        <a href="" className="text-blue text-sm">
          Forgot password?
        </a>
      </div>

      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className={`bg-blue text-white md:py-3 py-3 ${
          isLoading && "opacity-75"
        } rounded-xl w-full`}
      >
        {isLoading ? "Loging in" : " Login"}
      </button>

      <span className="flex flex-row gap-1 items-center w-full justify-center text-xs">
        <p>Don't have an account?</p>
        <Link className="text-blue" to="/SignUp">
          Sign up
        </Link>
      </span>
    </form>
  );
}

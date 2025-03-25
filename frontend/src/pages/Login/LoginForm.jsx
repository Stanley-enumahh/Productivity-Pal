import { useState } from "react";
import { useAuth } from "../../context.jsx/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data.username, data.password, data.rememberMe);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
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
          <input type="checkbox" {...register("rememberMe")} />
          <label htmlFor="rememberMe" className="text-sm">
            remember me
          </label>
        </span>

        <Link to="/resetPassword" className="text-blue text-sm">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue text-white py-3
         rounded-xl w-full cursor-pointer"
      >
        {isLoading ? "Logging in" : " Login"}
      </button>

      <span className="flex flex-row gap-1 items-center w-full justify-center text-xs">
        <p>Don't have an account?</p>
        <Link className="text-blue" to="/signup">
          Sign up
        </Link>
      </span>
    </form>
  );
}

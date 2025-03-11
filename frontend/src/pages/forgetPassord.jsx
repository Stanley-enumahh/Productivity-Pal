import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import illustration from "../assets/20944361 1.png";
import { AuthContext } from "../context.jsx/AuthContext";
import api from "../utils/api";

export function ResetPasswordPage() {
  const { isLoading } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/password-reset/", data);
      setMessage("Check your email for reset instructions.");
    } catch (error) {
      setMessage("Error sending reset link. Try again.");
    }
  };
  return (
    <div className="w-full flex flex-row">
      <div className="w-[50%]">
        <img
          src={illustration}
          alt="illustration writing"
          className="w-[55%] object-cover"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 mt-20"
      >
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          className="border border-[#CBD5E1] rounded-xl bg-[#F8FAFC] px-3 text-sm md:py-2 py-3 w-full outline-none"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue text-white md:py-3 py-3 ${
            isLoading && "opacity-75"
          } rounded-xl w-full`}
        >
          {isLoading ? " sending" : "Send Reset Link"}
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
}

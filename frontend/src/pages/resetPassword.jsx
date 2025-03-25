import { useForm } from "react-hook-form";
// import { requestPasswordReset } from "../components/Auth";
import { useMutation } from "@tanstack/react-query";

export function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => requestPasswordReset(data.email),
  });

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () =>
        alert("A password reset link has been sent to your email."),
      onError: (error) =>
        alert(error.response?.data?.email?.[0] || "Failed to reset password."),
    });
  };
  return (
    <div className="flex flex-row h-screen">
      <div className="bg-blue w-[50%] h-full"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-2">
          <input
            type="email"
            {...register("email", {
              required: "email is required",
            })}
            className="border border-[#CBD5E1] rounded-xl bg-[#F8FAFC] px-3 text-sm py-2 w-full outline-none"
            placeholder="enter your email"
          />
          {errors.email && (
            <p className="text-[10px] text-red-500 mt-2">
              {errors.email.message}
            </p>
          )}
          <button
            className="bg-blue text-white py-3
         rounded-xl cursor-pointer w-fit h-fit"
          >
            {mutation.isLoading ? "sending" : "Request Rese"}
          </button>
        </div>
      </form>

      {mutation.isError && (
        <p style={{ color: "red" }}>{mutation.error.message}</p>
      )}
    </div>
  );
}

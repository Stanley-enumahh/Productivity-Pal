import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex flex-row w-full h-screen">
      <AnimationDiv />
      <SignUpDiv register={register} />
    </div>
  );
}

function AnimationDiv() {
  return <div className="w-[50%] h-full bg-blue-600"></div>;
}
function SignUpDiv({ register }) {
  return (
    <div className="w-[50%] h-full bg-white">
      <input
        type="text"
        name=""
        id=""
        {...register("fullname", { required: "fullname is required" })}
        className="border"
        placeholder="full name"
      />
      <input type="text" name="" id="" />
    </div>
  );
}

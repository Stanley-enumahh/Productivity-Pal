import illustration from "../../assets/20944361 1.png";
import googleIcon from "../../assets/devicon_google.png";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-col gap-6 bg-deep-blue w-[50%] h-full items-center justify-center">
        <h1 className="text-white text-2xl">Get started</h1>
        <img
          src={illustration}
          alt="illustration writing"
          className="w-[55%] object-cover"
        />
      </div>
      <div className="flex flex-col w-[50%] gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
        <p className=" text-gray-600">
          Your Tasks Are Waiting ,Log In and Stay on Track!
        </p>
        <SignUpGoogle />
        <div className="flex flex-row gap-2 w-[90%] md:w-[70%] justify-center items-center text-xs">
          <p className="h-[1px] bg-[#CBD5E1] w-[60%]"></p>
          <p>or</p>
          <p className="h-[1px] bg-[#CBD5E1] w-[60%]"></p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

function SignUpGoogle() {
  return (
    <button className="flex flex-row gap-3 justify-center rounded-xl border py-2 border-[#CBD5E1] items-center w-full md:w-[70%]">
      <img src={googleIcon} alt="google icon" />
      <p className="text-sm">sign up with google</p>
    </button>
  );
}

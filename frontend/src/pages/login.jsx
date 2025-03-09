import googleIcon from "../assets/devicon_google.png";
import illustration from "../assets/20944361 1.png";
import { LoginForm } from "./LoginForm";
export default function Login() {
  return (
    <div className="flex flex-row w-full h-screen bg-red-200">
      <div className="w-[50%] md:flex hidden flex flex-col gap-4 h-full bg-deep-blue justify-center items-center">
        <h1 className="text-white text-3xl font-semibold">Get Started</h1>
        <img
          src={illustration}
          alt="illustration"
          className="w-[55%] h-[55%] object-cover"
        />
      </div>
      <LoginDiv />
    </div>
  );
}

function LoginDiv() {
  return (
    <div className="md:w-[50%] w-full h-full gap-6 flex flex-col bg-white md:justify-center  items-center">
      <div className="w-[68%] flex flex-col gap-3 items-center md:mt-0 mt-[75px]">
        <h1 className="font-semibold text-2xl md:flex hidden">Welcome Back</h1>
        <h1 className="font-semibold text-2xl md:hidden flex">Login</h1>
        <p className="text-gray-600 text-xs md:flex hidden">
          Your Tasks Are Waiting ,Log In and Stay on Track!
        </p>
      </div>
      <SignUpGoogle />
      <div className="flex flex-row gap-2 w-[90%] md:w-[68%] justify-center items-center text-xs">
        <p className="h-[1px] bg-[#CBD5E1] w-[50%]"></p>
        <p>or</p>
        <p className="h-[1px] bg-[#CBD5E1] w-[50%]"></p>
      </div>
      <LoginForm />
    </div>
  );
}

function SignUpGoogle() {
  return (
    <button className="flex flex-row gap-3 justify-center rounded-xl border py-2 border-[#CBD5E1] items-center w-[90%] md:w-[68%]">
      <img src={googleIcon} alt="google icon" />
      <p className="text-sm">sign up with google</p>
    </button>
  );
}

import googleIcon from "../assets/devicon_google.png";
import { AnimationDiv } from "../components/signUpAnimation";
import { SignUpForm } from "./signUpForm";
export default function SignUp() {
  return (
    <div className="flex flex-row w-full h-screen">
      <AnimationDiv />
      <SignUpDiv />
    </div>
  );
}

function SignUpDiv() {
  return (
    <div className="w-full md:w-[50%] h-ful gap-6 md:gap-4 flex flex-col bg-white mt-[75px] md:mt-0 md:justify-center items-center">
      <div className="w-[90%] md:w-[68%] flex flex-col gap-3 justify-center">
        <h1 className="font-semibold text-[23px] ">
          Sign Up- <span className="text-blue ">Organize Tasks Faster</span>
        </h1>
        <p className="text-gray-600 text-xs md:flex hidden">
          The Smarter Way to Manage Your Work and Life Starts Here Create Your
          Account and Stay on Track!
        </p>
      </div>
      <SignUpGoogle />
      <div className="flex flex-row gap-2 w-[90%] md:w-[68%] justify-center items-center text-xs">
        <p className="h-[1px] bg-[#CBD5E1] w-[50%]"></p>
        <p>or</p>
        <p className="h-[1px] bg-[#CBD5E1] w-[50%]"></p>
      </div>
      <SignUpForm />
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

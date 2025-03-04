import { useEffect, useState } from "react";
import noProfile from "../assets/blank-profile-picture-973460_1280.png";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";
import { Profile } from "./profile";

export function Setting({ profile, profileImg, setProfile, setProfileImg }) {
  const [isEditting, setIsEditting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (profile && isEditting) {
      setValue("userName", profile.userName);
      setValue("email", profile.email);
      setValue("about", profile.about);
      setValue("gender", profile.gender);
    }
  });

  async function handleChangeProfileImg(e) {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          const base64Img = reader.result;
          setProfileImg(base64Img);
          localStorage.setItem("profileImg", base64Img);
        };
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  }

  function saveProfile(data) {
    localStorage.setItem("profile", JSON.stringify(data));
    setProfile(data);
    setIsEditting(false);
    reset();
  }

  function handleDeleteAccount() {
    setProfile(null);
    setProfileImg(null);
    localStorage.removeItem("profile");
    localStorage.removeItem("profileImg");
  }

  return (
    <div className="flex flex-col h-full w-full gap-5">
      <h1 className="text-black text-xl dark:text-white font-semibold">
        Account Setting
      </h1>
      <div className="flex flex-row w-full h-full relative justify-center">
        {profile && !isEditting ? (
          <Profile
            profile={profile}
            profileImg={profileImg}
            handleDeleteAccount={handleDeleteAccount}
            setIsEditting={setIsEditting}
          />
        ) : (
          <ProfileForm
            handleChangeProfileImg={handleChangeProfileImg}
            register={register}
            errors={errors}
            profileImg={profileImg}
            setProfileImg={setProfileImg}
            saveProfile={handleSubmit(saveProfile)}
          />
        )}
      </div>
    </div>
  );
}

function ProfileForm({
  handleChangeProfileImg,
  register,
  errors,
  profileImg,
  setProfileImg,
  saveProfile,
}) {
  return (
    <form
      onSubmit={saveProfile}
      className="w-[400px] h-fit p-7 rounded-lg flex flex-col gap-4 items-center bg-gray-200 dark:bg-[#0b3954] dark:text-neutral-200 transition-all duration-200"
    >
      <span className="flex flex-col justify-center items-center gap-3">
        <img
          src={profileImg ? profileImg : noProfile}
          alt="profile image"
          className="w-[100px] h-[100px] rounded-full object-cover shadow-lg"
        />
        <span className="flex flex-row gap-14 text-xs w-full">
          <label
            htmlFor="profileImage"
            className="cursor-pointer shadow px-3 py-1 rounded bg-blue-600 text-white"
          >
            {profileImg ? "Change image" : "Add image"}
          </label>
          {profileImg && (
            <button
              onClick={() => {
                setProfileImg(null);
                localStorage.removeItem({ profileImg });
              }}
              className="cursor-pointer shadow px-3 py-1 rounded bg-red-600 text-white"
            >
              Delete image
            </button>
          )}
        </span>
        <input
          type="file"
          name=""
          id="profileImage"
          accept="Image/*"
          onChange={handleChangeProfileImg}
          hidden
        />
      </span>

      <div className="flex flex-col gap-2 w-[80%]">
        <input
          {...register("userName", { required: true })}
          type="text"
          className="border px-3 w-full placeholder:dark:text-neutral-400 text-xs py-2 outline-none border-gray-400 transition-all duration-200 rounded-lg"
          placeholder="username"
        />
        {errors.userName && (
          <p className="text-[10px] text-red-500">Username required</p>
        )}
      </div>
      <div className="flex flex-row justify-between w-[80%] items-center">
        <div className="flex flex-col gap-2 w-[70%]">
          <input
            {...register("email", { required: true })}
            type="text"
            className="border px-3 transition-all duration-200 w-full placeholder:dark:text-neutral-400 text-xs py-2 outline-none border-gray-400 rounded-lg"
            placeholder="email"
          />
          {errors.email && (
            <p className="text-[10px] text-red-500">Email required</p>
          )}
        </div>

        <select
          {...register("gender")}
          className="border-none outline-none dark:text-black transition-all duration-200"
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-[80%]">
        <textarea
          {...register("about", { required: true })}
          type="text"
          className="border px-3 w-full text-xs placeholder:dark:text-neutral-400 py-4 outline-none border-gray-400 rounded-lg transition-all duration-200"
          placeholder="about"
        />
        {errors.about && (
          <p className="text-[10px] text-red-500">About required</p>
        )}
      </div>
      <button className="cursor-pointer shadow px-3 py-2 text-xs rounded bg-black text-white">
        save profile
      </button>
    </form>
  );
}

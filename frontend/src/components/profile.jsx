import noProfile from "../assets/blank-profile-picture-973460_1280.png";

export function Profile({
  profile,
  profileImg,
  handleDeleteAccount,
  setIsEditting,
}) {
  if (profile)
    return (
      <div className="w-full flex">
        <div className="w-[33%] bg-white dark:bg-[#3f4045] transition-all duration-200 flex flex-col gap-3 p-6 shadow-xl rounded-xl dark:text-neutral-200">
          <img
            src={profileImg ? profileImg : noProfile}
            alt="profile image"
            className="w-full h-[200px] object-cover rounded-xl shadow-lg"
          />
          <span className="flex flex-row justify-between">
            <h1 className="font-bold capitalize">{profile.userName}</h1>

            <h3 className="font-semibold text-xs">{profile.email}</h3>
          </span>

          <p className="text-xs text-justify">{profile.about}</p>
          <span className="w-full flex justify-between mt-[70px]">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 cursor-pointer hover:scale-95 transition-all saturate-200 text-sm shadow-lg rounded text-white py-2 w-[45%]"
            >
              Delete account
            </button>
            <button
              onClick={() => setIsEditting(true)}
              className="bg-blue-800 cursor-pointer hover:scale-95 transition-all saturate-200 text-sm shadow-lg rounded text-white py-2 w-[45%]"
            >
              Edit account
            </button>
          </span>
        </div>
      </div>
    );
}

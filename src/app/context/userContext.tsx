import React, { useEffect, useState } from "react";
import { ProfileData } from "../constants/types";
import { STORAGE_KEY } from "../constants/keys";

export type UserContextType = {
  profileData: ProfileData;
  isLoggedIn: boolean;
  setUser: (user: ProfileData) => void;
  getUser: () => void;
};

const UserContext = React.createContext<UserContextType>({
  profileData: {
    username: "",
    job: "",
    expiryTime: "",
  },
  isLoggedIn: false,
  setUser: (user: ProfileData) => {},
  getUser: () => {},
});

const UserContextProvider = (props: { children: React.ReactNode }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    job: "",
    expiryTime: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const setUser = (user: ProfileData) => {
    user.expiryTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setProfileData({ ...user });
    if (user.job !== "" && user.username !== "") {
      setIsLoggedIn(true);
    }
  };

  const getUser = () => {
    const item = window.localStorage.getItem(STORAGE_KEY);
    const profileData = item !== null ? JSON.parse(item) : null;
    const todaysDate = new Date();

    const isExpired = todaysDate > profileData?.expiryTime;
    const result = profileData !== null && !isExpired ? profileData : false;
    if (result) {
      setProfileData({ ...result });
      setIsLoggedIn(true);
    }
  };

  return (
    <UserContext.Provider
      value={{
        profileData,
        setUser,
        getUser,
        isLoggedIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
export default UserContext;

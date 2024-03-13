import React, { useEffect, useState } from "react";
import { ProfileData } from "../constants/types";
import { STORAGE_KEY } from "../constants/keys";

/*
Feeds the user data who is logged into the app, via React context
Interacts with window.localStorage to persist data between reloads
*/
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

  // Set a user data in local storage, to expire after 3 days
  const setUser = (user: ProfileData) => {
    user.expiryTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setProfileData({ ...user });
    if (user.job !== "" && user.username !== "") {
      setIsLoggedIn(true);
    }
  };

  // Get user from local storage if data exists and populate in state / context
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

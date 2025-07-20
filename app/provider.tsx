"use client";
import React, { use, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailsContext } from "@/context/userDetailsContext";

export type UserDetails = {
  name: string;
  email: string;
  credits: number;
};

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = React.useState<
    any
  >();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  // Function to create a new user
  const CreateNewUser = async () => {
    const result = await axios.post("/api/users");
    console.log("User created:", result.data.user);
    setUserDetails(result.data.user);
  };

  return (
    <div>
      <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
        {children}
      </UserDetailsContext.Provider> 
    </div>
  );
}

export default Provider;

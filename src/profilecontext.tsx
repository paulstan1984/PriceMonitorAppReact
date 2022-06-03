import React from "react";

export interface Profile {
    token: string;
}

const ProfileContext = React.createContext({
    profile: { token: '' },
    updateProfile: (p: Profile) => { },
    logout: () => { }
});

export default ProfileContext;

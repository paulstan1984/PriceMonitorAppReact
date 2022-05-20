import React from "react";

export interface Profile {
    token: string;
}

const PrifileContext = React.createContext({
    profile: {token: ''},
    updateProfile: (p: Profile) => { }
});

export default PrifileContext;

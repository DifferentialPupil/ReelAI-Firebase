import { Timestamp } from "firebase-admin/firestore";

export interface User {
    username: string;
    email: string;
    bio: string;
    profilepictureurl: string;
    createdat: Timestamp;
    updatedat: Timestamp;
}

// Helper function to convert Firestore data to User object
export const convertToUser = (data: any): User => {
    return {
        username: data.username,
        email: data.email,
        bio: data.bio,
        profilepictureurl: data.profilepictureurl,
        createdat: data.createdat,
        updatedat: data.updatedat
    };
}; 
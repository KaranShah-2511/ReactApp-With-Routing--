import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Post } from "./../../Services/PostServices";
import { User, UserService } from "../../Services/UserService";
import PostCard from "./../../Model/PostCard/PostCard";
import axios from "axios";

function Profile() {
  const userId: any = useParams().userId;
  const userService = new UserService();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    const getProfile = async () => {
      const response = await userService.getUserPosts(userId);
      setUserPosts(response);
    };
    const getUserProfile = async () => {
      const response = await userService.getUserProfile(userId);
      setProfile(response);
    };

    getUserProfile();
    getProfile();
  }, [userId]);

  return (
    <>
      <div className="title">Profile</div>
      <div className="user">
        <div className="user__name">{profile?.FullName}</div>
        <div className="user__name">{profile?.Email}</div>
      </div>
      <PostCard post={userPosts} />
    </>
  );
}

export default Profile;

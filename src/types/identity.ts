// src\types\identity.ts

export type Identity = {
  address: string;
  domain: string;
  ens: string;
  social: {
    twitter: string;
  };
  avatar: string;
  joinTime: number;
  followerCount: number;
  followingCount: number;
};

export type Pokemon = {
  name: string;
  image: string;
  id: number;
  artwork?: string;
  __typename: string;
};

export type ProfileData = {
  username: string;
  job: string;
  expiryTime?: Date | string;
};

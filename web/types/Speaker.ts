export type Speaker = {
  _id: string;
  name: string;
  title: string;
  bio?: {
    children: {
      text: string;
    }[];
  }[];
  photo: string;
  twitter: string;
};

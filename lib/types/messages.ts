export type MessageFormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  recipient: string;
  property: string;
};

export type MessageResponseType = {
  id: string;
  sender: {
    id: string;
    username: string;
  };
  recipient: string;
  property: {
    id: string;
    name: string;
  };
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
  createdAt: string;
};

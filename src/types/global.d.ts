declare module "*.pdf";

interface data {
  data: IData[];
  last_page: number;
}

interface IData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

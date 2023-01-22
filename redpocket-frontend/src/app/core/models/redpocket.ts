export default interface  RedPocketInterface {
  id: string;
  createdAt: string;
  title: string;
  method: string;
  type: string;
  code: string;
  poolTotal: number;
  winners: string[];
  amounts: number[];
}

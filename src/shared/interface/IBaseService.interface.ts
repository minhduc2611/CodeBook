export interface IBaseService {
  getAll: () => {};
  getOneById: {
    (id: string): Promise<any>;
  };
  deleteOneById: {
    (id: string): Promise<any>;
  };
  updateOneById: {
    (id: string, input: any): Promise<any>;
  };
  create: {
    (input: any): Promise<any>;
  };
}

import { MOCK_COURSES } from "@/constants/mockData";
import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";



export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({resource}: GetListParams) : Promise<GetListResponse<TData>> => {
    if(resource !== "courses") return {data: [] as unknown as TData[], total: 0 };

    return {
      data: MOCK_COURSES as unknown as TData[],
      total:  MOCK_COURSES.length,
    }
  },

  getOne: async () =>  {throw new Error("Not present in mock")},
  create: async () =>  {throw new Error("Not present in mock")},
  update: async () =>  {throw new Error("Not present in mock")},
  deleteOne: async () =>  {throw new Error("Not present in mock")},

  getApiUrl: () => "",
}
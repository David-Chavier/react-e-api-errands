import axios from 'axios';
import RequestLoginTypes from '../types/RequestLoginTypes';
import ListErrandsTypes from '../types/ListErrandsTypes';
import ErrandsTypes from '../types/ErrandsTypes';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export interface ApiResponse {
  ok: boolean;
  message: string;
  data?: any;
}

export class ApiService {
  public static async loginUser(props: RequestLoginTypes): Promise<ApiResponse> {
    try {
      const result = await api.post('/login', props);
      return result.data;
    } catch (err: any) {
      console.log(err.response.data);
      return err.response.data;
    }
  }

  public static async createUser(props: RequestLoginTypes): Promise<ApiResponse> {
    try {
      const result = await api.post('/user', props);

      return result.data;
    } catch (err: any) {
      console.log(err.response.data);
      return err.response.data;
    }
  }

  public static async listUsers(): Promise<ApiResponse> {
    try {
      const result = await api.get('/user');
      return result.data;
    } catch (err: any) {
      console.log(err.response.data);
      return err.response.data;
    }
  }

  public static async listErrands(props: ListErrandsTypes): Promise<ApiResponse> {
    try {
      const result = await api.get(`/user/${props.id}/errand`);
      return result.data;
    } catch (err: any) {
      console.log(err.response.data);
      return err.response.data;
    }
  }

  public static async createErrands(props: ErrandsTypes): Promise<ApiResponse> {
    try {
      const result = await api.post(`/user/${props.id}/errand`, props);
      return result.data;
    } catch (err: any) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
}

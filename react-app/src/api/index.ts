import axios, { AxiosRequestConfig } from 'axios';
import { CommitType } from '../types';

export class BackendAPI {
  private readonly baseUrl: string;

  constructor(baseUrl = process.env.REACT_APP_API_URL as string) {
    this.baseUrl = baseUrl;
  }

  async getCommits(config: AxiosRequestConfig): Promise<CommitType[]> {
    return (await axios.get(`${this.baseUrl}/github/commits`, config)).data;
  }
}

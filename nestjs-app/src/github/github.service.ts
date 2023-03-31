import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Commit } from 'src/types/commit';
import { Pagination } from 'src/types/pagination';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async getCommits(query: Pagination): Promise<Commit[]> {
    const { page, pageSize } = query;
    const { data } = await firstValueFrom(
      this.httpService
        .get<Commit[]>(
          `${process.env.GITHUB_API_URL}/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/commits`,
          {
            headers: {
              Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            },
            params: {
              per_page: pageSize || 20,
              page: page || 1,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { Pagination } from 'src/types/pagination';

@Controller('github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('/commits')
  getCommits(@Query() query: Pagination) {
    return this.githubService.getCommits(query);
  }
}

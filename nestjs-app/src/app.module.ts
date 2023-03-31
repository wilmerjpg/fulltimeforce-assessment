import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
@Module({
  imports: [ConfigModule.forRoot(), GithubModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

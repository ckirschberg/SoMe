import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [BooksModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

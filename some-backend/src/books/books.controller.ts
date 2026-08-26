import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    // DI - Dependency Injection - appService
      constructor(private readonly booksService: BooksService) {}

      @Get()
      getHiThere(): string {
        return this.booksService.getHiThere();
      }
      
}

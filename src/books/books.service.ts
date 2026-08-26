import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {

    getHiThere(): string {
        return 'Hi there!';
    }
}

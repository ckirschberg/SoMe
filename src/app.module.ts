import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';

@Module({
  imports: [
    // isGlobal means ConfigService can be injected anywhere without importing
    // this module again. Reads .env into process.env once, at start-up.
    ConfigModule.forRoot({ isGlobal: true }),

    // forRootAsync waits for the configuration before opening the connection.
    // The connection is opened once here; every repository shares it.
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [Post],
        // creates and alters tables from the entities. Useful now, never in
        // production - it will happily drop a column you renamed.
        synchronize: true,
      }),
    }),

    BooksModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

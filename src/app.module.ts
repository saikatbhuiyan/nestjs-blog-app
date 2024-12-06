import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './services/posts.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/providers/auth.service';

@Module({
  imports: [UsersModule, PostsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PostsService, AuthService],
})
export class AppModule {}

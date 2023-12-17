import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [VideosModule, UserModule, BlogModule, AuthModule]
})
export class FeaturesModule {}

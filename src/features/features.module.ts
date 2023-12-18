import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from './email/email.module';
import { TagModule } from './tag/tag.module';
import { CategorieModule } from './categorie/categorie.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    VideosModule,
    UserModule,
    BlogModule,
    AuthModule,
    EventModule,
    EmailModule,
    TagModule,
    CategorieModule
  ]
})
export class FeaturesModule {}

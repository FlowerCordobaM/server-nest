import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog, BlogSchema } from './model/blog.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/model/user.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}

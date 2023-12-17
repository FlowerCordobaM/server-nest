import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './model/video.scheme';
import { User, UserSchema } from '../user/model/user.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],

  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}

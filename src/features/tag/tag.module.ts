import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/model/user.scheme';
import { Tag, TagSchema } from '../tag/model/tag.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}

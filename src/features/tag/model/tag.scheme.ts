/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop()
  name: string;
  @Prop({ required: true })
  idAuthor: string;
}
export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.statics.findAllTags = function () {
  const list = this.aggregate([
    {
      $lookup: {
        from: 'users', //TODO
        foreignField: 'id',
        localField: 'idAuthor',
        as: 'author',
        pipeline: [
          //TODO esto actuando sobre la collection de users
          {
            $project: {
              _id: 0,
              name: 1,
              description: 1,
              avatar: 1
            }
          }
        ]
      }
    },
    {
      $unwind: '$author'
    }
  ]);

  return list;
};

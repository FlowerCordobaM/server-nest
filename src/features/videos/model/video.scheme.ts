/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  title: string;


  @Prop({ required: true })
  idAuthor: string;

  @Prop({ required: true })
  idBlog: string;


  @Prop()
  description: string;

  @Prop({ default: null })
  source: string;

  @Prop({ default: 0 })
  score: number;
}
export const VideoSchema = SchemaFactory.createForClass(Video);


VideoSchema.statics.findAllVideo = function () {
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
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: '$author',
    },
  ]);

  return list;
};

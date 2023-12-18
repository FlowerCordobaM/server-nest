/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type CategorieDocument = Categorie & Document;

@Schema({ timestamps: true })
export class Categorie {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop()
  name: string;
  @Prop({ required: true })
  idAuthor: string;
}
export const CategorieSchema = SchemaFactory.createForClass(Categorie);

CategorieSchema.statics.findAllCategories = function () {
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

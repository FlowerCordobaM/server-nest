/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  idAuthor: mongoose.Types.ObjectId;
  // idAuthor: string;

  @Prop()
  description: string;

  @Prop()
  cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Blog);

// CourseSchema.statics.findAllCourses = function () {
//   const list = this.aggregate([
//     {
//       $lookup: {
//         from: 'users', //TODO
//         foreignField: 'id',
//         localField: 'idAuthor',
//         as: 'author',
//         pipeline: [
//           //TODO esto actuando sobre la collection de users
//           {
//             $project: {
//               _id: 0,
//               name: 1,
//               email: 1,
//               avatar: 1,
//             },
//           },
//         ],
//       },
//     },
//     {
//       $unwind: '$author',
//     },
//   ]);

//   return list;
// };

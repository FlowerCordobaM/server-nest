/* eslint-disable prettier/prettier */

import { Model, Types } from 'mongoose';

export interface ModelExt<T> extends Model<T> {
  delete: (data: { _id: Types.ObjectId }) => void;
  paginate: (query: any, pagination: any) => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  findAllVideo: Function;
}

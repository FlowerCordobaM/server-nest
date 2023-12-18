/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './model/tag.scheme';
import { InjectModel } from '@nestjs/mongoose';
import { ModelExt } from 'src/shared/interfaces/shared.interfaces';
import { Types } from 'mongoose';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: ModelExt<TagDocument>
  ) {}
  async create(createTagDto: CreateTagDto) {
    const data = await this.tagModel.create(createTagDto); // Esto también es una promesa
    return { data };
  }

  async findAll() {
    const listData = this.tagModel.findAllTags();
    return listData;
  }
  async findAllDate() {
    const listData = this.tagModel.find({});
    return listData;
  }

  findOne(id: number) {
    return this.tagModel.findOne({ id });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return this.tagModel.findOneAndUpdate({ id }, updateTagDto, {
      upsert: true,
      new: true
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const resp = this.tagModel.delete({ _id });
    return resp;
  }
}

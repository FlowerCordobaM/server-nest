/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './model/video.scheme';
import { Types } from 'mongoose';
import { ModelExt } from 'src/shared/interfaces/shared.interfaces';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: ModelExt<VideoDocument>
  ) {}
  async create(createVideoDto: CreateVideoDto) {
    const data = await this.videoModel.create(createVideoDto); // Esto también es una promesa
    return { data };
  }

  async findAll() {
    const listData = this.videoModel.findAllVideo();
    return listData;
  }
  async findAllDate() {
    const listData = this.videoModel.find({});
    return listData;
  }

  async findOne(id: string) {
    return this.videoModel.findOne({ id });
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.videoModel.findOneAndUpdate({ id }, updateVideoDto, {
      upsert: true,
      new: true
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const resp = this.videoModel.delete({ _id });
    return resp;
  }
}

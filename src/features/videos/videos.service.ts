/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './model/video.scheme';
import { Model } from 'mongoose';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}
  async create(createVideoDto: CreateVideoDto) {
    // const user = await this.userModel.find({}).exec(); // Esto devuelve los datos reales
    const data = await this.videoModel.create(createVideoDto); // Esto también es una promesa
    return { data };
  }

  async findAll() {
    return `This action returns all videos`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  async remove(id: number) {
    return `This action removes a #${id} video`;
  }
}

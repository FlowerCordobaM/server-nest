/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, BlogDocument } from './model/blog.shema';
import { ModelExt } from 'src/shared/interfaces/shared.interfaces';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: ModelExt<BlogDocument>
  ) {}
  create(createBlogDto: CreateBlogDto) {
    const data = this.blogModel.create(createBlogDto);
    return data;
  }

  findAll() {
    return this.blogModel.find({});
  }
  findAllUser() {
    return this.blogModel.findAllBlog();
  }

  findOne(id: string) {
    return this.blogModel.findOne({ id });
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: string) {
    return `This action removes a #${id} blog`;
  }
}

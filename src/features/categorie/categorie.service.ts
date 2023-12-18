import { Injectable } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categorie, CategorieDocument } from './model/categorie.model';
import { ModelExt } from 'src/shared/interfaces/shared.interfaces';
import { Types } from 'mongoose';

@Injectable()
export class CategorieService {
  constructor(
    @InjectModel(Categorie.name)
    private readonly categorieModel: ModelExt<CategorieDocument>
  ) {}
  async create(createCategorieDto: CreateCategorieDto) {
    const data = await this.categorieModel.create(createCategorieDto);
    return data;
  }

  async findAll() {
    const listData = this.categorieModel.find({});
    return listData;
  }
  async findAllUser() {
    const listData = this.categorieModel.findAllCategories();
    return listData;
  }

  async findOne(id: string) {
    return this.categorieModel.findOne({ id });
  }

  update(id: string, updateCategorieDto: UpdateCategorieDto) {
    return this.categorieModel.findOneAndUpdate({ id }, updateCategorieDto, {
      upsert: true,
      new: true
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const resp = this.categorieModel.delete({ _id });
    return resp;
  }
}

import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorieSchema, Categorie } from '../categorie/model/categorie.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categorie.name, schema: CategorieSchema }
    ])
  ],
  controllers: [CategorieController],
  providers: [CategorieService]
})
export class CategorieModule {}

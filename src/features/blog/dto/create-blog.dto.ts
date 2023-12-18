import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty()
  @IsUUID()
  idAuthor: string;

  @ApiProperty()
  @IsUUID()
  idCategorie: string;

  @ApiProperty()
  @IsUUID()
  idTag: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 50)
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 50)
  title: string;
}

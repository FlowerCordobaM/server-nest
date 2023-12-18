import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsUUID } from 'class-validator';

export class CreateCategorieDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @ApiProperty()
  @IsUUID()
  idAuthor: string;
}

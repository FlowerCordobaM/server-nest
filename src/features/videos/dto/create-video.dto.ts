import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  // @ApiProperty({
  //   description: 'title',
  //   minimum: 1,
  //   default: 1,
  // })
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 50)
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 50)
  description: string;
  @ApiProperty()
  @IsUrl()
  src: string;
  @ApiProperty()
  @IsUUID()
  idAuthor: string;
}

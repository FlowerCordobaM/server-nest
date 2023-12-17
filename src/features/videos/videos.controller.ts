/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SlugPipe } from 'src/shared/helpers/slug.pipe';
import { LoggerInterceptor } from 'src/shared/helpers/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/helpers/handle.media';
import { JwtGuard } from 'src/core/jwt.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/core/roles.guard';
import { Rol } from 'src/shared/decorators/rol.decorator';

@ApiTags('videos')
// @UseInterceptors(LoggerInterceptor)
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() req: Request, @Body() createVideoDto: CreateVideoDto) {
    // console.log('Creating video, User:', req.user);
    try {
      return this.videosService.create(createVideoDto);
    } catch (error) {
      // console.error('Error creating video:', error);
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Rol(['admin'])
  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar', { storage }))
  @HttpCode(201)
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':title')
  @HttpCode(200)
  findOne(@Param('title', new SlugPipe()) title: string) {
    console.log(title);
    return this.videosService.findOne(1);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Rol(['admin', 'manager'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Rol(['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}

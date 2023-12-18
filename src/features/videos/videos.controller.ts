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
  // @UseGuards(JwtGuard, RolesGuard)
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
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', { storage }))
  @HttpCode(201)
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  // @UseGuards(JwtGuard, RolesGuard)
  // @Rol(['admin', 'user'])
  @Get('')
  @HttpCode(200)
  findAll() {
    return this.videosService.findAllDate();
  }
  // @UseGuards(JwtGuard, RolesGuard)
  // @Rol(['admin', 'user'])
  @Get('user/:id')
  @HttpCode(200)
  findAllUser() {
    return this.videosService.findAll();
  }

  // @UseGuards(JwtGuard, RolesGuard)
  // @Rol(['admin', 'user'])
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', new SlugPipe()) id: string) {
    console.log(+id);
    return this.videosService.findOne(id);
  }
  @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  // @Rol(['admin', 'manager'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Rol(['admin'])
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}

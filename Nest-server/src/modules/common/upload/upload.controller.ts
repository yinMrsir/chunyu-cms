/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import sizeOf from 'image-size';
import configuration from 'src/config/configuration';
import { join } from 'path';
import { Response, Request } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Public } from '../../../common/decorators/public.decorator';
import { Keep } from '../../../common/decorators/keep.decorator';

@ApiTags('文件上传')
@Controller('common')
export class UploadController {
  /* 单文件上传 */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('fileName') fileName,
  ) {
    if (file.mimetype === 'video/mp4') {
      const filePath =
        path.join(__dirname, '../../../../public/upload/videos/') +
        file.filename;
      await fs.move(file.path, filePath);
      return {
        fileName:
          configuration().publicPath + '/upload/videos/' + file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        name: file.filename,
        path: filePath,
      };
    }
    const dimensions = sizeOf(
      join(__dirname, '../../../../public/') + fileName,
    );
    return {
      fileName: configuration().publicPath + fileName,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      width: dimensions.width,
      height: dimensions.height,
    };
  }

  /* 数组文件上传 */
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFils(@UploadedFiles() files: Array<Express.Multer.File>) {
    /* 暂未处理 */
    return files;
  }

  @Public()
  @Keep()
  @Get('stream/:fileName')
  async streamFile(@Param('fileName') fileName: string, @Res() res: Response) {
    if (!res.req.headers.referer) {
      res.json({ message: '不合法', code: 201 });
      return;
    }
    const videoPath =
      path.join(__dirname, '../../../../public/upload/videos/') + fileName;
    const videoSize = fs.statSync(videoPath).size;
    const range = res.req.headers.range;
    console.log(res.req.headers.range);
    if (range) {
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      const contentLength = end - start + 1;
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
    } else {
      const headers = {
        'Content-Length': videoSize,
        'Content-Type': 'video/mp4',
      };
      const fileStream = fs.createReadStream(videoPath);
      res.writeHead(200, headers);
      fileStream.pipe(res);
    }
  }
}

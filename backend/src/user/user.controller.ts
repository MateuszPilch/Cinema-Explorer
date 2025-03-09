import { Body, Controller, Get, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MediaReview } from '../../../shared/models/media/media-review';
import { MediaReviewDto } from './dto/media-review.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService) {}

  @Get('allmedialist')
  getAllMediaList(@Query() params: any): Promise<MediaReview[]> {
    return this.userService.getAllMediaList(params.nickname, params.loaded);
  }

  @Get('medialistcount')
  getMediaListCount(@Query() params: any): Promise<number> {
    return this.userService.getMediaListCount(params.nickname, params.filterKey, params.filterValue);
  }

  @Get('filtredmedialist')
  getFiltredMediaList(@Query() params: any): Promise<MediaReview[]> {
    return this.userService.getFiltredMediaList(params.nickname, params.loaded, params.sort_by, params.filterKey ,params.filterValue);
  }

  @Get('mediareview')
  @UseGuards(AuthGuard('jwt'))
  getMediaReview(@Req() req, @Query() params: any): Promise<MediaReview> {
    return this.userService.getMediaReview(req.user._id, params.media_id, params.media_type);
  }

  @Post('mediareview')
  @UseGuards(AuthGuard('jwt'))
  setMediaReview(@Req() req, @Body() mediaReview: MediaReviewDto): Promise<any> {
    return this.userService.setMediaReview(req.user._id, mediaReview);
  }

  @Get('avatar')
  getAvatar(@Query() params: any): Promise<any> {
    return this.userService.getAvatar(params.nickname);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(AuthGuard('jwt'))
  setAvatar(@Req() req, @UploadedFile() avatar: Express.Multer.File): Promise<any> {
    return this.userService.setAvatar(req.user._id, avatar);
  }
}

import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MovieReview } from 'shared/models/movie/movie-review';
import { MovieReviewDto } from 'src/user/dto/moviereview.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService) {}

  @Get('movielist')
  @UseGuards(AuthGuard('jwt'))
  getMovieList(@Req() req, @Query() params: any): Promise<MovieReview[]> {
    return this.userService.getMovieList(req.user._id);
  }

  @Get('moviereview')
  @UseGuards(AuthGuard('jwt'))
  getMovieReview(@Req() req, @Query() params: any): Promise<MovieReview> {
    return this.userService.getMovieReview(req.user._id, params.movie_id);
  }

  @Post('moviereview')
  @UseGuards(AuthGuard('jwt'))
  setMovieReview(@Req() req, @Body() movieReview: MovieReviewDto): Promise<any> {
    return this.userService.setMovieReview(req.user._id, movieReview);
  }
}

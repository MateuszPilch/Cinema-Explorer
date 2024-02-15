import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { MediaReview } from '../../../shared/models/media/media-review';
import { MediaReviewDto } from './dto/media-review.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllMediaList(nickname: string, loaded: string): Promise<MediaReview[]> {
    const data = await this.userModel.findOne({nickname});
    data.media_list.sort((a, b) => {return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()});
    const res = data.media_list.slice(Number(loaded), Number(loaded) + 10);
    return res;
  }

  async getMediaListCount(nickname: string, filterKey: string, filterValue: string): Promise<number> {
    const data = await this.userModel.findOne({nickname});
    if (filterKey && filterValue !== '') {
      data.media_list = data.media_list.filter((filter) => {
        return filter[filterKey].toString() == filterValue;
      });
    }
    return data.media_list.length;
  }
  
  async getFiltredMediaList(nickname: string, loaded: string, sort_by: string, filterKey: string, filterValue: string): Promise<MediaReview[]> {
    const data = await this.userModel.findOne({nickname});
    if (filterKey && filterValue !== '') {
      data.media_list = data.media_list.filter((filter) => {
        return filter[filterKey].toString() == filterValue;
      });
    }
    switch(sort_by) { 
      case 'rating_asc': { 
        data.media_list.sort((a, b) => {return a.rating - b.rating});
        break; 
      } 
      case 'rating_desc': { 
        data.media_list.sort((a, b) => {return b.rating - a.rating});
        break; 
      }
      case 'createdAt_asc': { 
        data.media_list.sort((a, b) => {return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()});
        break; 
      } 
      case 'createdAt_desc': { 
        data.media_list.sort((a, b) => {return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()});
        break; 
      } 
      default: {
        break; 
      } 
    }
    const res = data.media_list.slice(Number(loaded), Number(loaded) + 10);
    return res;
  }

  async getMediaReview(_id: string, media_id: number, media_type: string): Promise<MediaReview> {
    const data = await this.userModel.findById(_id);
    const res = plainToInstance(MediaReview,data.media_list.find(media => media.media_id === Number(media_id) && media.media_type === media_type));
    return res;
  }

  async setMediaReview(_id: string, mediaReview: MediaReviewDto): Promise<any> {
    const data = await this.userModel.findById(_id);
    const mediaIndex = data.media_list.findIndex(media => media.media_id === mediaReview.media_id && media.media_type === mediaReview.media_type);

    if (mediaIndex === -1) {
      data.media_list.push({
        media_id: mediaReview.media_id,
        media_type: mediaReview.media_type,
        title: mediaReview.title,
        poster_path: mediaReview.poster_path,
        rating: mediaReview.rating,
        review: mediaReview.review,
        favourite: mediaReview.favourite,
        to_watch: mediaReview.to_watch,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      if(mediaReview.rating == 0 && !mediaReview.favourite && !mediaReview.to_watch) {
        data.media_list.splice(mediaIndex, 1);
      } else {
        data.media_list[mediaIndex].rating = mediaReview.rating;
        data.media_list[mediaIndex].review = mediaReview.review;
        data.media_list[mediaIndex].favourite = mediaReview.favourite;
        data.media_list[mediaIndex].to_watch = mediaReview.to_watch;
        data.media_list[mediaIndex].updatedAt = new Date();
      }
    }
    data.markModified('media_list');
    await data.save();
  }

  async getAvatar(nickname: string) : Promise<any> { 
    const data = await this.userModel.findOne({nickname});
    const res = data.avatar;
    return res;
  }

  async setAvatar(_id: string, avatar: Express.Multer.File) : Promise<any> { 
    const data = await this.userModel.findById(_id);
    data.avatar = avatar;
    data.save();
  }
}
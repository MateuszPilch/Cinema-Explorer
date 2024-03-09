/// <reference types="multer" />
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { MediaReview } from '../../../shared/models/media/media-review';
import { MediaReviewDto } from './dto/media-review.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllMediaList(nickname: string, loaded: string): Promise<MediaReview[]>;
    getMediaListCount(nickname: string, filterKey: string, filterValue: string): Promise<number>;
    getFiltredMediaList(nickname: string, loaded: string, sort_by: string, filterKey: string, filterValue: string): Promise<MediaReview[]>;
    getMediaReview(_id: string, media_id: number, media_type: string): Promise<MediaReview>;
    setMediaReview(_id: string, mediaReview: MediaReviewDto): Promise<any>;
    getAvatar(nickname: string): Promise<any>;
    setAvatar(_id: string, avatar: Express.Multer.File): Promise<any>;
}

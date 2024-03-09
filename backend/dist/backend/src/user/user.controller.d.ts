/// <reference types="multer" />
import { MediaReview } from 'shared/models/media/media-review';
import { MediaReviewDto } from 'src/user/dto/media-review.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllMediaList(params: any): Promise<MediaReview[]>;
    getMediaListCount(params: any): Promise<number>;
    getFiltredMediaList(params: any): Promise<MediaReview[]>;
    getMediaReview(req: any, params: any): Promise<MediaReview>;
    setMediaReview(req: any, mediaReview: MediaReviewDto): Promise<any>;
    getAvatar(params: any): Promise<any>;
    setAvatar(req: any, avatar: Express.Multer.File): Promise<any>;
}

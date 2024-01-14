import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaReview } from 'shared/models/media/media-review';
import { MediaFilter } from 'shared/models/media/media-filter';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mediaReviewList!: MediaReview[];
  mediaReviewListFiltered!: MediaReview[]

  mediaSortBy: string = 'Sortuj';
  mediaFilter: MediaFilter = new MediaFilter();

  constructor(private http: HttpClient) {}
  
  setFilter(property: keyof any, value: any): void {
    this.mediaFilter.setFilter(property, value);
  }

  clearFilter(): void {
    this.mediaFilter.clearFilter();
  }

  setMediaListFilter(): void {
    this.mediaReviewListFiltered = this.mediaReviewList.filter(filter => {
      for (const key in this.mediaFilter) {
        const mediaFilterValue = this.mediaFilter[key as keyof MediaFilter];
        const filterValue = filter[key as keyof MediaReview];
        if (mediaFilterValue === null) {
          continue;
        }
        if (filterValue !== mediaFilterValue) {
          return false;
        }
      }
      return true;
    });
  }

  setMediaListSort(): void {
    switch(this.mediaSortBy) { 
      case 'rating_asc': { 
        this.mediaReviewListFiltered.sort((a, b) => {return a.rating - b.rating});
        break; 
      } 
      case 'rating_desc': { 
        this.mediaReviewListFiltered.sort((a, b) => {return b.rating - a.rating});
        break; 
      }
      case 'createdAt_asc': { 
        this.mediaReviewListFiltered.sort((a, b) => {return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()});
        break; 
      } 
      case 'createdAt_desc': { 
        this.mediaReviewListFiltered.sort((a, b) => {return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()});
        break; 
      } 
      default: {
        break; 
      } 
    } 
  }

  getMediaList(nickname: string): void {
    this.mediaReviewList = [];
    this.http.get<MediaReview[]>(`http://localhost:3000/api/user/medialist`,{
      params: {
        nickname 
      }
    }).subscribe(data => {
      if(data) {
        this.mediaReviewList = data;
        this.mediaReviewList.sort((a, b) => {return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()});
        this.mediaReviewListFiltered = this.mediaReviewList;
      }
    });
  }

  getMediaReview(media_id: number, media_type: string): Observable<MediaReview> {
    return this.http.get<MediaReview>(`http://localhost:3000/api/user/mediareview`,{
      params: {
        media_id,
        media_type
      }
    });
  }

  setMediaReview(media_id: number, media_type: string, title: string, poster_path: string, rating: number, review: string, favourite: boolean, to_watch: boolean): void {
    firstValueFrom(this.http.post(`http://localhost:3000/api/user/mediareview`,{
      media_id,
      media_type,
      title,
      poster_path,
      rating,
      review,
      favourite,
      to_watch
    }));
  }

  getAvatar(nickname: string): Observable<string> {
    return this.http.get<any>('http://localhost:3000/api/user/avatar', {
      params: {
        nickname
      }
    });
  }

  setAvatar(avatar: File): void {
    const formData = new FormData();
    formData.append('avatar', avatar);
    firstValueFrom(this.http.post('http://localhost:3000/api/user/avatar', formData));
  }
}

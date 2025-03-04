import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaReview } from '../../../shared/models/media/media-review';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  filterKey: string = '';
  filterValue: string = '';

  constructor(private http: HttpClient) {}

  setFilter(filterKey: string, filterValue: string): void {
    this.filterKey = filterKey;
    this.filterValue = filterValue;
  }

  getAllMediaList(nickname: string, loaded: number): Observable<MediaReview[]> {
    return this.http.get<MediaReview[]>(`${environment.backendUrl}/user/allmedialist`,{
      params: {
        nickname, 
        loaded
      }
    });
  }

  getMediaListCount(nickname: string,  filterKey: string, filterValue: string): Observable<number> {
    return this.http.get<number>(`${environment.backendUrl}/user/medialistcount`,{
      params: {
        nickname,
        filterKey,
        filterValue
      },
    });
  }

  getFiltredMediaList(nickname: string, loaded: number, sort_by: string): Observable<MediaReview[]> {
    return this.http.get<MediaReview[]>(`${environment.backendUrl}/user/filtredmedialist`,{
      params: {
        nickname, 
        loaded,
        sort_by,
        filterKey: this.filterKey,
        filterValue: this.filterValue
      },
    });
  }

  getMediaReview(media_id: number, media_type: string): Observable<MediaReview> {
    return this.http.get<MediaReview>(`${environment.backendUrl}/user/mediareview`,{
      params: {
        media_id,
        media_type
      }
    });
  }

  setMediaReview(media_id: number, media_type: string, title: string, poster_path: string, rating: number, review: string, favourite: boolean, to_watch: boolean): void {
    firstValueFrom(this.http.post(`${environment.backendUrl}/user/mediareview`,{
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
    return this.http.get<any>(`${environment.backendUrl}/user/avatar`, {
      params: {
        nickname
      }
    });
  }

  setAvatar(avatar: File): void {
    const formData = new FormData();
    formData.append('avatar', avatar);
    firstValueFrom(this.http.post(`${environment.backendUrl}/user/avatar`, formData));
  }
}

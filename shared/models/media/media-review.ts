import { Expose } from "class-transformer";

export class MediaReview
{
  @Expose()
  media_id!: number;

  @Expose()
  media_type!: string;

  @Expose()
  title!: string;

  @Expose()
  poster_path!: string;

  @Expose()
  rating!: number;

  @Expose()
  review!: string;

  @Expose()
  favourite!: boolean;

  @Expose()
  to_watch!: boolean;

  @Expose()
  createdAt!: Date;
}
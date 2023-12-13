export class MediaFilter {

  media_type!: string;

  favourite!: boolean;
  
  to_watch!: boolean;

  setFilter(property: keyof any, value: any): void {
    (this as any)[property] = value;
  }

  clearFilter(): void {
    Object.keys(this).forEach((i) => (this as any)[i] = null);
  }
}
export class ArticleModel {
    id!: number;
    title!: {
        rendered: string;
    };
    content!: {
        rendered: string;
    };
    status!: string;
    link!: string;
    featured_media!: number;
    source_url!: string;
    image_url!: string;
}
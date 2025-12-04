export class NewsModel {
    section!: string;
    results!: {
        section: string;
        title: string;
        abstract: string;
        url: string;
        multimedia: {
            url: string;
            format: string;
            height: number;
            width: number;
            type: string;
            subtype: string;
            caption: string;
            copyright: string;
        }[];
    }[];
}
/// <reference types="node" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
declare class Image {
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
declare class MapData {
    _id: string;
    user_id: string;
    name: string;
    runtime: string;
    episode: string;
    description: string;
    center: number[];
    radius: number;
    image: Image;
}
export declare class Map extends Document {
    media_id: number;
    media_type: string;
    map_data: MapData[];
}
export declare const MapSchema: import("mongoose").Schema<Map, import("mongoose").Model<Map, any, any, any, Document<unknown, any, Map> & Map & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Map, Document<unknown, {}, import("mongoose").FlatRecord<Map>> & import("mongoose").FlatRecord<Map> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export {};

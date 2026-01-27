

export interface TokenPayload {
    id: string,
    email: string,
    role?: "admin" | "staff"
}

// export interface JWTPayloadType {
//     id: string,
//     isAdmin: boolean,
// }

// export interface RequestWithUser extends Request {
//     user?: JWTPayloadType,
//     cookies: { token?: string },
// }

export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

// export interface FilesRequest extends Request {
//     files?: any[]
// }

export interface BookingType {
    _id: string,
    roomId: string;
    roomNumber: number;
    userId: string;
    checkIn: string;
    checkOut: string;

}



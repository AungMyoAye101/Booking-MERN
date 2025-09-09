export interface JWTPayloadType {
    id: string,
    isAdmin: boolean,
}

export interface RequestWithUser extends Request {
    user?: JWTPayloadType,
    cookies: { token?: string },
}

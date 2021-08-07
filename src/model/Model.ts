export interface User {
    userName: string|undefined,
    email:string|undefined
}

export interface UserAttribute{
    Name: string,
    Value: string,
}

export interface SpaceObject{
    spaceId: string,
    name:string,
    location: string,
    photoUrl?: string,
}
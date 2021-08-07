import { SpaceObject } from "../model/Model";

export class DataService{

    public async getSpace(): Promise<SpaceObject[]>{
        const result: SpaceObject[] = []
        result.push({
            location: 'Paris',
            name: 'Best Location',
            spaceId: '123'
        });
        result.push({
            location: 'Paris',
            name: 'Best Location',
            spaceId: '124'
        });
        result.push({
            location: 'Paris',
            name: 'Best Location',
            spaceId: '125'
        });
        return result;
    }

     public async reserveSpace(spaceId: string):Promise<string | undefined> {
        if (spaceId === '123') {
            return('5555')
        } else {
            return undefined
        }
    }

}
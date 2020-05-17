export class JALVideo {
  videourl: string;
  offset: number;
  id: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;

  constructor(url: string, offset: number, id: string, x: number, y: number, sizeX: number, sizeY: number) {
    this.offset = offset;
    this.videourl = url;
    this.id = id;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;

  }

}

export interface JALUser {
  email: string;
  lastname: string;
  name: string;
  userId: string;
  projects: [JALProject];
}

export interface JALProject {
  name: string;
  projectid: string;

}

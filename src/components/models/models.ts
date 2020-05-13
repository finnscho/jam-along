export class JALVideo {
  videourl: string;
  offset: number;
  id: string;
  constructor(url: string, offset: number, id: string) {
    this.offset = offset;
    this.videourl = url;
    this.id = id;

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

export class JALVideo {
  videourl: string;
  offset: number;
  constructor(url: string, offset: number) {
    this.offset = offset;
    this.videourl = url;

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

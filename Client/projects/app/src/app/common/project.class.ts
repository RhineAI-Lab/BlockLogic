import { BFile } from './bfile.class';

export class Project {
  static readonly TYPE_SINGLE = 0;
  static readonly TYPE_FOLDER = 1;

  static readonly ENGINE_BLOGIC = 0;
  static readonly ENGINE_AUTOJS = 1;
  static readonly ENGINE_HARMONY = 2;
  static readonly ENGINE_PYTORCH = 3;

  type: number;
  engine: number;
  files: BFile[];
  target: number;

  constructor(
    files?: BFile[],
    type: number = Project.TYPE_SINGLE,
    engine: number = Project.ENGINE_BLOGIC,
  ) {
    this.type = type;
    this.engine = engine;
    if (files && files.length != 0) {
      this.files = files;
      this.target = 0;
    } else {
      this.files = [new BFile(new File([], ''))];
      this.target = 0;
    }
  }

  getTargetFile(): BFile {
    return this.files[this.target];
  }
}

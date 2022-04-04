import { ProjectFile } from './project-file.class';

export class Project {
  static readonly TYPE_SINGLE = 0;
  static readonly TYPE_FOLDER = 1;

  static readonly ENGINE_BLOGIC = 0;
  static readonly ENGINE_AUTOJS = 1;
  static readonly ENGINE_HARMONY = 2;
  static readonly ENGINE_PYTORCH = 3;

  type: number;
  engine: number;
  files: ProjectFile[];
  target: number;

  constructor(
    files?: ProjectFile[],
    type: number = Project.TYPE_SINGLE,
    engine: number = Project.ENGINE_BLOGIC,
  ) {
    this.type = type;
    this.engine = engine;
    if (files && files.length != 0) {
      this.files = files;
      this.target = 0;
    } else {
      this.files = [new ProjectFile(new File([], ''))];
      this.target = 0;
    }
  }

  getTargetFile(): ProjectFile {
    return this.files[this.target];
  }
}

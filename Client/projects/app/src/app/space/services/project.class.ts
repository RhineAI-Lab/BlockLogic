
export class Project {
    static readonly TYPE_SINGLE = 0;
    static readonly TYPE_FOLDER = 1;

    static readonly ENGINE_BLOGIC = 0;
    static readonly ENGINE_AUTOJS = 1;
    static readonly ENGINE_HARMONY = 2;
    static readonly ENGINE_PYTORCH = 3;

    type: number;
    engine: number;
    path: string;


    constructor(type: number, engine: number, path: string) {
        this.type = type;
        this.engine = engine;
        this.path = path;
    }

    static getDefaultProject(): Project{
        return new Project(
            Project.TYPE_SINGLE,
            Project.ENGINE_BLOGIC,
            ''
        )
    }
}
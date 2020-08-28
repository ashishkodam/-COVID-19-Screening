import { BaseModel } from '../../_base/crud';
export class Projects extends BaseModel{
    id: number;
    title: string;
    desc: string;
    startdate:Date;
    enddate:Date;
    assign:string[];
    backlogs:[{
        id:number;
        itemname:string;
        assignedTo:[];
        itemtype:string;
        startdate:Date;
        enddate:Date;
        stauts:string; 
        priority:string;
        description:string;
        comments:[
            {
            comment:string
            commentedby:string
        }
    ]
    }
    ];
    clear(): void {
        this.id = undefined;
        this.title = '';
        this.desc = '';
        this.startdate =null;
        this.enddate = null;
        this.assign =null;
        this.backlogs = null
	}
}

import { IAssisteds } from "./IAssisteds"
import { IConferences } from "./IConferences"


export interface IVisits {
    id: number
    user_id: number,
    visit_date: string,
    creation_date: string,
    visit_description: string,
    assisted_id: Array<IAssisteds>
    conference_id: Array<IConferences>
    
}


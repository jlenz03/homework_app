import Timer from "@/models/TimerModel";

class Assignment extends Timer{
    static type = 'Assignment';

    constructor(id,title, due, completed, user_complete, class_name, type, bid) {
        // call parent
        super( id, title, due, completed, user_complete);

        // additional properties

        this.class_name = class_name || '';
        this.type = type || '';
        this.bid = bid || [];
    }
}

export default Assignment;
//import Timer from "@/models/TimerModel";
// @ = src folder
//could have also been "../models/TimerModel
function Timer( id, title, due, completed, user_complete) {
    // Store date as a string in the format 'YYYY-MM-DD'
    this.id = id || ''
    this.title = title || ''
    this.due = due || ''; // Store as a string in the format 'YYYY-MM-DD'
    this.completed = completed || false; // Use a boolean for completed
    this.user_complete = user_complete || ''; // Use a boolean for completed






    if (this.due.seconds) {
        this.due= new Date(this.due.seconds*1000);
    }
    // Method to format the due date
    this.formatDate = function () {
        if (typeof this.due === 'string' && this.due.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
            const dateParts = this.due.split('-');
            const formattedDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1 , dateParts[2] )).toLocaleDateString('en-US', options);
            return formattedDate;
        }
        // If the due date is already a Date object, return it as is
        if (this.due instanceof Date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' , timeZone: 'UTC'};
            return this.due.toLocaleDateString('en-US', options);
        }
        // Return an empty string if the due date is not in a valid format
        return '';
    };
}
Timer.prototype.completeAssignment = function () {

        this.completed = true; // Mark the assignment as completed
        if (!this.user_complete) {
            // Set the completion date only if it's not already set
            this.user_complete = new Date()
        }

};



export default Timer;
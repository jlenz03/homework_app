
function UserData( email, password, displayName, avatarurl, completedAssignmentsCount, lateAssignmentsCount, onTimeCompletionRate, tier) {

    this.email = email ?? '';
    this.password = password ?? '';
    this.displayName = displayName ?? '';
    this.avatarurl = avatarurl ?? '';
    this.completedAssignmentsCount = completedAssignmentsCount ?? 0;
    this.lateAssignmentsCount = lateAssignmentsCount ?? 0;
    this.onTimeCompletionRate = onTimeCompletionRate ?? 0;
    this.tier = tier ?? '';


}
export default UserData
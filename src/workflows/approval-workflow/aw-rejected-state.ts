import IAWState from '../../interfaces/approval-workflow/aw-state.iterface';
import IAWStateResponse from '../../interfaces/approval-workflow/aw-state-response.interface';
import { stateConstants, responseConstants } from '../../constants/approval-workflow/state-constants';

class AWRejectedState implements IAWState{
    workflowId: string;
    responses: IAWStateResponse[];
    workflowStateName: string;
    constructor(workflowId){
        this.workflowId = workflowId;
        this.workflowStateName = stateConstants.rejected;
        this.responses = [
            {
                responseValue: responseConstants.hold,
                destinationState: stateConstants.pending
            },
            {
                responseValue: responseConstants.approve,
                destinationState:stateConstants.approved
            }
        ];
    }
    getWorkflowState(): string {
        return this.workflowStateName;
    }
    setWorkflowState(workflowStateName: string) {
        this.workflowStateName = workflowStateName;
    }
    saveWorkflowState(): boolean {
        return true;
    }
    beforeStateChange(response: string): boolean {
        if(response === stateConstants.pending){
            //Implemention before rejected to pending state change flow
        } else if(response === stateConstants.rejected){
            //Implemention before rejected to approved state change flow
        }
        return true;
    }
    afterStateChange(response: string): boolean {
        if(response === stateConstants.pending){
            //Implemention after rejected to pending state change flow
        } else if(response === stateConstants.rejected){
            //Implemention after rejected to approved state change flow
        }
        return true
    }
}

export default AWRejectedState;

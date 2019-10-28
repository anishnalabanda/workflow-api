import IAWState from '../../interfaces/approval-workflow/aw-state.iterface';
import IAWStateResponse from '../../interfaces/approval-workflow/aw-state-response.interface';
import { stateConstants, responseConstants } from '../../constants/approval-workflow/state-constants';

class AWPendingState implements IAWState{
    workflowId: string;
    responses: IAWStateResponse[];
    workflowStateName: string;
    constructor(workflowId){
        this.workflowId = workflowId;
        this.workflowStateName = stateConstants.pending;
        this.responses = [
            {
                responseValue: responseConstants.approve,
                destinationState: stateConstants.approved
            },
            {
                responseValue: responseConstants.reject,
                destinationState:stateConstants.rejected
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
        if(response === stateConstants.approved){
            //Implemention before pending to approved state change flow
        } else if(response === stateConstants.rejected){
            //Implemention before pending to rejected state change flow
        }
        return true;
    }
    afterStateChange(response: string): boolean {
        if(response === stateConstants.pending){
            //Implemention after pending to approved state change flow
        } else if(response === stateConstants.rejected){
            //Implemention after pending to rejected state change flow
        }
        return true
    }
}

export default AWPendingState;

import IAWStateWorkflow from '../../interfaces/approval-workflow/aw-workflow.iterface';
import IAWState from '../../interfaces/approval-workflow/aw-state.iterface';
import { stateConstants } from '../../constants/approval-workflow/state-constants';
import AWApprovedState from './aw-approved-state';
import AWRejectedState from './aw-rejected-state';
import AWPendingState from './aw-pending-state';

class AWWorkflowContainer implements IAWStateWorkflow {
  
    workflowId: string;
    previousWorkflowState: IAWState;
    workflowState: IAWState;

    constructor(workflowId){
        this.workflowId = workflowId;
        this.workflowState = new AWPendingState(workflowId);
    }

    updateWorkflowState(response: string): boolean {
        try{
            if(response && this.isValidResponse(response) && this.workflowState.beforeStateChange(response)){
                this.previousWorkflowState = this.workflowState;
                this.setNextState(response);
                this.previousWorkflowState.afterStateChange(response);
                return true;
            }
        } catch(error){
            console.error('Error occured at updateWorkflowState :: ', error);
        }
        return false;
    }

    getWorkflowState(): IAWState {
        return this.workflowState;
    }

    setWorkflowState(workflowState: IAWState): void {
        this.workflowState = workflowState;
    }

    isValidResponse(response: string): boolean{
        const responseIndex = this.workflowState.responses.findIndex(stateResponse => stateResponse.responseValue === response);
        if(~responseIndex){
            //Implement other validation required before the workflow state can change
            return true;
        }
        return false;
    }

    setNextState(response){
        const destinationState = this.workflowState.responses[this.workflowState.responses.findIndex(stateResponse => stateResponse.responseValue === response)].destinationState;
        if(destinationState === stateConstants.approved){
            this.workflowState = new AWApprovedState(this.workflowId);
        } else if(destinationState === stateConstants.rejected){
            this.workflowState = new AWRejectedState(this.workflowId);
        } else if(destinationState === stateConstants.pending){
            this.workflowState = new AWPendingState(this.workflowId);
        }
    }
}

export default AWWorkflowContainer;

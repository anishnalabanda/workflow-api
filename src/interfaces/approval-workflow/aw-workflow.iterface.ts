import IAWStateResponse from './aw-state-response.interface';
import IAWState from './aw-state.iterface';

interface IAWStateWorkflow {
    workflowId: string;
    workflowState: IAWState;
    updateWorkflowState(response: string): boolean;
    getWorkflowState(): IAWState;
    setWorkflowState(workflowState: IAWState): void;
}

export default IAWStateWorkflow;

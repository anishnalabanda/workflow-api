import IAWStateResponse from './aw-state-response.interface';

interface IAWState {
    workflowId: string;
    responses : IAWStateResponse[];
    workflowStateName: string;
    beforeStateChange(response: string): boolean;
    afterStateChange(response: string): boolean;
}

export default IAWState;

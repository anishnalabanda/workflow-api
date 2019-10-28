import * as express from 'express';
import Controller from '../../interfaces/controller/controller.interface';
import AWWorkflowContainer from '../../workflows/approval-workflow/aw-workflow-container';

class AWWorkflowController implements Controller {
  public path = '/api/approvalworkflow';
  public router = express.Router();
  public approvalWorkflows: AWWorkflowContainer[];

  constructor() {
    this.initializeRoutes();

    //Initializing default demo workflow
    this.createNewWorkflow('1');
  }

  private initializeRoutes() {
    this.router.get(this.path, this.processWorkflow);
  }

  private processWorkflow = async (request: express.Request, response: express.Response) => {

    if (request.query.createWorkflow) {
      if (request.query.workflowId && request.query.workflowId.length > 1) {
        this.createNewWorkflow(request.query.workflowId);
        response.send(`<div>Workflow Instance with workflowId ${request.query.workflowId}<div><br/><div>To perform approval workflow operations got to /api/approvalworkflow<div>`);
      }
    } else if (request.query.response) {
      let currentWorkflow = this.approvalWorkflows[0];
      if (request.query.workflowId) {
        const workflowIndex = this.approvalWorkflows.findIndex(workflow => workflow.workflowId === request.query.workflowId);
        if (~workflowIndex) {
          currentWorkflow = this.approvalWorkflows[workflowIndex];
        } else {
          response.send(`<div>Given workflowId ${request.query.workflowId} doesn't exist!<div><br/><div>To perform approval workflow operations got to /api/approvalworkflow<div>`);
        }
      }
      currentWorkflow.updateWorkflowState(request.query.response);
      let responsesList = '';
      currentWorkflow.workflowState.responses.forEach(response => {
        responsesList += response.responseValue + ', ';
      });
      response.send(`<div><h2>WORKFLOW API</h2><br/><br/><div>Current Workflow state: ${currentWorkflow.workflowState.workflowStateName}</div><br/><div>Current Workflow id: ${currentWorkflow.workflowId}</div><br/><div>User Responses allowed for Current State (${currentWorkflow.workflowState.workflowStateName}) : ${responsesList}</div><br/><br/><div>To send user response add response as a query param, example: /api/approvalworkflow/?response=APPROVE (response is case sensitive)</div><br/><br/><div>To create new workflow instance pass query params, createWorkflow as true and unique workflowId parameter</div><br/><div> example: /api/approvalworkflow/?createWorkflow=true&&workflowId=10093423423</div><br/><br/><div>To send user response for particular instance add workflowId as a query param, example: /api/approvalworkflow/?response=APPROVE&&workflowId=734732312 (response is case sensitive)</div><br/><br/><div>For the demo, default workflowId is 1</div></div>`);
    } else {
      let responsesList = '';
      this.approvalWorkflows[0].workflowState.responses.forEach(response => {
        responsesList += response.responseValue + ', ';
      });
      response.send(`<div><h2>WORKFLOW API</h2><br/><br/><div>Current Workflow state: ${this.approvalWorkflows[0].workflowState.workflowStateName}</div><br/><div>Current Workflow id: ${this.approvalWorkflows[0].workflowId}</div><br/><div>User Responses allowed for Current State (${this.approvalWorkflows[0].workflowState.workflowStateName}) : ${responsesList}</div><br/><br/><div>To send user response add response as a query param, example: /api/approvalworkflow/?response=APPROVE (response is case sensitive)</div><br/><br/><div>To create new workflow instance pass query params, createWorkflow as true and passing unique workflowId parameter</div><br/><div> example: /api/approvalworkflow/?createWorkflow=true&&workflowId=10093423423</div><br/><br/><div>To send user response for particular instance add workflowId as a query param, example: /api/approvalworkflow/?response=APPROVE&&workflowId=734732312 (response is case sensitive)</div><br/><br/><div>For the demo, default workflowId is 1</div></div>`);
    }
  }

  public createNewWorkflow(workflowId) {
    if (workflowId && this.approvalWorkflows && this.approvalWorkflows.length > 0) {
      const workflowIndex = this.approvalWorkflows.findIndex(workflow => workflow.workflowId === workflowId);
      if (~workflowIndex) {
        this.approvalWorkflows[workflowIndex] = new AWWorkflowContainer(workflowId);
      } else {
        this.approvalWorkflows.push(new AWWorkflowContainer(workflowId));
      }
    } else {
      let workflows = new Array();
      workflows.push(new AWWorkflowContainer(workflowId));
      this.approvalWorkflows = workflows;
    }
  }
}

export default AWWorkflowController;

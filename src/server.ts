import App from './app';
import AWWorkflowController from './controller/approval-workflow/aw-workflow.controller';

const app = new App(
  [
    new AWWorkflowController(),
    //Can implement multiple workflows and add their controllers
  ],
);
app.listen();

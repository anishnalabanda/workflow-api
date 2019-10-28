import WorkflowException from './WorkflowException';

class InvalidStateResponse extends WorkflowException {
  constructor(response) {
    super(401, 'Cannot transition state using '+response);
  }
}

export default InvalidStateResponse;

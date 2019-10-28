# WORKFLOW API

This rest api is an node js implementation of an approval workflow, that changes states between PENDING, APPROVED and REJECTED.

Its take user responses such as APPROVE, REJECT, HOLD.

WORKFLOW API is highly scalable, designed in way that you can develop and add new workflows very easily.

API uses typescript, express, docker and jest for testing the application

Using this WORKFLOW API you can create multiple workflow instances and move them through the states independently.


## Running the application

WORKFLOW API is dockerised, simply deploy the application in a docker using command:

    docker-compose up

API will be listening on the port 5000


To send user response add 'response' as a query param, 
    
    example: /api/approvalworkflow/?response=APPROVE (response is case sensitive)


To create new workflow instance pass query params, createWorkflow as true and passing unique workflowId parameter
    
    example: /api/approvalworkflow/?createWorkflow=true&&workflowId=10093423423


To send user response for particular instance add workflowId as a query param, 
    
    example: /api/approvalworkflow/?response=APPROVE&&workflowId=734732312 (response is case sensitive)


For the demo, default workflowId is 1 and default state of new workflow instance is PENDING.

## Testing the application

Workflow API uses jest for unit testing, to run unit test cases use command:

    npm run test



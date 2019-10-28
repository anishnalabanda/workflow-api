import AWApproveState from "../workflows/approval-workflow/aw-approved-state";
import AWPendingState from "../workflows/approval-workflow/aw-pending-state";
import AWRejectedState from "../workflows/approval-workflow/aw-rejected-state";


describe("Approval Worflow Tests", () => {
    test("Approve beforeStateChange", () => {
        expect(new AWApproveState('1').beforeStateChange('HOLD')).toBe(true);
    });
    test("Approve afterStateChange", () => {
        expect(new AWApproveState('1').afterStateChange('REJECT')).toBe(true);
    });
    test("Approve getWorkflowState", () => {
        expect(new AWApproveState('1').getWorkflowState()).toBe('APPROVED');
    });

    test("Approve beforeStateChange", () => {
        expect(new AWPendingState('1').beforeStateChange('APPROVE')).toBe(true);
    });
    test("Approve afterStateChange", () => {
        expect(new AWPendingState('1').afterStateChange('REJECT')).toBe(true);
    });
    test("Approve getWorkflowState", () => {
        expect(new AWPendingState('1').getWorkflowState()).toBe('PENDING');
    });

    test("Approve beforeStateChange", () => {
        expect(new AWRejectedState('1').beforeStateChange('APPROVE')).toBe(true);
    });
    test("Approve afterStateChange", () => {
        expect(new AWRejectedState('1').afterStateChange('HOLD')).toBe(true);
    });
    test("Approve getWorkflowState", () => {
        expect(new AWRejectedState('1').getWorkflowState()).toBe('REJECTED');
    });
    
});
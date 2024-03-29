import libCom from '../../Common/Library/CommonLibrary';
import saveCreatedDocuments from './SaveCreatedDocuments';
/**
* Reaction to press of cancel button on modal, asks user for clarification,
* then calls delete function for the document
* @param {IClientAPI} context
*/
export default function CancelCreationAction(context) {
    let data = libCom.getStateVariable(context, 'ActualDocId');
    let created = libCom.getStateVariable(context, 'IsAlreadyCreatedDoc');
    if (data && !created) {
        return context.executeAction({
            'Name': '/SAPAssetManager/Actions/Expense/ConfirmCloseExpensesPage.action',
            'Properties': {
                'Message': context.localizeText('confirm_cancel'),
                'OnOK': '/SAPAssetManager/Rules/Inventory/MaterialDocument/RemoveMaterialDocuments.js',
            },
        });
    } else {
        return saveCreatedDocuments(context, true);
    }
}

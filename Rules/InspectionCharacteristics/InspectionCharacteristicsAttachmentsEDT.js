import DocLib from '../Documents/DocumentLibrary';
import CommonLibrary from '../Common/Library/CommonLibrary';

export default function InspectionCharacteristicsAttachmentsEDT(formcellProxy) {
    let attachments = CommonLibrary.getStateVariable(formcellProxy, 'InspectionCharacteristicsAttachments');
    if (!attachments) {
        attachments = [];
        let binding = formcellProxy.getPageProxy().binding;
        let readlink = binding['@odata.readLink'];
        if (binding['@odata.type'] === '#sap_mobile.InspectionCharacteristic' || binding['@odata.type'] === '#sap_mobile.InspectionPoint') {
            readlink = `InspectionLots('${binding.InspectionLot}')`;
        } else if (binding['@odata.type'] === '#sap_mobile.MyWorkOrderOperation') {
            readlink = binding.WOHeader['@odata.readLink'] + '/InspectionLot_Nav';
        } else if (binding['@odata.type'] === '#sap_mobile.EAMChecklistLink' ) {
            readlink = binding['@odata.readLink'] + '/InspectionLot_Nav';
        } 
        return formcellProxy.read('/SAPAssetManager/Services/AssetManager.service', readlink, [], '').then(result => {
            if (result && result.length > 0) {
                let objectDetails = [];
                objectDetails.push({
                    'queryOption': "$expand=Document&$filter=InspectionLot eq '" + result.getItem(0).InspectionLot + "' and Document/FileName ne null and sap.islocal()",
                    'entitySet': 'InspectionLotDocuments',
                });
                attachments = DocLib.readAttachments(formcellProxy, objectDetails);
                CommonLibrary.getStateVariable(formcellProxy, 'InspectionCharacteristicsAttachments', attachments);
            }
            return attachments;
        });
    }
    return attachments;
}
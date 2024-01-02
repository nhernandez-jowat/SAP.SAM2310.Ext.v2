import CommonLibrary from '../../Common/Library/CommonLibrary';
import IsAndroid from '../../Common/IsAndroid';
import DocumentsBDSCount from '../../Documents/Count/DocumentsBDSCount';
import AttachedDocumentIcon from '../../Documents/AttachedDocumentIcon';

export default function ServiceOrderListViewIconImages(context) {
    let binding = context.getBindingObject();
    var iconImage = [];
    const serviceItems = binding.ServiceItems_Nav;

    // check if this order requires sync
    if (CommonLibrary.getTargetPathValue(context, '#Property:@sap.isLocal') || CommonLibrary.getTargetPathValue(context, '#Property:MobileStatus_Nav/#Property:@sap.isLocal')) {
        iconImage.push(IsAndroid(context) ? '/SAPAssetManager/Images/syncOnListIcon.android.png' : '/SAPAssetManager/Images/syncOnListIcon.png');
    }

    if (serviceItems && serviceItems.length > 0 && !iconImage.length) {
        serviceItems.forEach(item => { 
            if (item['@sap.isLocal'] && !iconImage.length) {
                iconImage.push(IsAndroid(context) ? '/SAPAssetManager/Images/syncOnListIcon.android.png' : '/SAPAssetManager/Images/syncOnListIcon.png');
            }
        });
    }
  
    // check if this item has any docs
    return DocumentsBDSCount(context, binding).then(res => {
        if (res) {
            const docIcon = AttachedDocumentIcon(context, undefined, res);
            if (docIcon) {
                iconImage.push(docIcon);
            }
        }
        return iconImage;
    }).catch(() => {
        return iconImage;
    });
}

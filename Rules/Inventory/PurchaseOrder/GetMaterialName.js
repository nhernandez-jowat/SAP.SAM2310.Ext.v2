import libInv from '../Common/Library/InventoryLibrary';

/**
 * This function returns the material object header field on PurchaseOrder or STO Details page
 */
export default function GetMaterialName(context, item) {
    const binding = item || context.binding;
    let type = binding['@odata.type'].substring('#sap_mobile.'.length);
    if (type === 'ProductionOrderItem') {
        // avoid extra request for PRD as it has description in the navlink
        return Promise.resolve(binding.Material_Nav.Description);
    }
    let materialNum = libInv.getInventoryDocumentMaterialNum(binding);
    var queryOptions = "$filter=MaterialNum eq '" + materialNum + "'";
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'Materials', [], queryOptions).then((result) => {
        if (result && result.length > 0) {
            return result.getItem(0).Description;
        } else {
            return '';
        }
        // eslint-disable-next-line no-unused-vars
    }).catch(err => {
        return '';
    });
}

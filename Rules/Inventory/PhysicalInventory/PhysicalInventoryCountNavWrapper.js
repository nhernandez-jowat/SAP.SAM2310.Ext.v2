import libCom from '../../Common/Library/CommonLibrary';

export default function PhysicalInventoryCountNavWrapper(context, customBinding) {
    let moveType = libCom.getStateVariable(context, 'IMMovementType');
    let binding = customBinding || context.binding;
    let actionBinding = context.getPageProxy().getActionBinding() || binding;
    let serial = !!(actionBinding.MaterialPlant_Nav && actionBinding.MaterialPlant_Nav.SerialNumberProfile);
    let counted = (actionBinding.EntryQuantity > 0 || actionBinding.ZeroCount === 'X');
    let posted = (!actionBinding['@sap.isLocal'] && counted);
    let editable = ((serial && posted) === false); //Item is serialized and already posted, so do not allow further counting

    libCom.setOnCreateUpdateFlag(context, '');
    if (editable) {
        if (moveType === 'C') {
            //Maintain list of items to traverse over during counting
            let item = actionBinding.Item;
            let selectList = 'Item,MaterialPlant_Nav/SerialNumberProfile';
            let orderBy = 'Item';
            let expand = 'MaterialPlant_Nav';
            let baseQuery;
            baseQuery = "Item ge '" + item + "' and PhysInvDoc eq '" + actionBinding.PhysInvDoc + "' and FiscalYear eq '" + actionBinding.FiscalYear + "' and EntryQuantity eq 0 and ZeroCount ne 'X'";
            baseQuery += " or (Item ge '" + item + "' and PhysInvDoc eq '" + actionBinding.PhysInvDoc + "' and FiscalYear eq '" + actionBinding.FiscalYear + "' and (EntryQuantity gt 0 or ZeroCount eq 'X')";
            baseQuery += " and ((MaterialPlant_Nav/SerialNumberProfile ne '' and sap.islocal()) or (MaterialPlant_Nav/SerialNumberProfile eq '')))"; //Cannot edit posted serialized counts

            let query = '$select=' + selectList + '&$filter=' + baseQuery + '&$orderby=' + orderBy + '&$expand=' + expand;

            return context.read('/SAPAssetManager/Services/AssetManager.service', 'PhysicalInventoryDocItems', [], query).then(function(results) {
                libCom.setStateVariable(context, 'PIDocumentItemsMap', results);
                return context.executeAction('/SAPAssetManager/Actions/Inventory/PhysicalInventory/PhysicalInventoryCountUpdateNav.action');
            });
        }
    }
    return Promise.resolve(true);
}

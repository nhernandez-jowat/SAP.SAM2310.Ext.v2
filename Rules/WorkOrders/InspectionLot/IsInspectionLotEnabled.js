import userFeaturesLib from '../../UserFeatures/UserFeaturesLibrary';

export default function IsInspectionLotEnabled(context) {
    if (userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/QM.global').getValue())) {
        if (userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/Checklist.global').getValue())) {
            if (context.getPageProxy().getActionBinding()) {
                return true;
            }
            return !(context.getPageProxy().binding.EAMChecklist_Nav && context.getPageProxy().binding.EAMChecklist_Nav.length > 0);
        } else {
            return true;
        }
    } else {
        return false;
    }
}

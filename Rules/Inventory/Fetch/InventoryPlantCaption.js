import { GlobalVar } from '../../Common/Library/GlobalCommon';
import Logger from '../../Log/Logger';
/**
* This function returns plant along with label
* @param {IClientAPI} context
*/
export default function InventoryPlantCaption(context) {
 let plant = GlobalVar.getUserSystemInfo().get('USER_PARAM.WRK');
 let plantLabel = context.localizeText('plant');
 var queryOptions = "$filter=Plant eq '" + plant +"'";
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'Plants', [], queryOptions).then((result) => {
        if (result && result.length > 0) {
            return plantLabel + ': ' + plant + ' - ' + result.getItem(0).PlantDescription;          
        } else {
            return '';
        }
    }).catch(err => {
        Logger.error('Physical Inventory',  err);
        return '';
    });
}

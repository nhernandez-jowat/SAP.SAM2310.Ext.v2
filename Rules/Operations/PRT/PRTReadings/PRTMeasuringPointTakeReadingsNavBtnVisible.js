import FDCQueryOptions from '../../../Measurements/Points/MeasuringPointFDCQueryOptions';
import FDCEntitySet from '../../../Measurements/Points/MeasuringPointFDCEntitySet';
import enableMeasurementCreate from '../../../UserAuthorizations/Measurements/EnableMeasurementCreate';

export default function PRTMeasuringPointTakeReadingsNavBtnVisible(context) {

    if (enableMeasurementCreate(context)) {
        let pageProxy = context.getPageProxy();
        //Determie the query options
        return FDCQueryOptions(context).then(function(result) {
            //If query options are defined do count else hide take readings option on pop-over
            if (result) {
                return context.count('/SAPAssetManager/Services/AssetManager.service', FDCEntitySet(pageProxy), result).then(function(counts) {
                    ///If there are no measuring point hide take readings option on pop-over
                    return counts > 0;
                });
            } else {
                return false;
            }
        });
    }
    return false;  

}

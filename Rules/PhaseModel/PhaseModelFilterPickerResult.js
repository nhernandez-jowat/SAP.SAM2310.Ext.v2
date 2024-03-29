import libCom from '../Common/Library/CommonLibrary';

export default function PhaseModelFilterPickerResult(context, control, returnValues) {
    let result;

    if (returnValues.length > 0) {
        let filter = '';
        let filterDisplayString = '';
        let selected = [];
        let i = 0; while (i < returnValues.length - 1) {
            let target = returnValues[i++].ReturnValue;
            selected.push(target);
            filter += "Phase eq '" + target + "' or ";
            filterDisplayString += target + '; ';
        }
        // last one
        selected.push(returnValues[i].ReturnValue);
        filter += "Phase eq '" + returnValues[i].ReturnValue + "'";
        filterDisplayString += returnValues[i].ReturnValue;
        libCom.setStateVariable(context, control, selected);
        result = context.createFilterCriteria(context.filterTypeEnum.Filter, undefined, undefined, [filter], true, undefined, [filterDisplayString]);
    }

    return result;
}

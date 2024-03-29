
import libCommon from '../../Common/Library/CommonLibrary';
import ODataDate from '../../Common/Date/ODataDate';
import phaseFilterResult from '../../PhaseModel/PhaseModelFilterPickerResult';
import IsPhaseModelEnabled from '../../Common/IsPhaseModelEnabled';
import PhaseLibrary from '../../PhaseModel/PhaseLibrary';

export default function WorkOrderOperationListFilterResults(context) {
    let result1 = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:SortFilter/#Value');
    let result2 = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:MobileStatusFilter/#Value');
    let result3 = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:MyOperationsFilter/#Value');
    let result4 = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:AssignmentFilter/#FilterValue');
    let result5 = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:TypeFilter/#FilterValue');

    let filterResults = [result1, result2, result3, result4, result5];

    let clientData = context.evaluateTargetPath('#Page:WorkOrderOperationsListViewPage/#ClientData');
    let scheduledEarliestStartDateSwitch = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:ScheduledEarliestStartDateSwitch');
    let scheduledEarliestEndDateSwitch = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:ScheduledEarliestEndDateSwitch');
    let scheduledLatestStartDateSwitch = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:ScheduledLatestStartDateSwitch');
    let scheduledLatestEndDateSwitch = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:ScheduledLatestEndDateSwitch');

    if (IsPhaseModelEnabled(context)) {
        let execuationStage = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:ExecuationStageFilter/#Value');
        filterResults.push(execuationStage);
        let phase = context.evaluateTargetPath('#Page:WorkOrderOperationsFilterPage/#Control:PhaseFilter/#Value');
        let result = phaseFilterResult(context, 'PhaseFilter', phase);
        if (result) filterResults.push(result);

        PhaseLibrary.addPhaseControlFilterResult(context, 'WorkOrderOperationsFilterPage', filterResults);
        PhaseLibrary.addPhaseControlKeyFilterResult(context, 'WorkOrderOperationsFilterPage', filterResults);
    }

    if (scheduledEarliestStartDateSwitch.getValue() === true) {
        let startDate = libCommon.getFieldValue(context, 'ScheduledEarliestStartDateStartFilter');
        let sdate = (startDate === '') ? new Date() : new Date(startDate);
        let odataDate = new ODataDate(sdate);
        let odataStartDate =  odataDate.toDBDateString(context);

        let endDate = libCommon.getFieldValue(context, 'ScheduledEarliestStartDateEndFilter');
        let edate = (endDate === '') ? new Date() : new Date(endDate);
        odataDate = new ODataDate(edate);
        let odataEndDate =  odataDate.toDBDateString(context);

        let dateFilter = ["SchedEarliestStartDate ge datetime'" + odataStartDate + "' and SchedEarliestStartDate le datetime'" + odataEndDate + "'" ];
        let dateFilterResult = context.createFilterCriteria(context.filterTypeEnum.Filter, 'SchedEarliestStartDate', 'SchedEarliestStartDate', dateFilter, true, context.localizeText('scheduled_earliest_start_date'), [`${context.formatDatetime(sdate)} - ${context.formatDatetime(edate)}`]);
        filterResults.push(dateFilterResult);

        clientData.creationDateSwitch = scheduledEarliestStartDateSwitch.getValue();
        clientData.scheduledEarliestStartDateStart = odataStartDate;
        clientData.scheduledEarliestStartDateEnd = odataEndDate;
    }

    if (scheduledEarliestEndDateSwitch.getValue() === true) {
        let startDate = libCommon.getFieldValue(context, 'ScheduledEarliestEndDateStartFilter');
        let sdate = (startDate === '') ? new Date() : new Date(startDate);
        let odataDate = new ODataDate(sdate);
        let odataStartDate =  odataDate.toDBDateString(context);

        let endDate = libCommon.getFieldValue(context, 'ScheduledEarliestEndDateEndFilter');
        let edate = (endDate === '') ? new Date() : new Date(endDate);
        odataDate = new ODataDate(edate);
        let odataEndDate =  odataDate.toDBDateString(context);

        let dateFilter = ["SchedEarliestEndDate ge datetime'" + odataStartDate + "' and SchedEarliestEndDate le datetime'" + odataEndDate + "'" ];
        let dateFilterResult = context.createFilterCriteria(context.filterTypeEnum.Filter, 'SchedEarliestEndDate', 'SchedEarliestEndDate', dateFilter, true, context.localizeText('scheduled_earliest_end_date'), [`${context.formatDatetime(sdate)} - ${context.formatDatetime(edate)}`]);
        filterResults.push(dateFilterResult);

        clientData.creationDateSwitch = scheduledEarliestEndDateSwitch.getValue();
        clientData.scheduledEarliestEndDateStart = odataStartDate;
        clientData.scheduledEarliestEndDateEnd = odataEndDate;
    }

    if (scheduledLatestStartDateSwitch.getValue() === true) {
        let startDate = libCommon.getFieldValue(context, 'ScheduledLatestStartDateStartFilter');
        let sdate = (startDate === '') ? new Date() : new Date(startDate);
        let odataDate = new ODataDate(sdate);
        let odataStartDate =  odataDate.toDBDateString(context);

        let endDate = libCommon.getFieldValue(context, 'ScheduledLatestStartDateEndFilter');
        let edate = (endDate === '') ? new Date() : new Date(endDate);
        odataDate = new ODataDate(edate);
        let odataEndDate =  odataDate.toDBDateString(context);

        let dateFilter = ["SchedLatestStartDate ge datetime'" + odataStartDate + "' and SchedLatestStartDate le datetime'" + odataEndDate + "'" ];
        let dateFilterResult = context.createFilterCriteria(context.filterTypeEnum.Filter, 'SchedLatestStartDate', 'SchedLatestStartDate', dateFilter, true, context.localizeText('scheduled_latest_start_date'), [`${context.formatDatetime(sdate)} - ${context.formatDatetime(edate)}`]);
        filterResults.push(dateFilterResult);

        clientData.creationDateSwitch = scheduledLatestStartDateSwitch.getValue();
        clientData.scheduledLatestStartDateStart = odataStartDate;
        clientData.scheduledLatestStartDateEnd = odataEndDate;
    }

    if (scheduledLatestEndDateSwitch.getValue() === true) {
        let startDate = libCommon.getFieldValue(context, 'ScheduledLatestEndDateStartFilter');
        let sdate = (startDate === '') ? new Date() : new Date(startDate);
        let odataDate = new ODataDate(sdate);
        let odataStartDate =  odataDate.toDBDateString(context);

        let endDate = libCommon.getFieldValue(context, 'ScheduledLatestEndDateEndFilter');
        let edate = (endDate === '') ? new Date() : new Date(endDate);
        odataDate = new ODataDate(edate);
        let odataEndDate =  odataDate.toDBDateString(context);

        let dateFilter = ["SchedLatestEndDate ge datetime'" + odataStartDate + "' and SchedLatestEndDate le datetime'" + odataEndDate + "'" ];
        let dateFilterResult = context.createFilterCriteria(context.filterTypeEnum.Filter, 'SchedLatestEndDate', 'SchedLatestEndDate', dateFilter, true, context.localizeText('scheduled_latest_end_date'), [`${context.formatDatetime(sdate)} - ${context.formatDatetime(edate)}`]);
        filterResults.push(dateFilterResult);

        clientData.creationDateSwitch = scheduledLatestEndDateSwitch.getValue();
        clientData.scheduledLatestEndDateStart = odataStartDate;
        clientData.scheduledLatestEndDateEnd = odataEndDate;
    }

    if (clientData.OperationFastFiltersClass) {
        filterResults = filterResults.concat(clientData.OperationFastFiltersClass.getFastFilterValuesFromFilterPage(context, result2.filterItems));
    }

    libCommon.removeStateVariable(context, 'OPERATIONS_DATE_FILTER');

    return filterResults;
}

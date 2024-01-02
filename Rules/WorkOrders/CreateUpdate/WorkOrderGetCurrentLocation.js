
import GetCurrentGeometry from '../../Geometries/GetCurrentGeometry';

export default function WorkOrderGetCurrentLocation(context) {
    return GetCurrentGeometry(context, 'WorkOrder').then(result => {
        if (result) {
            var container = context.getControls()[0];
            // redraw LocationButtonsSection 
            container.getSection('LocationButtonsSection').redraw();
        }
    });
}

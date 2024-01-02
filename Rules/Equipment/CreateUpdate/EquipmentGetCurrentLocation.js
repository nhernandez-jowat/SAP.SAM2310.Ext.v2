
import GetCurrentGeometry from '../../Geometries/GetCurrentGeometry';

export default function EquipmentGetCurrentLocation(context) {
    return GetCurrentGeometry(context, 'Equipment').then(result => {
        if (result) {
            var container = context.getControls()[0];
            // redraw LocationButtonsSection 
            container.getSection('LocationButtonsSection').redraw();
        }
    });
}

import PersonaLibrary from '../Persona/PersonaLibrary';
import IsS4ServiceIntegrationEnabled from './IsS4ServiceIntegrationEnabled';

export default function IsFSMCSSectionVisible(context) {
    return !IsS4ServiceIntegrationEnabled(context) && PersonaLibrary.isFieldServiceTechnician(context);
}

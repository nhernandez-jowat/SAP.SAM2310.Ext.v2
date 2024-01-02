/**
 * 
 * @param {IClientAPI} context 
 * @returns {string}
 */
export default function FormMandatoryText(context) {
    const binding = context.binding;

    if (binding 
        && binding.Mandatory === 'X') {
        return context.localizeText('sdf_mandatory');
    }
    return context.localizeText('sdf_optional');
}

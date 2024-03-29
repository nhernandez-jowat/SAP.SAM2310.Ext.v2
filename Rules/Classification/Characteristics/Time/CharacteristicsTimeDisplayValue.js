import dateTime from './CharacteristicsFormatBackendTimeToLocal';
import fixTime from './CharacteristicFixTime';

export default function CharacteristicsTimeDisplayValue(context, time) {
    var timeString = time.toString();
    if (timeString === '0') return '0';

    timeString = fixTime(timeString);
    return context.formatTime(dateTime(timeString));
}

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Dimensions} from 'react-native';

const STATUS_BAR_HEIGHT = getStatusBarHeight();

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height - STATUS_BAR_HEIGHT;

import { isToday } from '@shared/utils';
import { ScheduleHolderItem } from './schedule-holder-item.model';

export enum ScheduleHolderView {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export const SCHEDULE_HOLDER_LIST: ScheduleHolderItem[] = [
  {
    iconClass: 'icon_size_m icon_color_green',
    iconName: 'calendar-today',
    label: 'Сегодня',
    svgIconText: new Date().getDate(),
    type: 'today',
    weekday: 'Пн',
  },
  {
    iconClass: 'icon_size_m icon_color_tenne',
    iconName: 'sun',
    label: 'Завтра',
    type: 'tomorrow',
  },
  {
    iconClass: 'icon_size_m icon_color_royal-blue',
    iconName: 'couch',
    label: 'На выходных',
    type: 'weekends',
  },
  {
    iconClass: 'icon_size_m icon_color_purple-heart',
    iconName: 'arrow-right-calendar',
    label: 'Следующая неделя',
    type: 'nextWeek',
  },
  {
    iconClass: 'icon_size_m',
    iconName: 'endless-schedule',
    label: 'Без срока',
    type: 'noTimeLimit',
  },
];

export function getScheduleHolderList(date: Date, now = new Date()) {
  return SCHEDULE_HOLDER_LIST.slice(isToday(date, now) ? 1 : 0);
}

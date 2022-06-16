export type ScheduleHolderItemType = 'today' | 'tomorrow' | 'weekends' | 'nextWeek' | 'noTimeLimit' | 'more';

export interface ScheduleHolderItem {
  label: string;
  iconName: string;
  iconClass: string;
  type: ScheduleHolderItemType;
  weekday?: string;
  svgIconText?: string | number;
}

export type CalendarItem =
  | {
      id: string;
      title: string | null;
      startTimeDate: string | null;
      endTimeDate: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      bgColor?: string | null;
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Record<string, any>;

export interface FormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  selectedItem: CalendarItem;
  onItemChange: (newItem: CalendarItem) => void;
  onItemCreate: (newItem: CalendarItem) => void;
}

export interface DateInfo {
  timeDateUTC?: string;
}

export interface View {
  value: string;
  label: string;
}

export interface Day {
  value: number;
  label: string;
}

export interface TimeDateField {
  value: string;
  label: string;
}

export interface CalendarHeaderProps {
  currentView: string;
  weekStartsOn: number;
  activeTimeDateField: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  setWeekStartsOn: React.Dispatch<React.SetStateAction<number>>;
  setActiveTimeDateField: React.Dispatch<React.SetStateAction<string>>;
}

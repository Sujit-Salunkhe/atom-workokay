import 'react-day-picker/style.css';
type Props = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    icon?: boolean;
};
export declare function DobDatePicker({ value, onChange, placeholder, icon, }: Props): import("react/jsx-runtime").JSX.Element;
export {};

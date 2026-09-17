import React from 'react';
import Svg, { Path, Rect, Circle, G, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  fill?: string;
}

// ShieldPay Brand Logo Icon
export const ShieldLogo: React.FC<IconProps> = ({ size = 48, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Path
      d="M24 4L8 10V22C8 32.5 14.8 42.1 24 44C33.2 42.1 40 32.5 40 22V10L24 4Z"
      fill={color}
    />
    <Path
      d="M21 28.5L16.5 24L14.4 26.1L21 32.7L33.6 20.1L31.5 18L21 28.5Z"
      fill="#0D1333"
    />
  </Svg>
);

// Navigation & Actions
export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 2.5L21 9.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HistoryIcon: React.FC<IconProps> = ({ size = 24, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 7V12L15.5 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const StatisticIcon: React.FC<IconProps> = ({ size = 24, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 20V10M12 20V4M6 20V14"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ size = 24, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
  </Svg>
);

export const SendActionIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const RequestActionIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 14V6M19 6L15 10M19 6L23 10M5 10V18M5 18L9 14M5 18L1 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PayActionIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
    <Rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
    <Rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
    <Path d="M14 14H17V17M21 14V21H17M14 21V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const TopUpActionIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M12 9V15M9 12H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const ArrowUpRightIcon: React.FC<IconProps> = ({ size = 20, color = '#7B61FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7 17L17 7M17 7H7M17 7V17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ArrowDownLeftIcon: React.FC<IconProps> = ({ size = 20, color = '#00BA88' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 7L7 17M7 17H17M7 17V7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 24, color = '#0D1333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 20, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size = 20, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
  </Svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ size = 20, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = '#00BA88' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, color = '#0D1333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 20, color = '#0D1333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const MinusIcon: React.FC<IconProps> = ({ size = 20, color = '#0D1333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 24, color = '#0D1333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 4H8L1 12L8 20H21C21.5304 20 22.0391 19.7893 22.4142 19.4142C22.7893 19.0391 23 18.5304 23 18V6C23 5.46957 22.7893 4.96086 22.4142 4.58579C22.0391 4.21071 21.5304 4 21 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line x1="18" y1="9" x2="12" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="12" y1="9" x2="18" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 20, color = '#7B61FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 20, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
    <Path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 20, color = '#8A92A6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke={color} strokeWidth="2" />
  </Svg>
);

export const FlashIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GalleryIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    <Circle cx="8.5" cy="8.5" r="1.5" stroke={color} strokeWidth="2" />
    <Path d="M21 15L16 10L5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const MastercardLogo: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <Svg width={size} height={size * 0.65} viewBox="0 0 36 24" fill="none">
    <Circle cx="13" cy="12" r="10" fill="#EB001B" fillOpacity="0.9" />
    <Circle cx="23" cy="12" r="10" fill="#F79E1B" fillOpacity="0.9" />
  </Svg>
);

export const VisaLogo: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <Svg width={size} height={size * 0.4} viewBox="0 0 48 20" fill="none">
    <Path
      d="M19.2 1.5L12.5 18H8.2L5 4.3C4.8 3.5 4.6 3.2 4 2.8C3 2.2 1.4 1.7 0 1.4L0.2 0.5H7C7.9 0.5 8.7 1.1 8.9 2.1L10.6 11.2L14.7 1.5H19.2ZM36 12.3C36 7.6 29.5 7.4 29.5 5.3C29.5 4.7 30.1 4 31.4 3.8C32 3.7 33.8 3.6 35.8 4.6L36.6 0.9C35.5 0.5 34.1 0.2 32.3 0.2C28.4 0.2 25.6 2.3 25.6 5.3C25.6 7.5 27.6 8.7 29.1 9.4C30.6 10.2 31.1 10.7 31.1 11.4C31.1 12.4 29.9 12.9 28.7 12.9C26.7 12.9 25.6 12.6 24.1 11.9L23.3 15.7C24.6 16.3 27 16.7 29.4 16.8C33.6 16.8 36.3 14.7 36 12.3ZM46.5 18H50.4L47 1.5H43.6C42.8 1.5 42.1 1.9 41.8 2.7L35.7 18H39.8L40.6 15.7H45.7L46.5 18ZM41.8 12.6L43.9 6.8L45.1 12.6H41.8ZM24.3 1.5L21.1 18H17.2L20.4 1.5H24.3Z"
      fill="#FFFFFF"
    />
  </Svg>
);

export const CardChipIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <Svg width={size} height={size * 0.75} viewBox="0 0 32 24" fill="none">
    <Rect x="0.5" y="0.5" width="31" height="23" rx="3.5" fill="#E6C875" stroke="#D1AC47" />
    <Line x1="0" y1="8" x2="32" y2="8" stroke="#B89433" strokeWidth="1" />
    <Line x1="0" y1="16" x2="32" y2="16" stroke="#B89433" strokeWidth="1" />
    <Line x1="12" y1="0" x2="12" y2="24" stroke="#B89433" strokeWidth="1" />
    <Line x1="20" y1="0" x2="20" y2="24" stroke="#B89433" strokeWidth="1" />
  </Svg>
);

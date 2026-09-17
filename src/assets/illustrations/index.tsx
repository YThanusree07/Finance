import React from 'react';
import { View } from 'react-native';
import Svg, {
  Path,
  Rect,
  Circle,
  G,
  Defs,
  LinearGradient,
  Stop,
  Mask,
} from 'react-native-svg';

interface IllustrationProps {
  width?: number;
  height?: number;
}

// Onboarding 1 — Send Money Illustration
export const SendMoneyIllustration: React.FC<IllustrationProps> = ({
  width = 280,
  height = 240,
}) => (
  <Svg width={width} height={height} viewBox="0 0 280 240" fill="none">
    <Defs>
      <LinearGradient id="sendBg" x1="0" y1="0" x2="280" y2="240" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EDE9FE" stopOpacity="0.8" />
        <Stop stopColor="#F5F3FF" stopOpacity="0.2" />
      </LinearGradient>
      <LinearGradient id="cardGrad" x1="0" y1="0" x2="160" y2="100" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#0D1333" />
        <Stop stopColor="#1E2756" />
      </LinearGradient>
    </Defs>

    {/* Background Soft Glow Circles */}
    <Circle cx="140" cy="120" r="100" fill="url(#sendBg)" />
    <Circle cx="230" cy="50" r="8" fill="#FFA800" opacity="0.6" />
    <Circle cx="40" cy="180" r="10" fill="#7B61FF" opacity="0.4" />
    <Circle cx="240" cy="190" r="6" fill="#00BA88" opacity="0.5" />

    {/* Phone Frame Device */}
    <Rect x="75" y="20" width="130" height="200" rx="20" fill="#0D1333" />
    <Rect x="82" y="28" width="116" height="184" rx="14" fill="#FFFFFF" />

    {/* Phone UI content */}
    <Rect x="94" y="44" width="92" height="50" rx="8" fill="url(#cardGrad)" />
    <Circle cx="108" cy="58" r="5" fill="#EB001B" />
    <Circle cx="115" cy="58" r="5" fill="#F79E1B" opacity="0.9" />
    <Rect x="104" y="76" width="40" height="4" rx="2" fill="#FFFFFF" opacity="0.6" />
    <Rect x="104" y="83" width="60" height="6" rx="3" fill="#FFFFFF" />

    {/* Sending Money Flying Envelope / Coin */}
    <G transform="translate(140, 105)">
      <Circle cx="30" cy="20" r="26" fill="#FFA800" />
      <Path d="M22 20H38M30 12V28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      {/* Dynamic Flying Trail */}
      <Path
        d="M-30 40 Q 0 10 20 20"
        stroke="#7B61FF"
        strokeWidth="3"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
    </G>

    {/* Small User Avatars */}
    <Circle cx="60" cy="120" r="18" fill="#7B61FF" />
    <Circle cx="60" cy="115" r="7" fill="#FFFFFF" />
    <Path d="M48 132 C48 124 72 124 72 132" fill="#FFFFFF" />

    <Circle cx="220" cy="100" r="18" fill="#00BA88" />
    <Circle cx="220" cy="95" r="7" fill="#FFFFFF" />
    <Path d="M208 112 C208 104 232 104 232 112" fill="#FFFFFF" />
  </Svg>
);

// Onboarding 2 — Request Money Illustration
export const RequestMoneyIllustration: React.FC<IllustrationProps> = ({
  width = 280,
  height = 240,
}) => (
  <Svg width={width} height={height} viewBox="0 0 280 240" fill="none">
    <Defs>
      <LinearGradient id="reqBg" x1="0" y1="0" x2="280" y2="240" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EDE9FE" stopOpacity="0.8" />
        <Stop stopColor="#F5F3FF" stopOpacity="0.2" />
      </LinearGradient>
    </Defs>

    <Circle cx="140" cy="120" r="105" fill="url(#reqBg)" />
    <Circle cx="50" cy="50" r="12" fill="#7B61FF" opacity="0.2" />
    <Circle cx="230" cy="180" r="8" fill="#FFA800" opacity="0.6" />

    {/* Central Safe / Wallet Box */}
    <Rect x="70" y="55" width="140" height="130" rx="20" fill="#0D1333" />
    <Rect x="85" y="70" width="110" height="100" rx="14" fill="#1C234E" />

    {/* Safe Dial / Shield lock */}
    <Circle cx="140" cy="120" r="28" fill="#7B61FF" />
    <Circle cx="140" cy="120" r="18" fill="#0D1333" />
    <Circle cx="140" cy="120" r="8" fill="#FFA800" />

    {/* Incoming Payment Request Bubbles */}
    <G transform="translate(30, 80)">
      <Rect width="70" height="34" rx="10" fill="#FFFFFF" />
      <Circle cx="16" cy="17" r="9" fill="#FFA800" />
      <Rect x="30" y="11" width="30" height="5" rx="2.5" fill="#0D1333" />
      <Rect x="30" y="19" width="20" height="4" rx="2" fill="#8A92A6" />
    </G>

    <G transform="translate(180, 130)">
      <Rect width="74" height="34" rx="10" fill="#FFFFFF" />
      <Circle cx="16" cy="17" r="9" fill="#00BA88" />
      <Rect x="30" y="11" width="32" height="5" rx="2.5" fill="#0D1333" />
      <Rect x="30" y="19" width="22" height="4" rx="2" fill="#8A92A6" />
    </G>
  </Svg>
);

// Onboarding 3 — Easy To Use Illustration
export const EasyToUseIllustration: React.FC<IllustrationProps> = ({
  width = 280,
  height = 240,
}) => (
  <Svg width={width} height={height} viewBox="0 0 280 240" fill="none">
    <Defs>
      <LinearGradient id="easyBg" x1="0" y1="0" x2="280" y2="240" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EDE9FE" stopOpacity="0.8" />
        <Stop stopColor="#F5F3FF" stopOpacity="0.2" />
      </LinearGradient>
    </Defs>

    <Circle cx="140" cy="120" r="105" fill="url(#easyBg)" />

    {/* Smart Fast Check Device */}
    <Rect x="80" y="30" width="120" height="180" rx="18" fill="#0D1333" />
    <Rect x="88" y="38" width="104" height="164" rx="12" fill="#FFFFFF" />

    {/* Success Badge */}
    <Circle cx="140" cy="100" r="32" fill="#00BA88" />
    <Path d="M128 100 L136 108 L152 92" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

    {/* Instant Analytics bars */}
    <Rect x="102" y="148" width="16" height="32" rx="4" fill="#7B61FF" />
    <Rect x="124" y="136" width="16" height="44" rx="4" fill="#FFA800" />
    <Rect x="146" y="156" width="16" height="24" rx="4" fill="#00BA88" />
    <Rect x="168" y="142" width="16" height="38" rx="4" fill="#0D1333" />

    {/* Sparkles */}
    <Circle cx="50" cy="90" r="6" fill="#FFA800" />
    <Circle cx="230" cy="70" r="8" fill="#7B61FF" />
    <Circle cx="215" cy="170" r="5" fill="#00BA88" />
  </Svg>
);

// Success Hand & Check Illustration (For Account Created, Send Success, Top Up Success)
export const SuccessIllustration: React.FC<IllustrationProps> = ({
  width = 180,
  height = 180,
}) => (
  <Svg width={width} height={height} viewBox="0 0 180 180" fill="none">
    <Defs>
      <LinearGradient id="succBg" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#E6F9F3" />
        <Stop stopColor="#EDE9FE" />
      </LinearGradient>
    </Defs>

    <Circle cx="90" cy="90" r="80" fill="url(#succBg)" />
    <Circle cx="90" cy="90" r="54" fill="#00BA88" />
    <Path
      d="M72 90 L84 102 L108 78"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Lavender & Orange Decorative Sparkles */}
    <Circle cx="30" cy="45" r="7" fill="#7B61FF" opacity="0.7" />
    <Circle cx="150" cy="50" r="6" fill="#FFA800" opacity="0.8" />
    <Circle cx="25" cy="130" r="5" fill="#FFA800" opacity="0.7" />
    <Circle cx="155" cy="135" r="8" fill="#7B61FF" opacity="0.6" />
    <Circle cx="90" cy="20" r="4" fill="#00BA88" />
  </Svg>
);

// Security Shield Illustration (For Forgot Password)
export const SecurityIllustration: React.FC<IllustrationProps> = ({
  width = 200,
  height = 180,
}) => (
  <Svg width={width} height={height} viewBox="0 0 200 180" fill="none">
    <Circle cx="100" cy="90" r="75" fill="#EDE9FE" opacity="0.6" />
    <Path
      d="M100 25 L45 45 V85 C45 125 68 158 100 165 C132 158 155 125 155 85 V45 L100 25 Z"
      fill="#0D1333"
    />
    <Circle cx="100" cy="92" r="22" fill="#7B61FF" />
    <Path
      d="M93 92 V85 C93 81.1 96.1 78 100 78 C103.9 78 107 81.1 107 85 V92"
      stroke="#FFFFFF"
      strokeWidth="3"
    />
    <Rect x="90" y="92" width="20" height="15" rx="3" fill="#FFFFFF" />
    <Circle cx="100" cy="99" r="2" fill="#0D1333" />
  </Svg>
);

// Barcode Visual for Transaction Receipt
export const BarcodeVisual: React.FC<{ width?: number; height?: number }> = ({
  width = 260,
  height = 60,
}) => (
  <Svg width={width} height={height} viewBox="0 0 260 60" fill="none">
    <Rect x="0" y="0" width="260" height="60" rx="8" fill="#F8F9FD" />
    <G fill="#0D1333">
      <Rect x="15" y="10" width="4" height="40" />
      <Rect x="23" y="10" width="2" height="40" />
      <Rect x="29" y="10" width="6" height="40" />
      <Rect x="40" y="10" width="3" height="40" />
      <Rect x="47" y="10" width="5" height="40" />
      <Rect x="56" y="10" width="2" height="40" />
      <Rect x="62" y="10" width="7" height="40" />
      <Rect x="73" y="10" width="3" height="40" />
      <Rect x="80" y="10" width="2" height="40" />
      <Rect x="86" y="10" width="5" height="40" />
      <Rect x="95" y="10" width="4" height="40" />
      <Rect x="103" y="10" width="2" height="40" />
      <Rect x="109" y="10" width="6" height="40" />
      <Rect x="119" y="10" width="4" height="40" />
      <Rect x="127" y="10" width="2" height="40" />
      <Rect x="133" y="10" width="5" height="40" />
      <Rect x="142" y="10" width="3" height="40" />
      <Rect x="149" y="10" width="6" height="40" />
      <Rect x="159" y="10" width="2" height="40" />
      <Rect x="165" y="10" width="4" height="40" />
      <Rect x="173" y="10" width="5" height="40" />
      <Rect x="182" y="10" width="2" height="40" />
      <Rect x="188" y="10" width="7" height="40" />
      <Rect x="199" y="10" width="3" height="40" />
      <Rect x="206" y="10" width="5" height="40" />
      <Rect x="215" y="10" width="2" height="40" />
      <Rect x="221" y="10" width="6" height="40" />
      <Rect x="231" y="10" width="3" height="40" />
      <Rect x="238" y="10" width="5" height="40" />
    </G>
  </Svg>
);

import React, { useState } from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import { CustomTextInput } from './CustomTextInput';
import { EyeIcon, EyeOffIcon, LockIcon } from '../../assets/icons';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  showLockIcon?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  error,
  containerStyle,
  showLockIcon = true,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <CustomTextInput
      label={label}
      error={error}
      secureTextEntry={!showPassword}
      leftIcon={showLockIcon ? <LockIcon size={20} /> : undefined}
      rightIcon={showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
      onRightIconPress={() => setShowPassword(!showPassword)}
      containerStyle={containerStyle}
      {...rest}
    />
  );
};

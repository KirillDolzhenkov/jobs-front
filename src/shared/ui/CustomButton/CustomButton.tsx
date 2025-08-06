import { Button, ButtonProps } from '@mui/material';
import styles from './CustomButton.module.css';

const CustomButton = ({ variant = 'contained', size = 'medium', className = '', ...props }: ButtonProps) => {
  const variantClass = styles[variant] || '';
  return <Button variant={variant} size={size} className={`${variantClass} ${className}`} {...props} />;
};

export default CustomButton;
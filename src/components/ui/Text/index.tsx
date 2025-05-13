import { cn } from '@/lib/utils';

import { typographyClassName } from './data';
import type { TextProps } from './types';

const Text = ({
  as: Component = 'p',
  children,
  typography = 'regular',
  color = 'normal',
  className,
  resetTypography,
  resetColor,
  ...props
}: TextProps) => {
  const getTypographyClassName = (): string => {
    if (resetTypography) return '';

    return typographyClassName[typography] ?? typographyClassName.regular;
  };

  const getColorClassName = (): string => {
    if (resetColor) return '';

    const colorClassName = {
      normal: 'text-gray-800',
      subtitle: 'text-slate-500'
    };

    return colorClassName[color] ?? colorClassName.normal;
  };

  const fincalClassName = cn(
    getTypographyClassName(),
    getColorClassName(),
    className
  );

  return <Component className={fincalClassName} {...props}>{children}</Component>;
};

export default Text;

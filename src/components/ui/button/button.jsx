import { Spinner } from '@/components/ui/spinner/spinner';
import { cn } from '@/utils/cn';

const variants = {
  default: 'bg-brand-600 text-white hover:bg-brand-700',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-slate-300 bg-white hover:bg-slate-100',
  ghost: 'hover:bg-slate-100',
};

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-11 px-8',
};

export const Button = ({
  className,
  variant = 'default',
  size = 'default',
  isLoading = false,
  disabled,
  children,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="text-current" />}
      {children}
    </button>
  );
};

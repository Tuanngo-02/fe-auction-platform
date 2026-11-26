import { Spinner } from '@/components/ui/spinner/spinner';
import { cn } from '@/utils/cn';

const variants = {
  default: 'bg-[#fe6807] text-[#09080E] font-bold hover:bg-[#e05600] shadow-sm',
  dark: 'bg-[#09080E] text-white font-semibold hover:bg-[#2f3039] shadow-sm',
  destructive: 'bg-[#ba1a1a] text-white font-semibold hover:bg-[#93000a]',
  outline: 'border border-[#E5E5E9] bg-white text-[#09080E] font-semibold hover:bg-[#F7F7F5]',
  ghost: 'text-[#62626C] hover:bg-[#F7F7F5] hover:text-[#09080E]',
};

const sizes = {
  default: 'h-[44px] px-5 py-2 text-sm',
  sm: 'h-9 px-3.5 text-xs',
  lg: 'h-12 px-8 text-base',
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
        'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-150 active:translate-y-px',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09080E]',
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

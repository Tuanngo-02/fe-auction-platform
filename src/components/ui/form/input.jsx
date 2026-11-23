import { useId } from 'react';

import { cn } from '@/utils/cn';

// Dùng với react-hook-form: <Input label="..." error={errors.x} registration={register('x')} />
export const Input = ({ label, error, registration, className, type = 'text', ...props }) => {
  const id = useId();
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(
          'block h-10 w-full rounded-md border border-slate-300 px-3 text-sm shadow-sm',
          'focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className,
        )}
        {...registration}
        {...props}
      />
      {error?.message && (
        <p role="alert" className="text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
};

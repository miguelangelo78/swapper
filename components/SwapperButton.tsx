'use client';
import { Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { Observable } from 'rxjs';

export type StyleType = 'primary' | 'secondary' | 'tertiary';

export type SwapperButtonProps = {
  text: string,
  onClick?: () => void,
  className?: string,
  type?: 'button' | 'submit',
  styleType?: StyleType,
  action?: (formData?: any) => void,
  useSpinner?: boolean,
  disabled?: boolean,
  setLoading$?: Observable<boolean>,
};

export function SwapperButton({
  text,
  onClick,
  className,
  type = 'button',
  styleType = 'primary',
  action,
  useSpinner = false,
  disabled = false,
  setLoading$,
}: SwapperButtonProps) {
  const [loading, setLoading] = useState(false);

  const style = getStyle(styleType, loading, disabled);

  const content = loading ? <Spinner color="secondary" size="sm" /> : text; // Show spinner if loading state is true, otherwise show text

  const handleClick = () => {
    if (useSpinner) {
      setTimeout(() => setLoading(true), 10);
    }
    if (onClick) {
      onClick();
    }
  };

  if (setLoading$) {
    setLoading$.subscribe((value) => setLoading(!!value));
  }

  if (action) {
    return (
      <form className="flex flex-wrap flex-col items-center justify-center w-80" action={action}>
        <button
          type="submit"
          className={`${style} ${className}`}
          onClick={handleClick}
          disabled={loading}
        >
          {content}
        </button>
      </form>
    );  
  }

  return (
    <button
      type={type}
      className={`${style} ${className}`}
      onClick={handleClick}
      disabled={loading || disabled}
    >
      {content}
    </button>
  );
}

function getStyle(styleType: StyleType, loading: boolean, disabled?: boolean) {
  let primaryStyle = 'py-2 w-40 h-10 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  let secondaryStyle = 'py-2 w-40 h-10 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50';
  let tertiaryStyle = 'bg-tertiary text-primary rounded-lg border border-primary font-semibold px-4 h-10 text-sm w-24';

  if (loading || disabled) {
    primaryStyle += ' disabled:opacity-50 bg-indigo-600 cursor-not-allowed';
    secondaryStyle += ' disabled:opacity-50 cursor-not-allowed';
    tertiaryStyle += ' disabled:opacity-50 cursor-not-allowed';
  }

  let style;

  switch (styleType) {
    case 'primary':
      style = primaryStyle;
      break;
    case 'secondary':
      style = secondaryStyle;
      break;
    case 'tertiary':
      style = tertiaryStyle;
      break;
    default:
      style = primaryStyle;
  }

  return style;
}

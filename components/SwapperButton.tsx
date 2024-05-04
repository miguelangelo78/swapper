'use client';
export type StyleType = 'primary' | 'secondary';

export type SwapperButtonProps = {
  text: string,
  onClick?: () => void,
  className?: string,
  type?: 'button' | 'submit',
  styleType?: StyleType,
  action?: (formData: any) => void,
};

export function SwapperButton({ text, onClick, className, type = 'button', styleType = 'primary', action }: SwapperButtonProps) {
  const primaryStyle = 'py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  const secondaryStyle = 'py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50';

  const style = styleType === 'primary' ? primaryStyle : secondaryStyle;

  if (action) {
    return (
      <form className="flex flex-wrap flex-col items-center justify-center w-80" onSubmit={action}>
        <button
          type="submit"
          className={`${style} ${className}`}
        >
          {text}
        </button>
      </form>
    );  
  }

  return (
    <button
      type={type}
      className={`${style} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

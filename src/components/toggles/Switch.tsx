'use client';

type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  ariaLabel?: string;
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const trackSize: Record<SwitchSize, string> = {
  sm: 'w-10 h-6',
  md: 'w-12 h-7',
  lg: 'w-14 h-8',
};

const knobSize: Record<SwitchSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
};

const translateChecked: Record<SwitchSize, string> = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-6',
};

export function Switch({
  checked,
  onChange,
  disabled,
  size = 'md',
  ariaLabel,
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={classNames(
        'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        trackSize[size],
        checked ? 'bg-black/90 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-700',
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <span
        className={classNames(
          'pointer-events-none inline-block transform rounded-full bg-white shadow transition-transform dark:bg-black',
          knobSize[size],
          checked ? translateChecked[size] : 'translate-x-1',
        )}
      />
    </button>
  );
}

export default Switch;

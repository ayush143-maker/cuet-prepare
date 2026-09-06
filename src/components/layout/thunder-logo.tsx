interface ThunderLogoProps {
  className?: string;
}

export function ThunderLogo({ className }: ThunderLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="thunder-logo-gradient"
          x1="4"
          y1="2"
          x2="20"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A5B4FC" />
          <stop offset="0.5" stopColor="#E879F9" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      <path
        d="M13 2 3 14h7l-1 8 11-12h-7l1-8z"
        fill="url(#thunder-logo-gradient)"
      />
    </svg>
  );
}

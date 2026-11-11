export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="14" fill="#0B6E6E" />
      <rect
        x="12"
        y="14"
        width="40"
        height="36"
        rx="6"
        fill="#F4EDE4"
        stroke="#FF6B4A"
        strokeWidth="2"
      />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontFamily="system-ui,sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="#0B6E6E"
      >
        =
      </text>
    </svg>
  );
}

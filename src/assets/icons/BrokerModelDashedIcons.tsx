export const ICON_COLORS = {
  default: '#00796B',
  primary: '#00796B',
  secondary: '#666666',
  error: '#DC2626',
  success: '#43A047',
  warning: '#e57d76',
} as const

export const NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15.917,12.5c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5h-4.293c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5H15.917z"
    />
    <path
      fill="currentColor"
      d="M9.97,11.5H8.583c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5H9.97c0.276,0,0.5-0.224,0.5-0.5S10.247,11.5,9.97,11.5z"
    />
    <path
      fill="currentColor"
      d="M8.083,16.167c0,0.276,0.224,0.5,0.5,0.5h7.333c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5H8.583C8.307,15.667,8.083,15.89,8.083,16.167z"
    />
    <path
      fill="currentColor"
      d="M7.995,20.99h8.01c1.376,0,2.495-1.119,2.495-2.495V7.39c0-0.133-0.053-0.26-0.146-0.354l-3.88-3.88C14.38,3.063,14.253,3.01,14.12,3.01h-3.516c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h3.049c-0.02,0.071-0.033,0.145-0.033,0.221V6.38c0,0.833,0.677,1.51,1.51,1.51h2.149c0.076,0,0.15-0.013,0.221-0.033v10.638c0,0.824-0.671,1.495-1.495,1.495h-8.01c-0.824,0-1.495-0.671-1.495-1.495V5.505c0-0.389,0.148-0.757,0.418-1.037c0,0,0,0,0,0c0,0,0,0,0,0C7.203,4.172,7.585,4.01,7.995,4.01h0.958c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5H7.995c-0.684,0-1.322,0.271-1.796,0.764c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.001C5.748,4.242,5.5,4.856,5.5,5.505v12.99C5.5,19.871,6.619,20.99,7.995,20.99z M15.13,6.89c-0.281,0-0.51-0.229-0.51-0.51V4.717l2.173,2.173H15.13z"
    />
  </svg>
);

export const DatabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    <path
      d="M4 18V6"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
    />
    <path
      d="M20 12L20 18"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
    />
    <path
      d="M12 10C16.4183 10 20 8.20914 20 6C20 3.79086 16.4183 2 12 2C7.58172 2 4 3.79086 4 6C4 8.20914 7.58172 10 12 10Z"
      stroke="currentColor"
      strokeWidth="0.936"
    />
    <path
      d="M20 12C20 14.2091 16.4183 16 12 16C7.58172 16 4 14.2091 4 12"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
    />
    <path
      d="M20 18C20 20.2091 16.4183 22 12 22C7.58172 22 4 20.2091 4 18"
      stroke="currentColor"
      strokeWidth="0.936"
    />
  </svg>
);

export const ICON_COLORS = {
  default: '#00796B',
  primary: '#00796B',
  secondary: '#666666',
  error: '#DC2626',
  success: '#43A047',
  warning: '#e57d76',
} as const

export const ConfigIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    <line
      x1="6"
      y1="4"
      x2="6"
      y2="20"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
    />
    <rect x="4" y="8" width="4" height="3" rx="1" fill="currentColor" />
    <line
      x1="12"
      y1="4"
      x2="12"
      y2="20"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
    />
    <rect x="10" y="12" width="4" height="3" rx="1" fill="currentColor" />
    <line
      x1="18"
      y1="4"
      x2="18"
      y2="20"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
    />
    <rect x="16" y="6" width="4" height="3" rx="1" fill="currentColor" />
  </svg>
)

export const CloudUploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
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
      d="M6.27126 16C4.31103 14.7751 3 12.5463 3 10C3 6.13401 6.02208 3 9.75 3C13.1779 3 16.009 5.64982 16.4425 9.08201C16.4575 9.20119 16.5708 9.28382 16.6895 9.26537C16.8724 9.23695 17.0595 9.22222 17.25 9.22222C19.3211 9.22222 21 10.9633 21 13.1111C21 14.2576 20.5216 15.2882 19.7605 16"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
    />
    <path
      d="M13 13.5V21"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 16L13.5 13.5V13.5C13.2239 13.2239 12.7761 13.2239 12.5 13.5V13.5L10 16"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MonitorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    <path
      d="M12 17V21M8 21H16M6.2 17H17.8C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2V13.8C3 14.9201 3 15.4802 3.21799 15.908C3.40973 16.2843 3.71569 16.5903 4.09202 16.782C4.51984 17 5.07989 17 6.2 17Z"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
    />
  </svg>
)

export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    <path
      opacity="0.15"
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
    />
    <path
      d="M19 15C21.2091 15 23 16.7909 23 19V21H21M16 10.874C17.7252 10.4299 19 8.86384 19 7C19 5.13617 17.7252 3.57007 16 3.12602M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM5 15H13C15.2091 15 17 16.7909 17 19V21H1V19C1 16.7909 2.79086 15 5 15Z"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#00796B';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M22 22L2 22" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round"
        ></path>
        <path 
          d="M2 11L10.1259 4.49931C11.2216 3.62279 12.7784 3.62279 13.8741 4.49931L22 11" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round"
        ></path>
        <path 
          d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round"
        ></path>
        <path 
          d="M4 22V9.5" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round"
        ></path>
        <path 
          d="M20 22V9.5" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round"
        ></path>
        <path 
          d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V22" 
          stroke={iconColor} 
          strokeWidth="0.936"
        ></path>
        <path 
          d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" 
          stroke={iconColor} 
          strokeWidth="0.936"
        ></path>
      </g>
    </svg>
  );
};


export const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#00796B';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{color:ICON_COLORS.primary,...props.style}}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M9 15V12.5L17.75 3.75C18.4404 3.05964 19.5596 3.05964 20.25 3.75V3.75C20.9404 4.44036 20.9404 5.55964 20.25 6.25L15.5 11L11.5 15H9Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};


export const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: ICON_COLORS.warning, ...props.style }}
    {...props}
  >
    <path
      d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    <path
      d="M416,221.25V416a48,48,0,0,1-48,48H144a48,48,0,0,1-48-48V96a48,48,0,0,1,48-48h98.75a32,32,0,0,1,22.62,9.37L406.63,198.63A32,32,0,0,1,416,221.25Z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="20"
    />
    <path
      d="M256,56V176a32,32,0,0,0,32,32H408"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="20"
    />
  </svg>
)


export const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.25 3.75V5.43953L18.25 7.03953V3.75H16.25ZM19.75 8.23953V3.5C19.75 2.80964 19.1904 2.25 18.5 2.25H16C15.3097 2.25 14.75 2.80964 14.75 3.5V4.23953L14.3426 3.91362C12.9731 2.81796 11.027 2.81796 9.65742 3.91362L1.53151 10.4143C1.20806 10.6731 1.15562 11.1451 1.41438 11.4685C1.67313 11.792 2.1451 11.8444 2.46855 11.5857L3.25003 10.9605V21.25H2.00003C1.58581 21.25 1.25003 21.5858 1.25003 22C1.25003 22.4142 1.58581 22.75 2.00003 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H20.75V10.9605L21.5315 11.5857C21.855 11.8444 22.3269 11.792 22.5857 11.4685C22.8444 11.1451 22.792 10.6731 22.4685 10.4143L19.75 8.23953ZM19.25 9.76047L13.4056 5.08492C12.5838 4.42753 11.4162 4.42753 10.5945 5.08492L4.75003 9.76047V21.25H8.25003L8.25003 16.9506C8.24999 16.2858 8.24996 15.7129 8.31163 15.2542C8.37773 14.7625 8.52679 14.2913 8.90904 13.909C9.29128 13.5268 9.76255 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9507 13.25H12.0494C12.7143 13.25 13.2871 13.2499 13.7459 13.3116C14.2375 13.3777 14.7088 13.5268 15.091 13.909C15.4733 14.2913 15.6223 14.7625 15.6884 15.2542C15.7501 15.7129 15.7501 16.2858 15.75 16.9506L15.75 21.25H19.25V9.76047ZM14.25 21.25V17C14.25 16.2717 14.2484 15.8009 14.2018 15.454C14.1581 15.1287 14.0875 15.0268 14.0304 14.9697C13.9733 14.9126 13.8713 14.842 13.546 14.7982C13.1991 14.7516 12.7283 14.75 12 14.75C11.2717 14.75 10.8009 14.7516 10.4541 14.7982C10.1288 14.842 10.0268 14.9126 9.9697 14.9697C9.9126 15.0268 9.84199 15.1287 9.79826 15.454C9.75162 15.8009 9.75003 16.2717 9.75003 17V21.25H14.25ZM12 8.25C11.3097 8.25 10.75 8.80964 10.75 9.5C10.75 10.1904 11.3097 10.75 12 10.75C12.6904 10.75 13.25 10.1904 13.25 9.5C13.25 8.80964 12.6904 8.25 12 8.25ZM9.25003 9.5C9.25003 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25003 11.0188 9.25003 9.5Z"
      fill="currentColor"
    />
  </svg>
)

export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    <path
      d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="0.936"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const ZipFolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  const iconColor = props?.style?.color || ICON_COLORS.primary

  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      fill={iconColor}
      stroke={iconColor}
      strokeWidth="0.936"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs>
          <style>{`.cls-1{fill:${iconColor};}`}</style>
        </defs>
        <title></title>
        <g id="xxx-word">
          <path
            className="cls-1"
            d="M325,105H250a5,5,0,0,1-5-5V25a5,5,0,1,1,10,0V95h70a5,5,0,0,1,0,10Z"
          ></path>
          <path
            className="cls-1"
            d="M325,154.83a5,5,0,0,1-5-5V102.07L247.93,30H100A20,20,0,0,0,80,50v98.17a5,5,0,0,1-10,0V50a30,30,0,0,1,30-30H250a5,5,0,0,1,3.54,1.46l75,75A5,5,0,0,1,330,100v49.83A5,5,0,0,1,325,154.83Z"
          ></path>
          <path
            className="cls-1"
            d="M300,380H100a30,30,0,0,1-30-30V275a5,5,0,0,1,10,0v75a20,20,0,0,0,20,20H300a20,20,0,0,0,20-20V275a5,5,0,0,1,10,0v75A30,30,0,0,1,300,380Z"
          ></path>
          <path
            className="cls-1"
            d="M275,280H125a5,5,0,1,1,0-10H275a5,5,0,0,1,0,10Z"
          ></path>
          <path
            className="cls-1"
            d="M200,330H125a5,5,0,1,1,0-10h75a5,5,0,0,1,0,10Z"
          ></path>
          <path
            className="cls-1"
            d="M325,280H75a30,30,0,0,1-30-30V173.17a30,30,0,0,1,30-30h.2l250,1.66a30.09,30.09,0,0,1,29.81,30V250A30,30,0,0,1,325,280ZM75,153.17a20,20,0,0,0-20,20V250a20,20,0,0,0,20,20H325a20,20,0,0,0,20-20V174.83a20.06,20.06,0,0,0-19.88-20l-250-1.66Z"
          ></path>
          <path
            className="cls-1"
            d="M185.08,227.72V236H145.66v-7.58L173,190.3H147.58v-7.62H184.3v7.62l-27,37.42Z"
          ></path>
          <path className="cls-1" d="M202.15,236h-9.61V182.68h9.61Z"></path>
          <path
            className="cls-1"
            d="M223.48,236h-9.61V182.68H235.7q9.34,0,13.85,4.71a16.37,16.37,0,0,1-.37,22.95,17.49,17.49,0,0,1-12.38,4.53H223.48Zm0-29.37h11.37q4.45,0,6.8-2.19a7.58,7.58,0,0,0,2.34-5.82a8,8,0,0,0-2.17-5.62q-2.17-2.34-7.83-2.34H223.48Z"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export const CSVFolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  const iconColor = props?.style?.color || ICON_COLORS.primary

  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      fill={iconColor}
      stroke={iconColor}
      stroke-width="0.936"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0.936"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <defs>
          <style>{`.cls-1{fill:${iconColor};}`}</style>
        </defs>{' '}
        <title></title>{' '}
        <g id="xxx-word">
          {' '}
          <path
            className="cls-1"
            d="M325,105H250a5,5,0,0,1-5-5V25a5,5,0,1,1,10,0V95h70a5,5,0,0,1,0,10Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M325,154.83a5,5,0,0,1-5-5V102.07L247.93,30H100A20,20,0,0,0,80,50v98.17a5,5,0,0,1-10,0V50a30,30,0,0,1,30-30H250a5,5,0,0,1,3.54,1.46l75,75A5,5,0,0,1,330,100v49.83A5,5,0,0,1,325,154.83Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M300,380H100a30,30,0,0,1-30-30V275a5,5,0,0,1,10,0v75a20,20,0,0,0,20,20H300a20,20,0,0,0,20-20V275a5,5,0,0,1,10,0v75A30,30,0,0,1,300,380Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M275,280H125a5,5,0,1,1,0-10H275a5,5,0,0,1,0,10Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M200,330H125a5,5,0,1,1,0-10h75a5,5,0,0,1,0,10Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M325,280H75a30,30,0,0,1-30-30V173.17a30,30,0,0,1,30-30h.2l250,1.66a30.09,30.09,0,0,1,29.81,30V250A30,30,0,0,1,325,280ZM75,153.17a20,20,0,0,0-20,20V250a20,20,0,0,0,20,20H325a20,20,0,0,0,20-20V174.83a20.06,20.06,0,0,0-19.88-20l-250-1.66Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M168.48,217.48l8.91,1a20.84,20.84,0,0,1-6.19,13.18q-5.33,5.18-14,5.18-7.31,0-11.86-3.67a23.43,23.43,0,0,1-7-10,37.74,37.74,0,0,1-2.46-13.87q0-12.19,5.78-19.82t15.9-7.64a18.69,18.69,0,0,1,13.2,4.88q5.27,4.88,6.64,14l-8.91.94q-2.46-12.07-10.86-12.07-5.39,0-8.38,5t-3,14.55q0,9.69,3.2,14.63t8.48,4.94a9.3,9.3,0,0,0,7.19-3.32A13.25,13.25,0,0,0,168.48,217.48Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M179.41,223.15l9.34-2q1.68,7.93,12.89,7.93,5.12,0,7.87-2a6.07,6.07,0,0,0,2.75-5,7.09,7.09,0,0,0-1.25-4q-1.25-1.85-5.35-2.91l-10.2-2.66a25.1,25.1,0,0,1-7.73-3.11,12.15,12.15,0,0,1-4-4.9,15.54,15.54,0,0,1-1.5-6.76,14,14,0,0,1,5.31-11.46q5.31-4.32,13.59-4.32a24.86,24.86,0,0,1,12.29,3,13.56,13.56,0,0,1,6.89,8.52l-9.14,2.27q-2.11-6.05-9.84-6.05-4.49,0-6.86,1.88a5.83,5.83,0,0,0-2.36,4.77q0,4.57,7.42,6.41l9.06,2.27q8.24,2.07,11.05,6.11a15.29,15.29,0,0,1,2.81,8.93,14.7,14.7,0,0,1-5.92,12.36q-5.92,4.51-15.33,4.51a28,28,0,0,1-13.89-3.32A16.29,16.29,0,0,1,179.41,223.15Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M250.31,236h-9.77L224.1,182.68h10.16l12.23,40.86L259,182.68h8Z"
          ></path>{' '}
        </g>{' '}
      </g>
    </svg>
  )
}

export const ExcelFolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  const iconColor = props?.style?.color || ICON_COLORS.primary

  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      fill={iconColor}
      stroke={iconColor}
      stroke-width="0.936"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0.936"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <defs>
          {' '}
          <style>{`.cls-1{fill:${iconColor}}`}</style>{' '}
        </defs>{' '}
        <title></title>{' '}
        <g id="xxx-word">
          {' '}
          <path
            className="cls-1"
            d="M325,105H250a5,5,0,0,1-5-5V25a5,5,0,1,1,10,0V95h70a5,5,0,0,1,0,10Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M325,154.83a5,5,0,0,1-5-5V102.07L247.93,30H100A20,20,0,0,0,80,50v98.17a5,5,0,0,1-10,0V50a30,30,0,0,1,30-30H250a5,5,0,0,1,3.54,1.46l75,75A5,5,0,0,1,330,100v49.83A5,5,0,0,1,325,154.83Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M300,380H100a30,30,0,0,1-30-30V275a5,5,0,0,1,10,0v75a20,20,0,0,0,20,20H300a20,20,0,0,0,20-20V275a5,5,0,0,1,10,0v75A30,30,0,0,1,300,380Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M275,280H125a5,5,0,1,1,0-10H275a5,5,0,0,1,0,10Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M200,330H125a5,5,0,1,1,0-10h75a5,5,0,0,1,0,10Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M325,280H75a30,30,0,0,1-30-30V173.17a30,30,0,0,1,30-30h.2l250,1.66a30.09,30.09,0,0,1,29.81,30V250A30,30,0,0,1,325,280ZM75,153.17a20,20,0,0,0-20,20V250a20,20,0,0,0,20,20H325a20,20,0,0,0,20-20V174.83a20.06,20.06,0,0,0-19.88-20l-250-1.66Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M152.44,236H117.79V182.68h34.3v7.93H127.4v14.45h19.84v7.73H127.4v14.92h25Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M190.18,236H180l-8.36-14.37L162.52,236h-7.66L168,215.69l-11.37-19.14h10.2l6.48,11.6,7.38-11.6h7.46L177,213.66Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M217.4,221.51l7.66.78q-1.49,7.42-5.74,11A15.5,15.5,0,0,1,209,236.82q-8.17,0-12.56-6a23.89,23.89,0,0,1-4.39-14.59q0-8.91,4.8-14.73a15.77,15.77,0,0,1,12.81-5.82q12.89,0,15.35,13.59l-7.66,1.05q-1-7.34-7.23-7.34a6.9,6.9,0,0,0-6.58,4,20.66,20.66,0,0,0-2.05,9.59q0,6,2.13,9.22a6.74,6.74,0,0,0,6,3.24Q215.49,229,217.4,221.51Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M257,223.42l8,1.09a16.84,16.84,0,0,1-6.09,8.83,18.13,18.13,0,0,1-11.37,3.48q-8.2,0-13.2-5.51t-5-14.92q0-8.94,5-14.8t13.67-5.86q8.44,0,13,5.78t4.61,14.84l0,1H238.61a22.12,22.12,0,0,0,.76,6.45,8.68,8.68,0,0,0,3,4.22,8.83,8.83,0,0,0,5.66,1.8Q254.67,229.83,257,223.42Zm-.55-11.8a9.92,9.92,0,0,0-2.56-7,8.63,8.63,0,0,0-12.36-.18,11.36,11.36,0,0,0-2.89,7.13Z"
          ></path>{' '}
          <path
            className="cls-1"
            d="M282.71,236h-8.91V182.68h8.91Z"
          ></path>{' '}
        </g>{' '}
      </g>
    </svg>
  )
}

export const WarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || ICON_COLORS.primary;
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};


export const QuariantinedMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0.936"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {' '}
      <path
        d="M12 15H12.01M12 12V9M4.98207 19H19.0179C20.5615 19 21.5233 17.3256 20.7455 15.9923L13.7276 3.96153C12.9558 2.63852 11.0442 2.63852 10.2724 3.96153L3.25452 15.9923C2.47675 17.3256 3.43849 19 4.98207 19Z"
        stroke="#ff7700"
        stroke-width="0.936"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>{' '}
    </g>
  </svg>
)

export const QuestionMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#000000';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke={iconColor} 
          strokeWidth="0.936"
        ></circle>
        <path 
          d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round"
        ></path>
        <circle 
          cx="12" 
          cy="16" 
          r="1" 
          fill={iconColor}
        ></circle>
      </g>
    </svg>
  );
};


export const FailedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#e57d76';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};


export const ValidatedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#43A047';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke={iconColor} 
          strokeWidth="0.936"
        ></circle>
      </g>
    </svg>
  );
};

export const DrawerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg" 
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    {/* Main Tray Body - Vertically stretched by lowering the bottom to Y=22 and raising the sides */}
    <path 
      d="M3 12V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V12M3 12H8.5C9 12 9.5 12.5 10 13.5C10.5 14.5 11.2 15 12 15C12.8 15 13.5 14.5 14 13.5C14.5 12.5 15 12 15.5 12H21M3 12L5 8M21 12L19 8" 
      stroke="currentColor" 
      strokeWidth="0.936" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    
    {/* Trapezoid Top - Vertically stretched by moving the top edge higher to Y=2 */}
    <path 
      d="M5 8H19L16" 
      stroke="currentColor" 
      strokeWidth="0.936" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
)


export const ArchivedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#546e73';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M9 14H15M4.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V5.6C21 5.03995 21 4.75992 20.891 4.54601C20.7951 4.35785 20.6422 4.20487 20.454 4.10899C20.2401 4 19.9601 4 19.4 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10ZM5 10H19V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H8.2C7.07989 20 6.51984 20 6.09202 19.782C5.71569 19.5903 5.40973 19.2843 5.21799 18.908C5 18.4802 5 17.9201 5 16.8V10Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#546e73';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const SettingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#000000';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="0.936"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M11.0175 19C10.6601 19 10.3552 18.7347 10.297 18.373C10.2434 18.0804 10.038 17.8413 9.76171 17.75C9.53658 17.6707 9.31645 17.5772 9.10261 17.47C8.84815 17.3365 8.54289 17.3565 8.30701 17.522C8.02156 17.7325 7.62943 17.6999 7.38076 17.445L6.41356 16.453C6.15326 16.186 6.11944 15.7651 6.33361 15.458C6.49878 15.2105 6.52257 14.8914 6.39601 14.621C6.31262 14.4332 6.23906 14.2409 6.17566 14.045C6.08485 13.7363 5.8342 13.5051 5.52533 13.445C5.15287 13.384 4.8779 13.0559 4.87501 12.669V11.428C4.87303 10.9821 5.18705 10.6007 5.61601 10.528C5.94143 10.4645 6.21316 10.2359 6.33751 9.921C6.37456 9.83233 6.41356 9.74433 6.45451 9.657C6.61989 9.33044 6.59705 8.93711 6.39503 8.633C6.1424 8.27288 6.18119 7.77809 6.48668 7.464L7.19746 6.735C7.54802 6.37532 8.1009 6.32877 8.50396 6.625L8.52638 6.641C8.82735 6.84876 9.21033 6.88639 9.54428 6.741C9.90155 6.60911 10.1649 6.29424 10.2375 5.912L10.2473 5.878C10.3275 5.37197 10.7536 5.00021 11.2535 5H12.1115C12.6248 4.99976 13.0629 5.38057 13.1469 5.9L13.1625 5.97C13.2314 6.33617 13.4811 6.63922 13.8216 6.77C14.1498 6.91447 14.5272 6.87674 14.822 6.67L14.8707 6.634C15.2842 6.32834 15.8528 6.37535 16.2133 6.745L16.8675 7.417C17.1954 7.75516 17.2366 8.28693 16.965 8.674C16.7522 8.99752 16.7251 9.41325 16.8938 9.763L16.9358 9.863C17.0724 10.2045 17.3681 10.452 17.7216 10.521C18.1837 10.5983 18.5235 11.0069 18.525 11.487V12.6C18.5249 13.0234 18.2263 13.3846 17.8191 13.454C17.4842 13.5199 17.2114 13.7686 17.1083 14.102C17.0628 14.2353 17.0121 14.3687 16.9562 14.502C16.8261 14.795 16.855 15.1364 17.0323 15.402C17.2662 15.7358 17.2299 16.1943 16.9465 16.485L16.0388 17.417C15.7792 17.6832 15.3698 17.7175 15.0716 17.498C14.8226 17.3235 14.5001 17.3043 14.2331 17.448C14.0428 17.5447 13.8475 17.6305 13.6481 17.705C13.3692 17.8037 13.1636 18.0485 13.1099 18.346C13.053 18.7203 12.7401 18.9972 12.3708 19H11.0175Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M13.9747 12C13.9747 13.2885 12.9563 14.333 11.7 14.333C10.4437 14.333 9.42533 13.2885 9.42533 12C9.42533 10.7115 10.4437 9.66699 11.7 9.66699C12.9563 9.66699 13.9747 10.7115 13.9747 12Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};


export const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#000000';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      transform="rotate(180)"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M8 8L4 12M4 12L8 16M4 12L16 12" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};


export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#000000';
  
  return (
    <svg 
      viewBox="0 0 32 32" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          stroke={iconColor} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="0.936" 
          d="M13.294 5A11.19 11.19 0 1027 18.706s-5.723 2.19-10.81-2.897C11.105 10.723 13.295 5 13.295 5z"
        ></path>
      </g>
    </svg>
  );
};


export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#000000';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    <path
      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
      stroke="currentColor"
      strokeWidth="0.696"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="0.696"
      strokeLinecap="round"
    />
  </svg>
)



export const OrganizationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg" 
    style={{ color: ICON_COLORS.primary, ...props.style }}
    {...props}
  >
    <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="0.936" />
    
    <path 
      d="M9 21V19C9 17.8954 9.89543 17 11 17H13C14.1046 17 15 17.8954 15 19V21" 
      stroke="currentColor" 
      strokeWidth="0.936" 
      strokeLinecap="round" 
    />
    
    <circle cx="9" cy="8" r="1" fill="currentColor" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
    <circle cx="15" cy="8" r="1" fill="currentColor" />
    
    <circle cx="9" cy="11" r="1" fill="currentColor" />
    <circle cx="12" cy="11" r="1" fill="currentColor" />
    <circle cx="15" cy="11" r="1" fill="currentColor" />
    
    <circle cx="9" cy="14" r="1" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
    <circle cx="15" cy="14" r="1" fill="currentColor" />
  </svg>
)


export const AddUserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#000000';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg" 
      fill={iconColor} 
      stroke={iconColor}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <title></title>
        <g id="Complete">
          <g id="user-add">
            <g>
              <path 
                d="M17,21V19a4,4,0,0,0-4-4H5a4,4,0,0,0-4,4v2" 
                fill="none" 
                stroke={iconColor} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="0.936"
              ></path>
              <circle 
                cx="9" 
                cy="7" 
                fill="none" 
                r="4" 
                stroke={iconColor} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="0.936"
              ></circle>
              <line 
                fill="none" 
                stroke={iconColor} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="0.936" 
                x1="17" 
                x2="23" 
                y1="11" 
                y2="11"
              ></line>
              <line 
                fill="none" 
                stroke={iconColor} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="0.936" 
                x1="20" 
                x2="20" 
                y1="8" 
                y2="14"
              ></line>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#000000';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M3 17L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L12.2929 14.2929C12.6834 14.6834 13.3166 14.6834 13.7071 14.2929L21 7M21 7H16M21 7V12" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#00796B';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};




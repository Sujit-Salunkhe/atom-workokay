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

export const QuestionMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  const iconColor = props?.style?.color || '#00796B'

  return (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      fill={iconColor}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <style type="text/css">{`.st0{fill:${iconColor};}`}</style>
        <g>
          <path
            className="st0"
            d="M306.068,156.129c-6.566-5.771-14.205-10.186-22.912-13.244c-8.715-3.051-17.82-4.58-27.326-4.58 c-9.961,0-19.236,1.59-27.834,4.752c-8.605,3.171-16.127,7.638-22.576,13.41c-6.449,5.772-11.539,12.9-15.272,21.384 c-3.736,8.486-5.604,17.937-5.604,28.34h44.131c0-7.915,2.258-14.593,6.785-20.028c4.524-5.426,11.314-8.138,20.369-8.138 c8.598,0,15.328,2.661,20.197,7.974c4.864,5.322,7.297,11.942,7.297,19.856c0,3.854-0.965,7.698-2.887,11.543 c-1.922,3.854-4.242,7.586-6.959,11.197l-21.26,27.232c-4.527,5.884-16.758,22.908-16.758,40.316v10.187h44.129v-7.128 c0-2.938,0.562-5.996,1.699-9.168c1.127-3.162,6.453-10.904,8.268-13.168l21.264-28.243c4.752-6.333,8.705-12.839,11.881-19.518 c3.166-6.67,4.752-14.308,4.752-22.913c0-10.86-1.926-20.478-5.772-28.85C317.832,168.969,312.627,161.892,306.068,156.129z"
          ></path>
          <rect
            x="234.106"
            y="328.551"
            className="st0"
            width="46.842"
            height="45.144"
          ></rect>
          <path
            className="st0"
            d="M256,0C114.613,0,0,114.615,0,256s114.613,256,256,256c141.383,0,256-114.615,256-256S397.383,0,256,0z M256,448c-105.871,0-192-86.131-192-192S150.129,64,256,64c105.867,0,192,86.131,192,192S361.867,448,256,448z"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export const FailedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#e57d76';
  
  return (
    <svg 
      viewBox="0 0 32 32" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      fill={iconColor}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <title>cross-circle</title>
        <desc>Created with Sketch Beta.</desc>
        <defs></defs>
        <g id="Page-1" stroke="none" strokeWidth="0.936" fill="none" fillRule="evenodd">
          <g id="Icon-Set" transform="translate(-568.000000, -1087.000000)" fill={iconColor}>
            <path 
              d="M584,1117 C576.268,1117 570,1110.73 570,1103 C570,1095.27 576.268,1089 584,1089 C591.732,1089 598,1095.27 598,1103 C598,1110.73 591.732,1117 584,1117 L584,1117 Z M584,1087 C575.163,1087 568,1094.16 568,1103 C568,1111.84 575.163,1119 584,1119 C592.837,1119 600,1111.84 600,1103 C600,1094.16 592.837,1087 584,1087 L584,1087 Z M589.717,1097.28 C589.323,1096.89 588.686,1096.89 588.292,1097.28 L583.994,1101.58 L579.758,1097.34 C579.367,1096.95 578.733,1096.95 578.344,1097.34 C577.953,1097.73 577.953,1098.37 578.344,1098.76 L582.58,1102.99 L578.314,1107.26 C577.921,1107.65 577.921,1108.29 578.314,1108.69 C578.708,1109.08 579.346,1109.08 579.74,1108.69 L584.006,1104.42 L588.242,1108.66 C588.633,1109.05 589.267,1109.05 589.657,1108.66 C590.048,1108.27 590.048,1107.63 589.657,1107.24 L585.42,1103.01 L589.717,1098.71 C590.11,1098.31 590.11,1097.68 589.717,1097.28 L589.717,1097.28 Z" 
              id="cross-circle"
            ></path>
          </g>
        </g>
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

export const DrawerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#43A047';
  
  return (
    <svg 
      fill={iconColor} 
      viewBox="0 0 1024 1024" 
      xmlns="http://www.w3.org/2000/svg" 
      stroke={iconColor}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M1022.98 509.984L905.475 102.895c-3.84-13.872-16.464-23.472-30.848-23.472H139.283c-14.496 0-27.184 9.744-30.944 23.777L.947 489.552c-1.984 7.504-1.009 15.007 1.999 21.536C1.218 516.88.003 522.912.003 529.264v351.312c0 35.343 28.656 64 64 64h896c35.343 0 64-28.657 64-64V529.264c0-1.712-.369-3.329-.496-5.008.832-4.592.816-9.44-.527-14.272zm-859.078-366.56l686.369-.001 93.12 321.84H645.055c-1.44 76.816-55.904 129.681-133.057 129.681s-130.624-52.88-132.064-129.68H74.158zm796.097 737.151H64.001V529.263h263.12c27.936 80.432 95.775 129.68 184.879 129.68s157.936-49.248 185.871-129.68h262.128v351.312z"></path>
      </g>
    </svg>
  );
};

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
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" 
          fill={iconColor}
        ></path>
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z" 
          fill={iconColor}
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
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round"
        ></path>
        <path 
          d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" 
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
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M11.0174 2.80157C6.37072 3.29221 2.75 7.22328 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C16.7767 21.25 20.7078 17.6293 21.1984 12.9826C19.8717 14.6669 17.8126 15.75 15.5 15.75C11.4959 15.75 8.25 12.5041 8.25 8.5C8.25 6.18738 9.33315 4.1283 11.0174 2.80157ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.7166 1.25 13.0754 1.82126 13.1368 2.27627C13.196 2.71398 13.0342 3.27065 12.531 3.57467C10.8627 4.5828 9.75 6.41182 9.75 8.5C9.75 11.6756 12.3244 14.25 15.5 14.25C17.5882 14.25 19.4172 13.1373 20.4253 11.469C20.7293 10.9658 21.286 10.804 21.7237 10.8632C22.1787 10.9246 22.75 11.2834 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" 
          fill={iconColor}
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

export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
          d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        ></path>
        <rect 
          x="3" 
          y="5" 
          width="18" 
          height="14" 
          rx="2" 
          stroke={iconColor} 
          strokeWidth="0.936" 
          strokeLinecap="round"
        ></rect>
      </g>
    </svg>
  );
};

export const OrganizationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const iconColor = props?.style?.color || '#000000';
  
  return (
    <svg 
      fill={iconColor} 
      viewBox="0 0 56 56" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0.936"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path 
          d="M33.4662003,0 C34.6544305,0 35.596427,0.383055272 36.2921896,1.14916581 C36.9382251,1.86055418 37.2843156,2.80786215 37.330461,3.99108973 L37.3357854,4.26833017 L37.3357854,45.7317083 C37.3357854,47.0293892 36.9879201,48.0651914 36.2921896,48.8391149 C35.6461243,49.557758 34.7877452,49.9427455 33.7170522,49.9940771 L33.4662003,50 L3.89302374,50 C2.68916776,50 1.73935847,49.6130383 1.04359587,48.8391149 C0.397560332,48.1204717 0.0514698644,47.1760249 0.00532446873,46.0057744 L0,45.7317083 L0,4.26833017 C0,2.95499781 0.347865291,1.91527636 1.04359587,1.14916581 C1.68966114,0.437777453 2.55477688,0.0566765453 3.63894307,0.00586309089 L3.89302374,0 L33.4662003,0 Z M32.2232319,3.77583053 L5.13599215,3.77583053 C4.66696317,3.77583053 4.32300432,3.8852749 4.10411559,4.10416362 C3.91258796,4.29569126 3.80485366,4.58297571 3.78091271,4.96601697 L3.7757825,5.13604018 L3.7757825,44.863979 C3.7757825,45.333024 3.88522687,45.6769893 4.10411559,45.8958748 C4.29564323,46.0874024 4.58292768,46.1951367 4.96596894,46.2190777 L5.13599215,46.2242079 L10.506,46.2242079 L10.5065628,39.3058224 C10.5065628,38.3742504 10.7003376,37.6693023 11.0878873,37.1909782 L11.198387,37.066145 C11.6211684,36.6290106 12.250868,36.3922295 13.087486,36.3558016 L13.3207847,36.3508342 L24.0150007,36.3508342 C24.9843422,36.3508342 25.6957146,36.5892711 26.1491178,37.066145 C26.5647374,37.5032647 26.7898647,38.1670084 26.8244997,39.0573761 L26.8292226,39.3058224 L26.829,46.2242079 L32.2232319,46.2242079 C32.6766351,46.2242079 33.0127811,46.1147635 33.2316698,45.8958748 C33.4231975,45.70435 33.5309318,45.417061 33.5548727,45.0340078 L33.5600029,44.863979 L33.5600029,5.13604018 C33.5600029,4.6670112 33.4505586,4.32305235 33.2316698,4.10416362 C33.0127811,3.8852749 32.6766351,3.77583053 32.2232319,3.77583053 Z M23.0065628,39.4230828 L14.3292706,39.4230828 C13.8706508,39.4230828 13.6222318,39.6332836 13.5840135,40.0536851 L13.5788019,40.1735516 L13.578,46.224 L23.7570316,46.224 L23.7570316,40.1735516 C23.7570316,39.7149318 23.5468308,39.4665127 23.1264294,39.4282944 L23.0065628,39.4230828 Z M15.4549498,26.2429684 C16.0502016,26.2429684 16.3690865,26.5193353 16.4116045,27.0720692 L16.4165104,27.204529 L16.4165104,31.6369777 C16.4165104,32.2321998 16.1401435,32.5510688 15.5874097,32.5935846 L15.4549498,32.5984903 L10.8817732,32.5984903 C10.3155704,32.5984903 10.0122474,32.3221372 9.97180438,31.769431 L9.96713787,31.6369777 L9.96713787,27.204529 C9.96713787,26.6092772 10.2300178,26.2903923 10.7557775,26.2478743 L10.8817732,26.2429684 L15.4549498,26.2429684 Z M26.4305736,26.2429684 C27.0257957,26.2429684 27.3446647,26.5193353 27.3871805,27.0720692 L27.3920862,27.204529 L27.3920862,31.6369777 C27.3920862,32.2321998 27.1157331,32.5510688 26.5630269,32.5935846 L26.4305736,32.5984903 L21.8808356,32.5984903 C21.3001232,32.5984903 20.9890272,32.3221372 20.9475478,31.769431 L20.9427617,31.6369777 L20.9427617,27.204529 C20.9427617,26.6092772 21.2123782,26.2903923 21.7516112,26.2478743 L21.8808356,26.2429684 L26.4305736,26.2429684 Z M15.4549498,16.9559354 C16.0502016,16.9559354 16.3690865,17.2322885 16.4116045,17.7849947 L16.4165104,17.917448 L16.4165104,22.3498966 C16.4165104,22.9451485 16.1401435,23.2640334 15.5874097,23.3065513 L15.4549498,23.3114573 L10.8817732,23.3114573 C10.3155704,23.3114573 10.0122474,23.0350904 9.97180438,22.4823565 L9.96713787,22.3498966 L9.96713787,17.917448 C9.96713787,17.3222259 10.2300178,17.0033569 10.7557775,16.960841 L10.8817732,16.9559354 L15.4549498,16.9559354 Z M26.4305736,16.9559354 C27.0257957,16.9559354 27.3446647,17.2322885 27.3871805,17.7849947 L27.3920862,17.917448 L27.3920862,22.3498966 C27.3920862,22.9451485 27.1157331,23.2640334 26.5630269,23.3065513 L26.4305736,23.3114573 L21.8808356,23.3114573 C21.3001232,23.3114573 20.9890272,23.0350904 20.9475478,22.4823565 L20.9427617,22.3498966 L20.9427617,17.917448 C20.9427617,17.3222259 21.2123782,17.0033569 21.7516112,16.960841 L21.8808356,16.9559354 L26.4305736,16.9559354 Z M15.4549498,7.66885427 C16.0502016,7.66885427 16.3690865,7.94522119 16.4116045,8.49795502 L16.4165104,8.6304149 L16.4165104,13.0628636 C16.4165104,13.6581154 16.1401435,13.9770003 15.5874097,14.0195183 L15.4549498,14.0244242 L10.8817732,14.0244242 C10.3155704,14.0244242 10.0122474,13.7480573 9.97180438,13.1953235 L9.96713787,13.0628636 L9.96713787,8.6304149 C9.96713787,8.03516308 10.2300178,7.71627818 10.7557775,7.67376019 L10.8817732,7.66885427 L15.4549498,7.66885427 Z M26.4305736,7.66885427 C27.0257957,7.66885427 27.3446647,7.94522119 27.3871805,8.49795502 L27.3920862,8.6304149 L27.3920862,13.0628636 C27.3920862,13.6581154 27.1157331,13.9770003 26.5630269,14.0195183 L26.4305736,14.0244242 L21.8808356,14.0244242 C21.3001232,14.0244242 20.9890272,13.7480573 20.9475478,13.1953235 L20.9427617,13.0628636 L20.9427617,8.6304149 C20.9427617,8.03516308 21.2123782,7.71627818 21.7516112,7.67376019 L21.8808356,7.66885427 L26.4305736,7.66885427 Z" 
          transform="translate(9 3)"
        ></path>
      </g>
    </svg>
  );
};

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




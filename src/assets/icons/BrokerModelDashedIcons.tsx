export const ICON_COLORS = {
  default: '#00796B',
  primary: '#00796B',
  secondary: '#666666',
  error: '#DC2626',
  success: '#43A047',
  warning: '#e57d76',
} as const

export const ConfigIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)" {...props}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <path d="M41.5 10H35.5" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M27.5 6V14" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M27.5 10L5.5 10" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.5 24H5.5" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21.5 20V28" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M43.5 24H21.5" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M41.5 38H35.5" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M27.5 34V42" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M27.5 38H5.5" stroke="#000000" stroke-width="2.688" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
)

export const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {  return (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#1C274C" stroke-width="1.176" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="#1C274C" stroke-width="1.176" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  )
}



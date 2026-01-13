import type { Meta, StoryObj } from '@storybook/react-vite'

import ConfigIcon from '@/assets/icons/ConfigIcon.svg?react';
// import ConfigIcon2 from '@/assets/icons/ConfigIcon2.svg?react';
import CloudUploadIcon from '@/assets/icons/CloudUploadIcon.svg?react';
import MonitorIcon from '@/assets/icons/MonitorIcon.svg?react';
import UsersIcon from '@/assets/icons/UsersIcon.svg?react';
import HomeIcon from '@/assets/icons/HomeIcon.svg?react';
import EditIcon from '@/assets/icons/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/DeleteIcon.svg?react';
import DocumentIcon from '@/assets/icons/DocumentIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import ZipFolderIcon from '@/assets/icons/ZipFolderIcon.svg?react';
import CSVFolderIcon from '@/assets/icons/CSVFolderIcon.svg?react';
import ExcelFolderIcon from '@/assets/icons/ExcelFolderIcon.svg?react';
import InfoIcon from '@/assets/icons/InfoIcon.svg?react';
import WarningIcon from '@/assets/icons/WarningIcon.svg?react';
import QuestionMarkIcon from '@/assets/icons/QuestionMarkIcon.svg?react';
import FailedIcon from '@/assets/icons/FailedIcon.svg?react';
import ValidatedIcon from '@/assets/icons/ValidatedIcon.svg?react';
import DrawerIcon from '@/assets/icons/DrawerIcon.svg?react';
import ArchivedIcon from '@/assets/icons/ArchivedIcon.svg?react';
import FilterIcon from '@/assets/icons/FilterIcon.svg?react';
import SettingIcon from '@/assets/icons/SettingIcon.svg?react';
import LogoutIcon from '@/assets/icons/LogoutIcon.svg?react';
import MoonIcon from '@/assets/icons/MoonIcon.svg?react';
import SearchIcon from '@/assets/icons/SearchIcon.svg?react';
import EmailIcon from '@/assets/icons/EmailIcon.svg?react';
import OrganizationIcon from '@/assets/icons/OrganizationIcon.svg?react';
import AddUserIcon from '@/assets/icons/AddUserIcon.svg?react';
import TrendingUpIcon from '@/assets/icons/TrendingUpIcon.svg?react';
import FolderIcon from '@/assets/icons/FolderIcon.svg?react';
import TickIcon from '@/assets/icons/TickIcon.svg?react';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import DatabaseIcon from '@/assets/icons/DatabaseIcon.svg?react';
// import DocumentIcon2 from '@/assets/icons/DocumentIcon2.svg?react';
import SunIcon from '@/assets/icons/SunIcon.svg?react';
import LockIcon from '@/assets/icons/LockIcon.svg?react';





const meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <ConfigIcon className="h-8 w-8" />
        <span className="text-sm">ConfigIcon</span>
      </div>
      {/* <div className="flex flex-col items-center gap-2">
        <ConfigIcon2 className="h-8 w-8" />
        <span className="text-sm">ConfigIcon2</span>
      </div> */}

      <div className="flex flex-col items-center gap-2">
        <CloudUploadIcon className="h-8 w-8" />
        <span className="text-sm">CloudUploadIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <MonitorIcon className="h-8 w-8" />
        <span className="text-sm">MonitorIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <UsersIcon className="h-8 w-8" />
        <span className="text-sm">UsersIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <HomeIcon className="h-8 w-8" />
        <span className="text-sm">HomeIcon</span>
      </div>
     

      <div className="flex flex-col items-center gap-2">
        <EditIcon className="h-8 w-8" />
        <span className="text-sm">EditIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <DeleteIcon className="h-8 w-8" />
        <span className="text-sm">DeleteIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <DocumentIcon className="h-8 w-8" />
        <span className="text-sm">DocumentIcon</span>
      </div>

      {/* <div className="flex flex-col items-center gap-2">
        <DocumentIcon2 className="h-8 w-8" />
        <span className="text-sm">DocumentIcon2</span>
      </div> */}

      <div className="flex flex-col items-center gap-2">
        <TickIcon className="h-8 w-8" />
        <span className="text-sm">TickIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ClockIcon className="h-8 w-8" />
        <span className="text-sm">ClockIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ZipFolderIcon className="h-8 w-8" />
        <span className="text-sm">ZipFolderIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <CSVFolderIcon className="h-8 w-8" />
        <span className="text-sm">CSVFolderIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ExcelFolderIcon className="h-8 w-8" />
        <span className="text-sm">ExcelFolderIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <InfoIcon className="h-8 w-8" />
        <span className="text-sm">InfoIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <WarningIcon className="h-8 w-8" />
        <span className="text-sm">WarningIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <QuestionMarkIcon className="h-8 w-8" />
        <span className="text-sm">QuestionMarkIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <FailedIcon className="h-8 w-8" />
        <span className="text-sm">FailedIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ValidatedIcon className="h-8 w-8" />
        <span className="text-sm">ValidatedIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <DrawerIcon className="h-8 w-8" />
        <span className="text-sm">DrawerIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ArchivedIcon className="h-8 w-8" />
        <span className="text-sm">ArchivedIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <FilterIcon className="h-8 w-8" />
        <span className="text-sm">FilterIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <SettingIcon className="h-8 w-8" />
        <span className="text-sm">SettingIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <LogoutIcon className="h-8 w-8" />
        <span className="text-sm">LogoutIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <MoonIcon className="h-8 w-8" />
        <span className="text-sm">MoonIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <SearchIcon className="h-8 w-8" />
        <span className="text-sm">SearchIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <EmailIcon className="h-8 w-8" />
        <span className="text-sm">EmailIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <OrganizationIcon className="h-8 w-8" />
        <span className="text-sm">OrganizationIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <AddUserIcon className="h-8 w-8" />
        <span className="text-sm">AddUserIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <TrendingUpIcon className="h-8 w-8" />
        <span className="text-sm">TrendingUpIcon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <FolderIcon className="h-8 w-8" />
        <span className="text-sm">FolderIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CalendarIcon className="h-8 w-8" />
        <span className="text-sm">CalanderIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DatabaseIcon className="h-8 w-8" />
        <span className="text-sm">DatabaseIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SunIcon className="h-8 w-8" />
        <span className="text-sm">SunIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LockIcon className="h-8 w-8" />
        <span className="text-sm">LockIcon</span>
      </div>
    </div>
  ),
}

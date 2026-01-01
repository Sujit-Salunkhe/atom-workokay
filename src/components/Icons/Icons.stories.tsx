import type { Meta, StoryObj } from '@storybook/react'
import {
  ConfigIcon,
  CloudUploadIcon,
  MonitorIcon,
  UsersIcon,
  HomeIcon,
  EditIcon,
  DeleteIcon,
  DocumentIcon,
  ClockIcon,
  ZipFolderIcon,
  CSVFolderIcon,
  ExcelFolderIcon,
  WarningIcon,
  QuariantinedMarkIcon,
  QuestionMarkIcon,
  FailedIcon,
  ValidatedIcon,
  DrawerIcon,
  ArchivedIcon,
  FilterIcon,
  SettingIcon,
  LogoutIcon,
  MoonIcon,
  SearchIcon,
  EmailIcon,
  OrganizationIcon,
  AddUserIcon,
  TrendingUpIcon,
  FolderIcon,
  TickIcon
} from '../../assets/icons/BrokerModelIcons'

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
        <WarningIcon className="h-8 w-8" />
        <span className="text-sm">WarningIcon</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <QuariantinedMarkIcon className="h-8 w-8" />
        <span className="text-sm">QuariantinedMarkIcon</span>
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
    </div>
  ),
}

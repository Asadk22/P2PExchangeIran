import { useState } from 'react'
import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('moderators')
  const notificationCount = 5 // You can connect this to your notification state

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-400 hover:text-[#4CAF50]"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#4CAF50] text-[10px] font-medium text-white flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0"
        sideOffset={8}
      >
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b px-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="moderators"
                className={cn(
                  'data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none',
                  activeTab === 'moderators' && 'font-semibold'
                )}
              >
                Moderators
              </TabsTrigger>
              <TabsTrigger
                value="inbox"
                className={cn(
                  'data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none',
                  activeTab === 'inbox' && 'font-semibold'
                )}
              >
                Inbox
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="moderators" className="p-0">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-[#4CAF50] p-4 mb-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <p className="text-center text-muted-foreground px-8">
                You haven't received any moderators notifications yet
              </p>
            </div>
            <div className="border-t p-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Handle view all notifications
                }}
              >
                View all notifications
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="inbox" className="p-0">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-[#4CAF50] p-4 mb-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <p className="text-center text-muted-foreground px-8">
                You haven't received any inbox notifications yet
              </p>
            </div>
            <div className="border-t p-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Handle view all notifications
                }}
              >
                View all notifications
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

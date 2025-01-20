import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  CreditCard,
  Settings,
  History,
  Users,
  UserPlus,
  FileText,
  Users2,
  LogOut,
} from 'lucide-react';

export function UserMenu() {
  const [balance] = useState('0.00 EUR');
  const [email] = useState('987@gmail.com');
  const [cryptoLimit] = useState('0 EUR');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 rounded-full">
          <span className="sr-only">Open user menu</span>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-medium">
            9
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px] bg-[#1A1A1A] border-0 p-0 mt-2">
        {/* User Info */}
        <div className="px-5 py-4">
          <div className="text-base text-white font-normal">{email}</div>
          <div className="text-[15px] text-gray-400 mt-0.5">{balance}</div>
        </div>

        {/* Menu Items */}
        <div className="border-t border-gray-800">
          <DropdownMenuItem className="flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] cursor-pointer">
            <User className="w-[18px] h-[18px]" />
            My Profile
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] cursor-pointer">
            <CreditCard className="w-[18px] h-[18px]" />
            Payment Methods
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] cursor-pointer">
            <Settings className="w-[18px] h-[18px]" />
            Settings
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] cursor-pointer">
            <History className="w-[18px] h-[18px]" />
            Trade History
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] cursor-pointer">
            <Users className="w-[18px] h-[18px]" />
            Trade Partners
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] cursor-pointer">
            <UserPlus className="w-[18px] h-[18px]" />
            Invite a Friend
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] cursor-pointer">
            <FileText className="w-[18px] h-[18px]" />
            My Transactions
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] cursor-pointer">
            <Users2 className="w-[18px] h-[18px]" />
            Join Paxful Community
          </DropdownMenuItem>
        </div>

        {/* Action Buttons */}
        <div className="p-5 border-t border-gray-800">
          <div className="flex gap-3 mb-3">
            <Button variant="outline" className="flex-1 h-10 bg-transparent border-gray-700 text-gray-200 hover:bg-[#242424] hover:text-white text-[14px]">
              Export Trades
            </Button>
            <Button variant="outline" className="flex-1 h-10 bg-transparent border-gray-700 text-gray-200 hover:bg-[#242424] hover:text-white text-[14px]">
              Copy Details
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full flex items-center gap-3.5 px-5 py-3 text-base text-gray-200 hover:bg-[#242424] justify-start font-normal"
            onClick={() => {/* Add logout handler */}}
          >
            <LogOut className="w-[18px] h-[18px]" />
            Log Out
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

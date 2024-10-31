import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { IoMdClose } from "react-icons/io";

export function SearchCommand({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-center ">
      <Modal defaultOpen={true}>
        <ModalBody showCloseIcon={false} className="relative z-50">
        <IoMdClose onClick={onClose} className="absolute top-4 right-4"/>
          <ModalContent>
            <Command className="rounded-lg border  shadow-md md:min-w-[450px]">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Smile />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem disabled>
                    <Calculator />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard />
                    <span>Billing</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}

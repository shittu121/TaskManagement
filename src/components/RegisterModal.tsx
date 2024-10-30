"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import SignupForm from "./signup-form";

export function SignUpModal() {
  
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white rounded-2xl dark:text-black flex text-white group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center py-3 pr-5 flex-shrink-0 transition duration-500">
            Sign Up
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <SignupForm />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}


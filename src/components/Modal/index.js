import React from "react";

const Modal = ({ children, open, onCloseModal }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center ${
        open ? "visible opacity-1" : "invisible opacity-0"
      } transition-all duration-300 overflow-hidden`}
    >
      <div onClick={onCloseModal} className="fixed inset-0 z-50"></div>
      <div className="relative w-[600px] flex items-center justify-center bg-white rounded-xl z-[99]">
        <div className="w-full">
          <span
            onClick={onCloseModal}
            className="font-bold absolute top-4 right-4 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors"
          >
            X
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

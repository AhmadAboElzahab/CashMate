import React, { useState } from 'react';

export default function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='modal-overlay absolute inset-0 bg-black/30 backdrop-blur-sm'
            onClick={onClose}
          ></div>
          <div className='modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto'>
            <div className='modal-content py-4 text-left px-6'>
              <div className='flex justify-end'>
                <button onClick={onClose} className='modal-close cursor-pointer z-50'>
                  &times;
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

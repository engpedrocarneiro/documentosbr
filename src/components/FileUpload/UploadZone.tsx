import React from 'react';
import type { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

interface UploadZoneProps {
  getRootProps: (props?: any) => DropzoneRootProps;
  getInputProps: (props?: any) => DropzoneInputProps;
  isDragActive: boolean;
  children: React.ReactNode;
}

export function UploadZone({ getRootProps, getInputProps, isDragActive, children }: UploadZoneProps) {
  return (
    <div 
      {...getRootProps()} 
      className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50/5' : 'border-gray-600 hover:border-blue-500'}`}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
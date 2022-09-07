import * as React from 'react';
import { FileUploadProps } from './FileUpload';
import { FileLibraryProps } from './FileLibrary';

export interface ReactMediaLibraryRevivedProps extends FileUploadProps, FileLibraryProps {
  show: boolean;
  onHide: () => void;
  modalTitle?: string;
}

export const ReactMediaLibraryRevived: React.FC<ReactMediaLibraryRevivedProps>;

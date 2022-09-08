import * as React from 'react';
import { FileUploadProps } from './FileUpload';
import { FileLibraryProps } from './FileLibrary';

export interface ReactMediaLibraryRevivedProps extends FileUploadProps, FileLibraryProps {
  /** Shows and hides the modal. The on / off switch is controlled outside the app. Your app will have to inform React Media Library when to hide and when to show. */
  show: boolean;
  /** Callback function when the user clicks the close button. At the very least, this function should set the `show` prop to false. */
  onHide: () => void;
  /** Title text that appears at the top of the modal. */
  modalTitle?: string;
}

export const ReactMediaLibraryRevived: React.FC<ReactMediaLibraryRevivedProps>;

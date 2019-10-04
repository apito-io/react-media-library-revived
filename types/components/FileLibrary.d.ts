export interface FileLibraryListItem {
	title?: string;
	size?: number;
	createdAt?: Date;
	url: string;
	description?: string;
	fileName: string;
}

export interface FileLibraryProps {
	fileLibraryList: FileLibraryListItem[];
}
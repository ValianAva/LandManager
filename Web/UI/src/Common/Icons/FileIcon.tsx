import React, { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faFileArchive } from '@fortawesome/free-solid-svg-icons/faFileArchive';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons/faFileExcel';
import { faFileImage } from '@fortawesome/free-solid-svg-icons/faFileImage';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons/faFilePdf';
import { faFilePowerpoint } from '@fortawesome/free-solid-svg-icons/faFilePowerpoint';
import { faFileWord } from '@fortawesome/free-solid-svg-icons/faFileWord';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IFileIconProps {
	fileName: string;
	style?: CSSProperties;
}

export const FileIcon = (props: IFileIconProps) => {
	const extension = props.fileName.split('.').slice(-1)[0];

	switch (extension) {
		case 'doc':
			return <FontAwesomeIcon icon={faFileWord as IconProp} color="#2b579a" style={props.style} />;
		case 'docx':
			return <FontAwesomeIcon icon={faFileWord as IconProp} color="#2b579a" style={props.style} />;
		case 'xls':
			return <FontAwesomeIcon icon={faFileExcel as IconProp} color="#217346" style={props.style} />;
		case 'xlsx':
			return <FontAwesomeIcon icon={faFileExcel as IconProp} color="#217346" style={props.style} />;
		case 'csv':
			return <FontAwesomeIcon icon={faFileExcel as IconProp} color="#217346" style={props.style} />;
		case 'ppt':
			return <FontAwesomeIcon icon={faFilePowerpoint as IconProp} color="#d24726" style={props.style} />;
		case 'pptx':
			return <FontAwesomeIcon icon={faFilePowerpoint as IconProp} color="#d24726" style={props.style} />;
		case 'pdf':
			return <FontAwesomeIcon icon={faFilePdf as IconProp} color="#F40F02" style={props.style} />;
		case 'jpg':
			return <FontAwesomeIcon icon={faFileImage as IconProp} color="#28AFEA" style={props.style} />;
		case 'png':
			return <FontAwesomeIcon icon={faFileImage as IconProp} color="#28AFEA" style={props.style} />;
		case 'gif':
			return <FontAwesomeIcon icon={faFileImage as IconProp} color="#28AFEA" style={props.style} />;
		case 'zip':
			return <FontAwesomeIcon icon={faFileArchive as IconProp} color="#ff9800" style={props.style} />;
		default:
			return <FontAwesomeIcon icon={faFileAlt as IconProp} style={props.style} />;
	}
};

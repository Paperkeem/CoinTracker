import React from 'react';
import styled from 'styled-components';

export default function LoadingSpinner() {
  return <LoadingSection />
}

const LoadingSection = styled.div`
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 64px;
	height: 64px;
	margin-top: -32px;
	margin-left: -32px;
	border-radius: 50%;
	border: 5px solid transparent;
	border-top-color: ${(props) => props.theme.accentColor};
	animation: loading 0.8s ease infinite;

	@keyframes loading {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

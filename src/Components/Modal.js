import ReactDOM from 'react-dom';

/** Renders its children in the 'overlay' div. */
const Modal = (props) => {
	const portalElement = document.getElementById('overlay');
	return (
		<>{ReactDOM.createPortal(<div>{props.children}</div>, portalElement)}</>
	);
};

export default Modal;

import ReactDOM from 'react-dom';


const Modal = (props) => {
	const portalElement = document.getElementById('overlay');
	return (
		<>{ReactDOM.createPortal(<div>{props.children}</div>, portalElement)}</>
	);
};

export default Modal;

import { MouseEventHandler } from 'react';

type ButtonProps = {
    text: string,
    type: 'submit' | 'reset' | 'button',
    style: string,
    callback?: MouseEventHandler<HTMLButtonElement>
}

const ButtonComponent = ({ text, type, style, callback }: ButtonProps) => {
    return (
        <button type={type} className={style} onClick={callback}>
            {text}
        </button>
    );
}

export default ButtonComponent;
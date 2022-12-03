import Link from 'next/link';

type LinkProps = {
    text: string,
    style: string,
    url: string,
    target?: '_blanck' | '_parent' | '_self' | '_top',
}

const LinkComponent = ({ text, style, url, target }: LinkProps) => {
    return (
        <Link href={url} className={style} target={target}>
            {text}
        </Link>
    );
}

export default LinkComponent;
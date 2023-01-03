import Head from "next/head";

type HeadProps = {
    title: string,
    description: string,
}

const HeadComponent = ({ title, description }: HeadProps) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.png" type="image/png"/>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </Head>
    );
}

export default HeadComponent;
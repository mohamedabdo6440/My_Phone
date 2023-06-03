import Head from "next/head";

type PageTitleProps = {
  title: string;
};
const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <Head>
        <meta property="og:title" content={title} key="title" />
      </Head>
    </>
  );
};

export default PageTitle;

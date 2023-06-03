export interface PageProps {
    isAuthenticated: boolean
}

export const GetServerSidePropsComponent = async () => {
    const __props__: PageProps = {
        isAuthenticated: true,
    }
    return {
        props: __props__,
    }
}

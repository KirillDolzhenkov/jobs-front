import { NextPage } from 'next';

const TestPage: NextPage = () => {
    return <h1>Test Page for ID: {typeof window !== 'undefined' ? window.location.pathname : 'server'}</h1>;
};

export default TestPage;
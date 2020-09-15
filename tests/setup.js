import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';

process.env.NODE_ENV = 'test';
afterEach(cleanup);

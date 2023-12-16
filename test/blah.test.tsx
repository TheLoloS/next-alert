import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useAlert } from '../src/index';

describe('it', () => {
  const Thing: React.FC = () => {
    const { showAlert, AlertWrapper } = useAlert();

    return (
      <div>
        <button onClick={() => showAlert('hi', 'success')}>Click me</button>
        <AlertWrapper />
      </div>
    );
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<Thing />);
  });
});

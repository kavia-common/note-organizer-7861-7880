import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the sidebar and theme toggle', () => {
  render(<App />);
  expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
});

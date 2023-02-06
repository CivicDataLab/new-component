import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { COMPONENT_NAME } from './COMPONENT_NAME';

describe(`${COMPONENT_NAME} Tests`, () => {
  beforeEach(() => {
    render(<COMPONENT_NAME>Component</COMPONENT_NAME>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
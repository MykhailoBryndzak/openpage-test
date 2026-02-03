import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  const options = [
    { value: 'A', label: 'Option A' },
    { value: 'B', label: 'Option B' },
    { value: 'C', label: 'Option C' },
  ];

  it('renders all options', () => {
    render(
      <ButtonGroup options={options} value="A" onChange={() => {}} />
    );

    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('calls onChange with selected value', () => {
    const handleChange = vi.fn();
    render(
      <ButtonGroup options={options} value="A" onChange={handleChange} />
    );

    fireEvent.click(screen.getByText('Option B'));
    expect(handleChange).toHaveBeenCalledWith('B');
  });
});

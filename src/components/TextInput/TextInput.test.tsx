import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders with label', () => {
    render(
      <TextInput label="Name" value="" onChange={() => {}} />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(
      <TextInput label="Label" value="Test Value" onChange={() => {}} />
    );

    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(
      <TextInput label="Input" value="" onChange={handleChange} />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'new text' },
    });

    expect(handleChange).toHaveBeenCalledWith('new text');
  });

  it('shows placeholder text', () => {
    render(
      <TextInput
        label="URL"
        value=""
        onChange={() => {}}
        placeholder="https://example.com"
      />
    );

    expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument();
  });
});

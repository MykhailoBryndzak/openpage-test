import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders tag with label', () => {
    render(
      <Tag label="Marketing" tagStyle="default" size="M" radius={8} />
    );

    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Tag
        label="Design"
        tagStyle="filled"
        size="L"
        radius={12}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText('Design'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct border radius', () => {
    render(
      <Tag label="Test" tagStyle="default" size="M" radius={100} />
    );

    const button = screen.getByText('Test');
    expect(button).toHaveStyle({ borderRadius: '9999px' });
  });
});

// src/component/Display/Display.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi, Vitest } from 'vitest';
import Display from './Display';
import { ClickContext } from '../Click/ClckContext';
import '@testing-library/jest-dom';

// Mock Navbar component
vi.mock('../Navbar/Navbar', () => () => <div>Navbar</div>);

const mockArticles = [
  {
    it: 1,
    date: 1627849923,
    title: 'Test Article 1',
    content: 'This is the content of test article 1.',
    thumbnail: {
      large: 'large1.jpg',
      small: 'small1.jpg',
    },
    author: {
      name: 'Author 1',
      avatar: 'avatar1.jpg',
      role: 'Writer',
    },
  },
  {
    it: 2,
    date: 1627936323,
    title: 'Test Article 2',
    content: 'This is the content of test article 2.',
    thumbnail: {
      large: 'large2.jpg',
      small: 'small2.jpg',
    },
    author: {
      name: 'Author 2',
      role: 'Editor',
    },
  },
];

const mockContextValue = {
  state: {
    clicks: {
      1: 5,
      2: 3,
    },
    titles: {
      1: 'Test Article 1',
      2: 'Test Article 2',
    },
  },
  dispatch: vi.fn(),
};

describe('Display Component', () => {
  beforeEach(() => {
    // Clear previous mocks
    vi.clearAllMocks();

    // Mock the global fetch function
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockArticles),
      })
    ) as Vi.Mock;
  });

  test('renders loading initially', () => {
    render(
      <ClickContext.Provider value={mockContextValue}>
        <Display />
      </ClickContext.Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders articles after loading', async () => {
    render(
      <ClickContext.Provider value={mockContextValue}>
        <Display />
      </ClickContext.Provider>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    expect(screen.getByText('This is the content of test article 1.')).toBeInTheDocument();
    expect(screen.getByText('This is the content of test article 2.')).toBeInTheDocument();
    expect(screen.getByText('Clicks: 5')).toBeInTheDocument();
    expect(screen.getByText('Clicks: 3')).toBeInTheDocument();
  });

  test('handles button click', async () => {
    render(
      <ClickContext.Provider value={mockContextValue}>
        <Display />
      </ClickContext.Provider>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const learnMoreButtons = screen.getAllByText('Learn More');

    fireEvent.click(learnMoreButtons[0]);

    expect(mockContextValue.dispatch).toHaveBeenCalledWith({
      type: 'INCREMENT_CLICK',
      id: 1,
      title: 'Test Article 1',
    });

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
  });
});

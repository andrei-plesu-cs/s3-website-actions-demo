import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Get started right now!' }),
    ).toBeInTheDocument()
  })

  it('starts the counter at 0', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Count is 0' })).toBeInTheDocument()
  })

  it('increments the counter on each click', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /count is/i })
    await user.click(button)
    await user.click(button)

    expect(button).toHaveTextContent('Count is 2')
  })

  it('renders the section headings', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Documentation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Connect with us' })).toBeInTheDocument()
  })

  it.each([
    ['Explore Vite', 'https://vite.dev/'],
    ['Learn more', 'https://react.dev/'],
    ['GitHub', 'https://github.com/vitejs/vite'],
    ['Discord', 'https://chat.vite.dev/'],
    ['X.com', 'https://x.com/vite_js'],
    ['Bluesky', 'https://bsky.app/profile/vite.dev'],
  ])('links "%s" to %s', (name, href) => {
    render(<App />)

    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
  })
})

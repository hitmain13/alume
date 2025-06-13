import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

describe('Card', () => {
  it('should render card with content', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>,
    )

    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('should render with header', () => {
    render(
      <Card>
        <CardHeader>
          <h2>Card Title</h2>
        </CardHeader>
        <div>Card Content</div>
      </Card>,
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('should render with footer', () => {
    render(
      <Card>
        <div>Card Content</div>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>,
    )

    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    render(
      <Card className="custom-class">
        <div>Card Content</div>
      </Card>,
    )

    const card = screen.getByText('Card Content').parentElement
    expect(card).toHaveClass('custom-class')
  })

  it('should render with default className when not provided', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>,
    )

    const card = screen.getByText('Card Content').parentElement
    expect(card).toHaveClass('bg-card', 'border', 'rounded-lg', 'shadow-sm')
  })

  it('should render with header className', () => {
    render(
      <Card>
        <CardHeader className="custom-header">
          <h2>Card Title</h2>
        </CardHeader>
        <div>Card Content</div>
      </Card>,
    )

    const header = screen.getByText('Card Title').parentElement
    expect(header).toHaveClass('custom-header')
  })

  it('should render with footer className', () => {
    render(
      <Card>
        <div>Card Content</div>
        <CardFooter className="custom-footer">
          <button>Action</button>
        </CardFooter>
      </Card>,
    )

    const footer = screen.getByRole('button', { name: /action/i }).parentElement
    expect(footer).toHaveClass('custom-footer')
  })

  it('should render with content className', () => {
    render(
      <Card>
        <CardContent className="custom-content">
          <div>Card Content</div>
        </CardContent>
      </Card>,
    )

    const content = screen.getByText('Card Content').parentElement
    expect(content).toHaveClass('custom-content')
  })

  it('should render with title and description', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <div>Card Content</div>
      </Card>,
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Description')).toBeInTheDocument()
  })
})

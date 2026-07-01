import { Component, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null }
  static getDerivedStateFromError(err: Error) {
    return { err }
  }
  render() {
    if (this.state.err) {
      return (
        <pre style={{ color: '#fca5a5', padding: 24, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 13 }}>
          {String(this.state.err.message)}
          {'\n\n'}
          {String(this.state.err.stack)}
        </pre>
      )
    }
    return this.props.children
  }
}

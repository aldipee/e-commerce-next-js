import App, { Container } from 'next/app'
import Pages from '../components/Pages'
export default class MainApp extends App {
  render() {
    const { Component } = this.props
    return (
      <Container>
        <Pages>
          <Component />
        </Pages>
      </Container>
    )
  }
}

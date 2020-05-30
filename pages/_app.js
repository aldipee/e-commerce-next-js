import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Pages from '../components/Pages'
import withData from '../lib/withData'

class MainApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query
    return { pageProps }
  }

  render() {
    const { Component } = this.props
    return (
      <Container>
        <ApolloProvider client={this.props.apollo}>
          <Pages>
            <Component {...this.props.pageProps} />
          </Pages>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MainApp)

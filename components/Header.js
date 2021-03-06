import Nav from './Nav'
import Link from 'next/link'
import styled from 'styled-components'
import Router from 'next/router'
import Nprogress from 'nprogress'

Router.onRouteChangeStart = () => Nprogress.start()
Router.onRouteChangeComplete = () => Nprogress.done()
Router.onRouteChangeError = () => Nprogress.done()

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    background: ${props => props.theme.red};
  }
  @media (max-width: 1200px) {
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    justify-content: space-between;
    grid-template-columns: auto 1fr;
    align-item: strech;
  }
  .sub-bar : {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: ${props => props.theme.lightgrey};
  }
`

const Header = () => (
  <StyledHeader>
    <div className='bar'>
      <Logo>
        <Link href='/'>
          <a>Sick Fits</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className='sub-bar'>
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
)

export default Header

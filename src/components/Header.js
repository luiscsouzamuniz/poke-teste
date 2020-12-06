import { Link } from "react-router-dom"
import styled from 'styled-components'

const StyledNav = styled.nav`
  padding: 10px;
  border-bottom: 3px solid #000;
  margin-bottom: 20px;
`

export const Header = () => (
  <StyledNav>
    <div className="container">
      <h2 style={{ marginBottom: 0 }}>
        <Link style={{ color: 'black' }} to="/">PokéTeste</Link>
      </h2>
    </div>
  </StyledNav>
)
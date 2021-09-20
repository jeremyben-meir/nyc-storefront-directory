import React from 'react';
import PropTypes from 'prop-types';
import {StyledNavbarTop, Transition, A} from '../assets/NavbarStyles.js';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show: true,
          scrollPos: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
      
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const { scrollPos } = this.state;
        this.setState({
          scrollPos: document.body.getBoundingClientRect().top,
          show: document.body.getBoundingClientRect().top > -100
        });
      }
      
    static propTypes = {
        brand: PropTypes.shape({
          name: PropTypes.string.isRequired,
          to: PropTypes.string.isRequired
        }),
        links: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired
          })
        )
      };
  
    render() {
        const { brand, links } = this.props;
      
        const NavLinks = () =>
          links.map((link, index) => (
            <A key={index} href={link.to}>
              {link.name}
            </A>
        ));
      
        return (
            <Transition>
            <StyledNavbarTop className={this.state.show ? "botbar" : "topbar"}>
              <a> Open Storefront Data </a>
              <nav>
                <NavLinks />
              </nav>
            </StyledNavbarTop>
            </Transition>
        );
    }
  }
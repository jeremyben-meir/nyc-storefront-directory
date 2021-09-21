import styled from "styled-components";

export const StyledNavbar = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
margin: 0 auto;
height: 5rem;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
font-weight: bolder;
background: white;
z-index: 1000;
h2 {
  margin-left: 2rem;
}
.brand {
  font-style: italic;
  margin-left: 3rem;
  font-weight: bold;
  color: white;
  font-size: 1.25rem;
}`;

export const StyledNavbarTop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
margin: 0 auto;
height: 5rem;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
font-weight: bolder;
background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.5),
  rgba(0, 0, 0, 0)
);
z-index: 1000;
h2 {
  margin-left: 2rem;
}
.brand {
  font-style: italic;
  margin-left: 3rem;
  font-weight: bold;
  color: white;
  font-size: 1.25rem;
}`;

export const Transition = styled.div`
.topbar {
  -webkit-transition: opacity .15s ease-in-out;
  -moz-transition: opacity .15s ease-in-out;
  -ms-transition: opacity .15s ease-in-out;
  -o-transition: opacity .15s ease-in-out;
   opacity: 0;
}
.botbar {
  -webkit-transition: opacity .15s ease-in-out;
  -moz-transition: opacity .15s ease-in-out;
  -ms-transition: opacity .15s ease-in-out;
  -o-transition: opacity .15s ease-in-out;
   opacity: 1;
}
.topbarlogo {
  -webkit-transition: opacity .15s ease-in-out;
  -moz-transition: opacity .15s ease-in-out;
  -ms-transition: opacity .15s ease-in-out;
  -o-transition: opacity .15s ease-in-out;
   opacity: 0;
   height: 50%;
   width: auto;
   padding-left: 30px;
}
.botbarlogo {
  -webkit-transition: opacity .15s ease-in-out;
  -moz-transition: opacity .15s ease-in-out;
  -ms-transition: opacity .15s ease-in-out;
  -o-transition: opacity .15s ease-in-out;
   opacity: 1;
  height: 50%;
  width: auto;
  padding-left: 30px;
}
`;

export const A = styled.a`
color: #000000;
text-decoration: none;
margin-right: 3rem;
margin-left: 3rem;
text-decoration: none;
`;
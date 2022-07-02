import { BsTelephoneFill } from 'react-icons/bs';
import { CgCopyright } from 'react-icons/cg';
import { FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { GrTwitter } from 'react-icons/gr';
import { IoMdMail } from 'react-icons/io';
import { SiFacebook } from 'react-icons/si';
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { mobile } from "../../styles/responsive";
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;
const Footer = () => {
    return (
      <>
        <Container>
            <Left>
        <Logo>
            <img src={logo} alt="" />
        </Logo>
        <Desc>
           Good Product and Good Services
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            < SiFacebook/>
          </SocialIcon>
          <SocialIcon color="E4405F">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <GrTwitter/>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <FaMapMarkerAlt style={{marginRight:"10px"}}/> Dhaka, Bangladesh
        </ContactItem>
        <ContactItem>
          <BsTelephoneFill style={{marginRight:"10px"}}/> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <IoMdMail style={{marginRight:"10px"}} /> contact@tahsin.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>

    <div className="develop">
       <p className='text-dark text-center'>Built by  
       <span className='text-success'>
        <a href="https://tahsin-portfolio.web.app/home" target="_blank" rel="noreferrer">
               Muhammad Tahsin Amin
        </a>
        </span>
        </p>
       <p className='text-dark text-center'>Copyright <CgCopyright/> {(new Date()).getFullYear()}</p>
     </div>
    </>
    );
};

export default Footer;
import { Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import React,{ useState } from "react";
import { HeaderNavbar, MenuBar } from "../../component/Header/HeaderNavbar";
import { Footer } from "../../component/Header/footer/footer";

const About = () => {
  const iconStyle = { color: "#FF7D00" };
  const theme = useTheme();
  const variant = theme.breakpoints.down("sm") ? "h6" : "subtitle2";

  const [menubar, setMenuBar] = useState(false);

  return (
    <>
      <HeaderNavbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <>
        <Box
          textAlign={"center"}
          p={{ xs: 2, sm: 3, md: 5 }}
          mt={{ xs: 3, sm: 4, md: 5 }}
          width={{ xs: "100%", sm: "80%", md: "65%" }}
          ml={{ xs: -1, sm: 4, md: 35 }}
        >
          <Typography variant="h4" ml={{ xs: 2, sm: 3, md: 5 }} gutterBottom>
            About Us
          </Typography>
        </Box>
        <Box textAlign={"center"}>
          {" "}
          <Typography variant="h5" mt={{ xs: 3, sm: 4 }} gutterBottom>
            FEEL FREE TO CONTACT US
          </Typography>
          <Typography
            textAlign={"center"}
            variant="body1"
            align="justify"
            mt={3}
            gutterBottom
          >
            The time for the delivery: 2 to 7 days
          </Typography>
          <Typography
            textAlign={"center"}
            variant="body1"
            align="justify"
            mt={3}
            gutterBottom
          >
            How much does the delivery cost? 2.5$
          </Typography>
        </Box>
        <Box
          mt={{ xs: 6, sm: 4, md: -1 }}
          ml={{ xs: 2, sm: 4, md: 32 }}
          p={{ xs: 2, sm: 4, md: 6 }}
        >
          <Grid container spacing={{ xs: 2, sm: 4, md: 6 }}>
            <Grid item xs={12} md={6}>
              <Box p={{ xs: 2, sm: 4 }} display="flex" alignItems="center">
                <LocationOnIcon
                  color="primary"
                  fontSize="large"
                  style={iconStyle}
                />
                <Box ml={{ xs: 2, sm: 4 }}>
                  <Typography variant={variant} gutterBottom>
                    Location
                  </Typography>
                  <Typography variant="body1">
                    Pick up available from Saida
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box p={{ xs: 2, sm: 4 }} display="flex" alignItems="center">
                <EmailIcon color="primary" fontSize="large" style={iconStyle} />
                <Box ml={{ xs: 2, sm: 4 }}>
                  <Typography
                    variant={variant}
                    mt={{ xs: 1, sm: 0 }}
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <Typography variant="body1">
                    zone.outlet.00@gmail.com
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box p={{ xs: 2, sm: 4 }} display="flex" alignItems="center">
                <LocalPhoneIcon
                  color="primary"
                  fontSize="large"
                  style={iconStyle}
                />
                <Box ml={{ xs: 2, sm: 4 }}>
                  <Typography variant={variant} gutterBottom>
                    Phone
                  </Typography>
                  <Typography variant="body1">+961 71958446</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box p={{ xs: 2, sm: 4 }} display="flex" alignItems="center">
                <Box display="flex" alignItems="center">
                  <a href="https://www.facebook.com/ZONE.Outlet.0?mibextid=LQQJ4d">
                    {" "}
                    <FacebookIcon
                      color="primary"
                      fontSize="large"
                      style={iconStyle}
                    />
                  </a>
                  <a href="https://instagram.com/_zone_outlet_?igshid=YmMyMTA2M2Y=">
                    {" "}
                    <InstagramIcon
                      color="primary"
                      fontSize="large"
                      style={iconStyle}
                    />{" "}
                  </a>
                </Box>
                <Box ml={{ xs: 2, sm: 4 }}>
                  <Typography variant={variant} gutterBottom>
                    Follow Us
                  </Typography>
                  <Typography variant="body1">
                    Stay connected with us on social media!
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
      <Footer/>
    </>
  );
};

export default About;

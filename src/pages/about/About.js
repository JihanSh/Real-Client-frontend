import { Typography, Box, Grid } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const About = () => {
    const iconStyle = { color: '#FF7D00' };
    const theme = useTheme();
    const variant = theme.breakpoints.down("sm") ? "h6" : "subtitle2";

  return (
    <>
    <Box bgcolor="#D9D9D9" p={{ xs: 2, sm: 3, md: 5 }} mt={{ xs: 3, sm: 4, md: 5 }}  width={{ xs: '100%', sm: '80%', md: '65%' }} ml={{ xs: -1, sm: 4, md: 35 }} >
        <Typography variant="h4"  ml={{ xs: 2, sm: 3, md: 5 }} gutterBottom>
        About Us
        </Typography>
    </Box>

    <Box p={{ xs: 3, sm: 4, md: 12 }} mb={-10} ml={{ xs: 2, sm: 3, md: 32 }} mt={{ xs: -3, sm: -4, md: -6 }} >
        <Typography variant="h5" mt={{ xs: 3, sm: 4 }} gutterBottom>
            FEEL FREE TO CONTACT US
        </Typography>
        <Typography variant="body1" align="justify" mt={3} gutterBottom>
        Torquent mattis iste nisl rerum, placerat do wisi. Interdum diamlorem sociis, mollitia eaque perspiciatis, esee nascetur morbi laboriosam sociis at nunc pede felis.
        </Typography>
      </Box>

    <Box mt={5} ml={{ xs: 2, sm: 4, md: 32 }} p={{ xs: 2, sm: 4, md: 6 }}>
      <Grid container spacing={{ xs: 2, sm: 4, md: 6 }}>
        <Grid item xs={12} md={6}>
          <Box  p={{ xs: 2, sm: 4 }} display="flex" alignItems="center">
            <LocationOnIcon color="primary" fontSize="large" style={iconStyle}/>
            <Box ml={{ xs: 2, sm: 4 }}>
              <Typography variant={variant} gutterBottom>
                Location
              </Typography>
              <Typography variant="body1">
                123 Main St, Anytown USA
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box  p={{ xs: 2, sm: 4 }} display="flex" alignItems="center" >
            <EmailIcon color="primary" fontSize="large" style={iconStyle} />
            <Box ml={{ xs: 2, sm: 4 }} >
              <Typography variant={variant} mt={{ xs: 1, sm: 0 }} gutterBottom>
                Email
              </Typography>
              <Typography variant="body1">
                info@example.com
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box p={{ xs: 2, sm: 4 }} display="flex" alignItems="center">
            <LocalPhoneIcon color="primary" fontSize="large" style={iconStyle}/>
            <Box ml={{ xs: 2, sm: 4 }} >
              <Typography  variant={variant} gutterBottom>
                Phone
              </Typography>
              <Typography variant="body1">
                123-456-7890
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} >
          <Box  p={{ xs: 2, sm: 4 }}  display="flex" alignItems="center" >
            <Box display="flex" alignItems="center" >
             <a  href="/"> <FacebookIcon color="primary" fontSize="large" style={iconStyle} /></a>
             <a href="/"> <InstagramIcon color="primary" fontSize="large" style={iconStyle} /> </a>
            </Box>
            <Box ml={{ xs: 2, sm: 4 }} >
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
  )
}

export default About;
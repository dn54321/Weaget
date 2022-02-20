import styled from '@mui/system/styled';
import Box from '@mui/material/Box';

export const Page = styled(Box)`
    min-height: 100%;
    position: relative;
    backgroundColor: #f7f7f7;
`;

export const Footer = styled('footer')({
  position: "absolute",
  bottom: 0,
  height: "fit-content",
  width: "100%",
  backgroundColor: "#eaeaea"
});

export const SXContainer = (props) => { 
  return (
    <Box sx={{ display: { xs: 'inline', md: 'none' }} } {...props}>
      {props.children}
    </Box>
  );
};

export const NSXContainer = (props) => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'inline' }}} {...props}>
      {props.children}
    </Box>
  );
};

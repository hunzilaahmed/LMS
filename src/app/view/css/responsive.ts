const signInStyles = {
  root: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url('/Sign.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: { xs: "column", md: "row" }, // xs = mobile, md = desktop
    p: { xs: 2, sm: 3, md: 4 },
    gap: { xs: 2, md: 4 },
  },
  
  logo: {
    display: "flex",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    mb: { xs: 0, md: 0 },
  },

  container: {
    position: "relative",
    flex: 1,
    zIndex: 1,
   
    px: { xs: 2, sm: 4 },
  },

  paper: {
    p: { xs: 3, sm: 4, md: 5 },
    borderRadius: 4,
    backdropFilter: "blur(12px)",
    background: "rgba(255, 255, 255, 0.12)",
    color: "#fff",
  },

  heading: {
    textAlign: "center",
    fontWeight: "bold",
    mb: { xs: 2, sm: 3 },
    letterSpacing: 1,
    fontSize: { xs: "1.6rem", sm: "2rem" },
  },

  textField: {
    mb: 3,
    input: { color: "#193566ff" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
      "&:hover fieldset": { borderColor: "#fff" },
      "&.Mui-focused fieldset": { borderColor: "#193566ff" },
    },
    "& .MuiInputLabel-root": { color: "#193566ff" },
  },

  signInButton: {
    py: 1.5,
    mt: 1,
    background: "linear-gradient(135deg, #186485ff 0%, #0884aaff 100%)",
    fontWeight: "bold",
    borderRadius: 3,
    textTransform: "none",
    fontSize: { xs: "0.9rem", sm: "1rem" },
    "&:hover": {
      background: "linear-gradient(135deg, #59769aff 0%, #2077a0ff 100%)",
    },
  },

  signUpText: {
    mt: 3,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    fontSize: { xs: "0.85rem", sm: "0.9rem" },
  },

  googleButton: {
    backgroundColor: "white",
    borderRadius: 3,
    textTransform: "none",
    py: 1,
    fontWeight: 500,
    fontSize: { xs: "0.9rem", sm: "1rem" },
  },
};

export default signInStyles;

"use client";
import signInStyles from "../css/responsive";
import { SignInWithEmail, signUpWithGoogle } from "@/app/Firebase/service";
import Logo from "../../../../public/Images/logo.png";
import {
  Box,
  Button,
  Container,
  Paper,
  CircularProgress,
  TextField,
  Typography,
  Link,
  Alert,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Google } from "@mui/icons-material";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else setEmailError("");

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else setPasswordError("");

    return valid;
  };

  const handleUser = async () => {
    if (!validateForm()) return;
    setError(null);
    setLoading(true);
    try {
      const catchUser = await SignInWithEmail(email, password);
      router.push("/view/Dashboard");
      console.log(catchUser);
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={signInStyles.root}>
      {/* Logo */}
      <Box sx={signInStyles.logo}>
        <Box
          sx={{
            width: { xs: 160, sm: 200, md: 300, lg: 430 }, // responsive widths
            height: "auto",
            position: "relative",
          }}
        >
          <Image
            src={Logo}
            alt="logo image"
            width={100}
            height={100}
            sizes="100vw"
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              objectFit: "contain",
            }}
            priority
          />
        </Box>
      </Box>

      {/* Form */}
      <Container maxWidth="sm" sx={signInStyles.container}>
        <Paper elevation={10} sx={signInStyles.paper}>
          <Typography variant="h4" sx={signInStyles.heading}>
            Welcome Back
          </Typography>

          <TextField
            label="Email"
            value={email}
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            required
            fullWidth
            sx={signInStyles.textField}
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            required
            fullWidth
            sx={signInStyles.textField}
          />

          {error && <Alert severity="error">{error}</Alert>}
          {loading ? (
            <Button
              fullWidth
              variant="contained"
              disabled
              sx={{ py: 1.5, mt: 1 }}
            >
              <CircularProgress size={24} sx={{ color: "white" }} />
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={handleUser}
              sx={signInStyles.signInButton}
            >
              Sign In
            </Button>
          )}

          <Typography variant="body2" sx={signInStyles.signUpText}>
            Don’t have an account?{" "}
            <Link href="/view/SignUp" underline="hover" sx={{ color: "#fff" }}>
              Sign Up
            </Link>
          </Typography>

          <Divider sx={{ my: 2 }}>or</Divider>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google color="primary" />}
            sx={signInStyles.googleButton}
            onClick={async () => {
              try {
                setLoading(true);
                const result = await signUpWithGoogle();
                setLoading(false);
                router.push("/view/Dashboard");
              } catch (err: any) {
                setError(err?.message || "Google sign in failed");
              }
            }}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

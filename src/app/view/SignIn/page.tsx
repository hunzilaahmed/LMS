"use client";
import { SignInWithEmail } from "@/app/Firebase/service";
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
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  } else {
    setEmailError(""); 
  }

  if (!password) {
    setPasswordError("Password is required");
    valid = false;
  } else if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    valid = false;
  } else {
    setPasswordError(""); 
  }

  return valid;
};


const handleUser = async () => {
  const isValid = validateForm(); 
  if (!isValid) return; 

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




  const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    handleUser();
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url("/Images/SignUp.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.12)",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 3,
              letterSpacing: 1,
            }}
          >
            Welcome Back
          </Typography>

          <TextField
            label="Email"
            value={email}
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            error={!!emailError} 
            helperText={emailError}
            required
            fullWidth
            sx={{
              mb: 3,
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#193566ff" },
              },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
            }}
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            error={!!passwordError}
            helperText={passwordError}
            required
            fullWidth
            sx={{
              mb: 3,
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#193566ff" },
              },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
            }}
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
              sx={{
                py: 1.5,
                mt: 1,
                background:
                  "linear-gradient(135deg, #186485ff 0%, #0884aaff 100%)",
                fontWeight: "bold",
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #59769aff 0%, #2077a0ff 100%)",
                },
              }}
            >
              Sign In
            </Button>
          )}

          <Typography
            variant="body2"
            sx={{ mt: 3, textAlign: "center", color: "rgba(255,255,255,0.8)" }}
          >
            Don’t have an account?{" "}
            <Link href="/view/SignUp" underline="hover" sx={{ color: "#fff" }}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

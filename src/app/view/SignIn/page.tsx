"use client";
import { SignInWithEmail } from "@/app/Firebase/service";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignIn() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleUser = async () => {
    try {
      const catchUser = await SignInWithEmail(email, password);
      router.push("/view/Dashboard");
      console.log(catchUser);
    } catch (error: any) {
      throw new Error(error.message || "Sign in failed");
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
          background: "rgba(0,0,0,0.55)", // dark overlay for better readability
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ position: "relative", zIndex: 1 }} // keeps card above overlay
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.12)", // glassmorphism effect
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

          <Typography
            variant="body2"
            sx={{ mt: 3, textAlign: "center", color: "rgba(255,255,255,0.8)" }}
          >
            Don’t have an account?{" "}
            <Link href="/auth/SignUp" underline="hover" sx={{ color: "#fff" }}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

"use client";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Google,
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React, { useState } from "react";
import Link from "next/link";
import { SignUpWithEmail } from "@/app/Firebase/service";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
const SignUp = () => {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleUser = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const catchUser = await SignUpWithEmail(email, password);
      router.push("/view/SignIn");
      // Firebase me displayName update karna
      if (catchUser.user) {
        await updateProfile(catchUser.user, {
          displayName: name,
        });
      }

      console.log("User:", catchUser);
    } catch (err: any) {
      setError(err.message || "Sign up failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: 'url("/Images/Sign.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 480,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Sign Up
          </Typography>

          {/* Full Name */}
          <TextField
            label="Full Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            value={email}   
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}   
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Error / Success Messages */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            onClick={handleUser}
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              borderRadius: 3,
              fontWeight: 600,
              background: "linear-gradient(90deg, #498bb9ff, #4b81a2ff)",
              ":hover": {
                background: "linear-gradient(90deg, #2a697dff, #1a5770ff)",
              },
            }}
          >
            Sign Up
          </Button>

          <Divider sx={{ my: 3 }}>or</Divider>

          {/* Google Button */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{
              py: 1.2,
              textTransform: "none",
              borderRadius: 3,
              fontWeight: 500,
              ":hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Sign up with Google
          </Button>

          {/* Login Text */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "text.secondary" }}
          >
            Already have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{
                cursor: "pointer",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              <Link href="/auth/SignIn">Login</Link>
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;

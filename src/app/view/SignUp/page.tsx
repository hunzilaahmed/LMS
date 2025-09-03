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
  CircularProgress,
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
import { SignUpWithEmail, signUpWithGoogle } from "@/app/Firebase/service";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //  validation
  const validateForm = () => {
    if (!name) return "Full Name is required";
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match!";
    return null;
  };

  const handleUser = async () => {
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const catchUser = await SignUpWithEmail(email, password);

      if (catchUser.user) {
        await updateProfile(catchUser.user, {
          displayName: name,
        });
      }

      router.push("/view/Dashboard");
    } catch (err: any) {
      setError(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url('/Sign.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 500,
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

          <TextField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error?.includes("Full Name") || false}
            helperText={error?.includes("Full Name") ? error : ""}
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

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error?.toLowerCase().includes("email") || false}
            helperText={error?.toLowerCase().includes("email") ? error : ""}
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

          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            error={error?.toLowerCase().includes("password") || false}
            helperText={error?.toLowerCase().includes("password") ? error : ""}
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

          <TextField
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            error={error?.includes("match") || false}
            helperText={error?.includes("match") ? error : ""}
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

          {error &&
            !error.includes("Full Name") &&
            !error.toLowerCase().includes("email") &&
            !error.toLowerCase().includes("password") &&
            !error.includes("match") && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

          <Button
            onClick={handleUser}
            variant="contained"
            fullWidth
            disabled={loading}
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
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Sign Up"
            )}
          </Button>

          <Divider sx={{ my: 3 }}>or</Divider>

          {loading ? (
            <Button
              fullWidth
              variant="outlined"
              disabled
              startIcon={<Google />}
              sx={{
                py: 1.2,
                textTransform: "none",
                borderRadius: 3,
                fontWeight: 500,
              }}
            >
              <CircularProgress size={22} />
            </Button>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={async () => {
                // signUpWithGoogle()
                try {
                  setLoading(true);
                  const result = await signUpWithGoogle();
                  setLoading(false);
                  console.log("Google User:", result.user);
                  router.push("/view/Dashboard");
                } catch (err: any) {
                  console.error("Google SignUp Error:", err);
                  const errorMessage = err?.message || "Google sign up failed";
                  setError(errorMessage);
                }
              }}
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
          )}

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
              <Link href="/view/SignIn">Login</Link>
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;

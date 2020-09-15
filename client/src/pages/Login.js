import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, TextField, Button, Grid } from "@material-ui/core";

export default function Login() {
	return (
		<Paper style={{ margin: "10%", textAlign: "center", padding: "5%" }}>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<form noValidate>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
				/>
				<Button type="submit" fullWidth variant="contained" color="primary">
					Sign In
				</Button>
				<Grid container>
					<Grid item style={{ marginTop: "5%" }}>
						<Link to="/signup" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

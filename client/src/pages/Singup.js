import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, TextField, Button, Grid } from "@material-ui/core";

export default function Singup() {
	return (
		<Paper style={{ margin: "10%", textAlign: "center", padding: "5%" }}>
			<Typography component="h1" variant="h5">
				Sign Up
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
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="Re-enter password"
					label="Re-enter Password"
					type="password"
					id="Re-enter password"
					autoComplete="current-password"
				/>
				<Button type="submit" fullWidth variant="contained" color="primary">
					Sign In
				</Button>
				<Grid container>
					<Grid item style={{ marginTop: "5%" }}>
						<Link to="/login" variant="body2">
							{"Already have an account? Sign in"}
						</Link>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

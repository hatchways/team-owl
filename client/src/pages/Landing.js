import React from "react";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Singup";
import { Button } from "@material-ui/core";

export default function Landing() {
	return (
		<React.Fragment>
			<Switch>
				<Route
					exact
					path="/"
					render={() => {
						return (
							<div>
								<h1>HomePage</h1>
								<Button
									component={Link}
									to="/login"
									size="Large"
									variant="outlined"
								>
									Login
								</Button>
								<Button
									component={Link}
									to="/signup"
									size="Large"
									variant="outlined"
								>
									Signup
								</Button>
							</div>
						);
					}}
				/>
				<Route
					path="/login"
					render={() => {
						return <Login />;
					}}
				/>
				<Route
					path="/signup"
					render={() => {
						return <Signup />;
					}}
				/>
			</Switch>
		</React.Fragment>
	);
}
